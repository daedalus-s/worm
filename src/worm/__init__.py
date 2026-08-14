"""worm: a small, polite web crawler CLI."""

from worm.crawler import CrawlResult, crawl
from worm.parser import extract_links

__version__ = "0.1.0"

__all__ = ["CrawlResult", "crawl", "extract_links", "__version__"]
