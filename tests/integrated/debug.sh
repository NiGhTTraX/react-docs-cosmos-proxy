#!/bin/bash

set -e

trap cleanup EXIT
cleanup() {
  docker-compose -f docker-compose.debug.yml down -v
}

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose -f docker-compose.debug.yml build

echo Go to http://localhost:9876/debug.html and open the dev tools...

docker-compose -f docker-compose.debug.yml run --service-ports karma_debug
