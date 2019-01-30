#!/usr/bin/env bash
set -ex
TAG="${1?Please specify a tag}"
./build.sh
git add -A .
git commit -m "build ${TAG}"
git tag ${TAG}
git push fork otgm --force --tags