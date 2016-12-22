#!/usr/bin/env bash

WEBPACK_DEV_HOST="${WEBPACK_DEV_HOST:-localhost}"
WEBPACK_DEV_PORT="${WEBPACK_DEV_PORT:-8080}"

echo "Starting Webpack devserver on $WEBPACK_DEV_PORT:$WEBPACK_DEV_PORT..."

node node_modules/.bin/webpack-dev-server \
  --config webpack.development.js \
  --host "$WEBPACK_DEV_HOST" \
  --post "$WEBPACK_DEV_PORT" \
  --history-api-fallback \
  --hot \
  --inline \
  --progress
