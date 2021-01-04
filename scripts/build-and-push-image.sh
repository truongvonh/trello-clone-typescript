#!/usr/bin/env bash

DOCKER_IMAGE_NAME=truongvn/react-trello-client:latest
docker build -t $DOCKER_IMAGE_NAME --target production-stage .
docker image prune -f
docker image push $DOCKER_IMAGE_NAME