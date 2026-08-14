from worm.parser import extract_links

SAMPLE = """
<html><body>
  <a href="/about">About</a>
  <a href="products/widget">Widget</a>
  <a href="https://other.example.com/page">External</a>
  <a href="#section">Anchor only</a>
  <a href="mailto:hi@example.com">Mail</a>
  <a href="/about#team">About again with fragment</a>
  <a>missing href</a>
</body></html>
"""


def test_resolves_relative_and_absolute_links() -> None:
    links = extract_links(SAMPLE, "https://example.com/dir/")
    assert "https://example.com/about" in links
    assert "https://example.com/dir/products/widget" in links
    assert "https://other.example.com/page" in links


def test_skips_anchors_mailto_and_missing_href() -> None:
    links = extract_links(SAMPLE, "https://example.com/dir/")
    assert all(not link.startswith("mailto:") for link in links)
    assert "https://example.com/dir/#section" not in links


def test_deduplicates_and_strips_fragments() -> None:
    links = extract_links(SAMPLE, "https://example.com/dir/")
    # "/about" and "/about#team" collapse to one entry.
    assert links.count("https://example.com/about") == 1


def test_empty_html_returns_no_links() -> None:
    assert extract_links("", "https://example.com/") == []
