"""Shared pytest fixtures.

``live_site`` starts a real threaded HTTP server serving a tiny linked website
so the crawler can be exercised end-to-end over the loopback interface.
"""

from __future__ import annotations

import threading
from collections.abc import Iterator
from functools import partial
from http.server import BaseHTTPRequestHandler, HTTPServer

import pytest

PAGES: dict[str, str] = {
    "/": (
        "<html><body>"
        "<a href='/about'>About</a>"
        "<a href='/products'>Products</a>"
        "<a href='https://external.example.com/'>External</a>"
        "<a href='#top'>Anchor</a>"
        "</body></html>"
    ),
    "/about": "<html><body><a href='/'>Home</a></body></html>",
    "/products": (
        "<html><body><a href='/products/widget'>Widget</a><a href='/about'>About</a></body></html>"
    ),
    "/products/widget": "<html><body><a href='/products'>Back</a></body></html>",
}


class _Handler(BaseHTTPRequestHandler):
    def do_GET(self) -> None:  # noqa: N802 - required name from BaseHTTPRequestHandler
        body = PAGES.get(self.path)
        if body is None:
            self.send_error(404, "Not Found")
            return
        encoded = body.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(encoded)))
        self.end_headers()
        self.wfile.write(encoded)

    def log_message(self, *args: object) -> None:  # silence test output
        pass


@pytest.fixture
def live_site() -> Iterator[str]:
    server = HTTPServer(("127.0.0.1", 0), partial(_Handler))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    host, port = server.server_address
    try:
        yield f"http://{host}:{port}"
    finally:
        server.shutdown()
        server.server_close()
        thread.join(timeout=5)
