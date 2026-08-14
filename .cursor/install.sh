#!/usr/bin/env bash
# Idempotent dependency setup for the worm Cloud Agent environment.
set -euo pipefail

# Run from the repository root regardless of where this script is invoked.
cd "$(dirname "$0")/.."

# Ensure a user-local bin directory is on PATH for uv.
export PATH="$HOME/.local/bin:$PATH"

# Install uv if it is not already available. uv manages the virtualenv and
# installs both runtime and dev dependencies from pyproject.toml / uv.lock.
if ! command -v uv >/dev/null 2>&1; then
  python3 -m pip install --user --upgrade uv
fi

# Sync the environment. Prefer the locked versions for reproducibility, but
# fall back to a fresh resolve if the lockfile is missing or out of date.
if [ -f uv.lock ]; then
  uv sync --frozen || uv sync
else
  uv sync
fi
