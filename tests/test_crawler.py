import httpx
import pytest

from worm.crawler import crawl

FAKE_SITE: dict[str, str] = {
    "https://site.test/": (
        "<a href='/a'>A</a><a href='/b'>B</a><a href='https://elsewhere.test/x'>Ext</a>"
    ),
    "https://site.test/a": "<a href='/a/deep'>Deep</a><a href='/'>Home</a>",
    "https://site.test/b": "<a href='/'>Home</a>",
    "https://site.test/a/deep": "<a href='/b'>B</a>",
}


def fake_fetch(url: str) -> str:
    try:
        return FAKE_SITE[url]
    except KeyError as exc:
        raise httpx.HTTPStatusError(
            "404", request=httpx.Request("GET", url), response=httpx.Response(404)
        ) from exc


def test_bfs_visits_same_host_pages() -> None:
    result = crawl("https://site.test/", max_depth=3, fetch=fake_fetch)
    assert set(result.pages) == {
        "https://site.test/",
        "https://site.test/a",
        "https://site.test/b",
        "https://site.test/a/deep",
    }
    assert not result.errors


def test_same_host_only_excludes_external_links() -> None:
    result = crawl("https://site.test/", max_depth=3, fetch=fake_fetch)
    assert "https://elsewhere.test/x" not in result.pages
    assert "https://elsewhere.test/x" in result.discovered


def test_max_depth_limits_traversal() -> None:
    result = crawl("https://site.test/", max_depth=0, fetch=fake_fetch)
    assert set(result.pages) == {"https://site.test/"}


def test_max_pages_caps_fetches() -> None:
    result = crawl("https://site.test/", max_depth=5, max_pages=2, fetch=fake_fetch)
    assert len(result.pages) == 2


def test_errors_are_recorded_not_raised() -> None:
    result = crawl("https://site.test/missing", fetch=fake_fetch)
    assert "https://site.test/missing" in result.errors
    assert not result.pages


def test_invalid_arguments_raise() -> None:
    with pytest.raises(ValueError):
        crawl("https://site.test/", max_depth=-1, fetch=fake_fetch)
    with pytest.raises(ValueError):
        crawl("https://site.test/", max_pages=0, fetch=fake_fetch)


def test_end_to_end_over_http(live_site: str) -> None:
    result = crawl(live_site, max_depth=3)
    assert f"{live_site}/" in result.pages or live_site in result.pages
    assert f"{live_site}/about" in result.pages
    assert f"{live_site}/products/widget" in result.pages
    # External host is discovered but not fetched.
    assert "https://external.example.com/" in result.discovered
    assert "https://external.example.com/" not in result.pages
    assert not result.errors
