"""Command-line interface for worm."""

from __future__ import annotations

import json
import sys

import click
from rich.console import Console
from rich.table import Table

from worm import __version__
from worm.crawler import (
    DEFAULT_MAX_DEPTH,
    DEFAULT_MAX_PAGES,
    DEFAULT_TIMEOUT,
    crawl,
)


@click.group()
@click.version_option(__version__, prog_name="worm")
def main() -> None:
    """worm: a small, polite web crawler."""


@main.command("crawl")
@click.argument("url")
@click.option(
    "--depth",
    "-d",
    default=DEFAULT_MAX_DEPTH,
    show_default=True,
    help="How many link-hops to follow from the start URL.",
)
@click.option(
    "--max-pages",
    "-m",
    default=DEFAULT_MAX_PAGES,
    show_default=True,
    help="Maximum number of pages to fetch.",
)
@click.option(
    "--timeout",
    default=DEFAULT_TIMEOUT,
    show_default=True,
    help="Per-request timeout in seconds.",
)
@click.option(
    "--allow-external/--same-host",
    default=False,
    show_default=True,
    help="Follow links to other hosts, or stay on the start URL's host.",
)
@click.option(
    "--json",
    "as_json",
    is_flag=True,
    default=False,
    help="Emit machine-readable JSON instead of a table.",
)
def crawl_command(
    url: str,
    depth: int,
    max_pages: int,
    timeout: float,
    allow_external: bool,
    as_json: bool,
) -> None:
    """Crawl URL and report the pages and links discovered."""
    console = Console()
    result = crawl(
        url,
        max_depth=depth,
        max_pages=max_pages,
        same_host_only=not allow_external,
        timeout=timeout,
    )

    if as_json:
        payload = {
            "start_url": result.start_url,
            "pages": result.pages,
            "errors": result.errors,
            "stats": {
                "pages_fetched": len(result.pages),
                "urls_discovered": len(result.discovered),
                "errors": len(result.errors),
            },
        }
        click.echo(json.dumps(payload, indent=2, sort_keys=True))
    else:
        table = Table(title=f"Crawl of {result.start_url}")
        table.add_column("Page", style="cyan", no_wrap=False)
        table.add_column("Links", justify="right", style="green")
        for page, links in result.pages.items():
            table.add_row(page, str(len(links)))
        console.print(table)
        console.print(
            f"[bold]{len(result.pages)}[/bold] pages fetched, "
            f"[bold]{len(result.discovered)}[/bold] URLs discovered, "
            f"[bold]{len(result.errors)}[/bold] errors."
        )
        for failed_url, message in result.errors.items():
            console.print(f"[red]error[/red] {failed_url}: {message}")

    if result.errors and not result.pages:
        sys.exit(1)


if __name__ == "__main__":
    main()
