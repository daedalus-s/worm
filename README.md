# worm

A small, polite web crawler CLI written in Python.

`worm` starts at a URL, follows links breadth-first, and reports the pages and
links it discovers. It stays on the start URL's host by default and respects
configurable depth and page limits.

## Requirements

- Python 3.11+
- [uv](https://docs.astral.sh/uv/) for dependency management

## Setup

```bash
# Install uv if it is not already available
python3 -m pip install --user uv

# Create the virtual environment and install runtime + dev dependencies
uv sync
```

This creates a `.venv/` in the project root. Activate it with
`source .venv/bin/activate`, or prefix commands with `uv run`.

## Usage

```bash
# Crawl a site two hops deep (default) and print a table
uv run worm crawl https://example.com

# Limit depth and page count, and emit JSON
uv run worm crawl https://example.com --depth 1 --max-pages 20 --json

# Follow links to other hosts as well
uv run worm crawl https://example.com --allow-external
```

You can also invoke it as a module: `uv run python -m worm crawl <url>`.

## Development

```bash
uv run ruff check .        # lint
uv run ruff format --check .
uv run mypy                # type-check (strict)
uv run pytest              # run the test suite
```

The crawler accepts a pluggable `fetch` callable (see `worm.crawler.crawl`), so
its traversal logic is unit-tested offline with an in-memory fake, and the test
suite also exercises a full crawl over a real loopback HTTP server.

## Project layout

```
src/worm/
  parser.py    # pure HTML link extraction
  crawler.py   # breadth-first crawl orchestration
  cli.py       # click-based command-line interface
tests/         # pytest unit + end-to-end tests
```
