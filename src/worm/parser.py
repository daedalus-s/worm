"""HTML link extraction helpers.

The functions here are intentionally pure (no network access) so they can be
unit-tested in isolation from the crawler's fetching logic.
"""

from __future__ import annotations

from urllib.parse import urldefrag, urljoin

from bs4 import BeautifulSoup

_SKIP_PREFIXES = ("#", "mailto:", "tel:", "javascript:", "data:")


def extract_links(html: str, base_url: str) -> list[str]:
    """Return the de-duplicated, absolute links found in ``html``.

    Relative hrefs are resolved against ``base_url`` and URL fragments are
    dropped so that ``/page#section`` and ``/page`` are treated as one URL.
    Order of first appearance is preserved to keep crawling deterministic.
    """
    soup = BeautifulSoup(html, "html.parser")
    links: list[str] = []
    seen: set[str] = set()

    for anchor in soup.find_all("a", href=True):
        href = str(anchor["href"]).strip()
        if not href or href.lower().startswith(_SKIP_PREFIXES):
            continue
        absolute = urldefrag(urljoin(base_url, href)).url
        if absolute not in seen:
            seen.add(absolute)
            links.append(absolute)

    return links
