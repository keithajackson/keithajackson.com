#!/usr/bin/env bash

node node_modules/.bin/webpack \
  --config webpack.production.js \
  --bail \
  --verbose \
  --progress \
  --display-error-details
