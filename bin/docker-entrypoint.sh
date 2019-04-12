#!/bin/bash
set -eo pipefail

echo "==> Executing container start up command: \"$@\""
exec "$@"
