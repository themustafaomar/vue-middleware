#!/usr/bin/env bash

set -e

cd ./packages/vue-middleware

echo 'Building library...'

pnpm run --filter=vue-middleware build

echo 'Building types...'

pnpm run --filter=vue-middleware build:dts

echo 'Build was successful...'