#!/bin/bash

trap cleanup EXIT
cleanup() {
  docker-compose down -v
}

set -e

cd "$( dirname "${BASH_SOURCE[0]}" )"

docker-compose build

# If we don't create these here, docker-compose will and they will be owned by
# root.
rm -rf ./results
mkdir -p ./results/coverage/chrome ./results/coverage/firefox

docker-compose up -d selenium

../acceptance/wait-for-nodes.sh 2

# compose up exits with 0 no matter what.
docker-compose up karma

# Aggregate results from all the containers.
RESULT=$(docker-compose ps -q \
  | xargs docker inspect -f '{{ .State.ExitCode }}' \
  | grep -v 0 | wc -l | tr -d ' ')

if [ $RESULT != 0 ]; then
  echo Selenium logs:
  docker-compose logs selenium
fi

exit $RESULT
