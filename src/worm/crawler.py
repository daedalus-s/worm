"""Breadth-first web crawler built on top of :mod:`worm.parser`.

The crawler accepts a pluggable ``fetch`` callable so that it can be driven by
either a real HTTP client (the default, backed by :mod:`httpx`) or an in-memory
fake in tests. This keeps the crawl logic deterministic and offline-testable.
"""

from __future__ import annotations

from collections import deque
from collections.abc import Callable
from dataclasses import dataclass, field
from urllib.parse import urlparse

import httpx

from worm.parser import extract_links

Fetcher = Callable[[str], str]

DEFAULT_MAX_DEPTH = 2
DEFAULT_MAX_PAGES = 50
DEFAULT_TIMEOUT = 10.0
_USER_AGENT = "worm/0.1 (+https://github.com/daedalus-s/worm)"


@dataclass
class CrawlResult:
    """Outcome of a crawl.

    ``pages`` maps each successfully fetched URL to the links discovered on it.
    ``errors`` maps URLs that failed to a short error message.
    """

    start_url: str
    pages: dict[str, list[str]] = field(default_factory=dict)
    errors: dict[str, str] = field(default_factory=dict)

    @property
    def discovered(self) -> set[str]:
        """Every URL that was seen, whether or not it was fetched."""
        seen: set[str] = set(self.pages) | set(self.errors)
        for links in self.pages.values():
            seen.update(links)
        return seen


def _same_host(a: str, b: str) -> bool:
    return urlparse(a).netloc.lower() == urlparse(b).netloc.lower()


def _default_fetcher(timeout: float) -> Fetcher:
    client = httpx.Client(
        timeout=timeout,
        follow_redirects=True,
        headers={"User-Agent": _USER_AGENT},
    )

    def fetch(url: str) -> str:
        response = client.get(url)
        response.raise_for_status()
        return response.text

    return fetch


def crawl(
    start_url: str,
    *,
    max_depth: int = DEFAULT_MAX_DEPTH,
    max_pages: int = DEFAULT_MAX_PAGES,
    same_host_only: bool = True,
    fetch: Fetcher | None = None,
    timeout: float = DEFAULT_TIMEOUT,
) -> CrawlResult:
    """Crawl outward from ``start_url`` using breadth-first search.

    Args:
        start_url: The page to start from.
        max_depth: How many link-hops away from ``start_url`` to follow.
        max_pages: Hard cap on the number of pages fetched.
        same_host_only: When true, only follow links on the start URL's host.
        fetch: Optional callable that returns the HTML for a URL. Defaults to an
            :mod:`httpx`-backed client.
        timeout: Per-request timeout for the default fetcher (seconds).

    Returns:
        A :class:`CrawlResult` describing fetched pages and any errors.
    """
    if max_depth < 0:
        raise ValueError("max_depth must be >= 0")
    if max_pages < 1:
        raise ValueError("max_pages must be >= 1")

    fetcher = fetch if fetch is not None else _default_fetcher(timeout)
    result = CrawlResult(start_url=start_url)

    queue: deque[tuple[str, int]] = deque([(start_url, 0)])
    queued: set[str] = {start_url}

    while queue and len(result.pages) < max_pages:
        url, depth = queue.popleft()
        try:
            html = fetcher(url)
        except Exception as exc:  # noqa: BLE001 - surfaced to the caller in errors
            result.errors[url] = f"{type(exc).__name__}: {exc}"
            continue

        links = extract_links(html, url)
        result.pages[url] = links

        if depth >= max_depth:
            continue

        for link in links:
            if link in queued:
                continue
            if same_host_only and not _same_host(link, start_url):
                continue
            queued.add(link)
            queue.append((link, depth + 1))

    return result
