#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$SCRIPT_DIR/frontend"

if [[ ! -f "$FRONTEND_DIR/package.json" ]]; then
  echo "Frontend package.json was not found at $FRONTEND_DIR" >&2
  exit 1
fi

cd "$FRONTEND_DIR"

if [[ ! -d node_modules ]]; then
  echo "Installing locked frontend dependencies..."
  npm ci
fi

echo "Starting Muhammad Sayyedain's Flutter portfolio"
echo "Local preview: http://localhost:3000"
echo "Press Ctrl+C to stop the server."

exec npm run dev -- --host 0.0.0.0
