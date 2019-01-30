#!/usr/bin/env bash
set -ex
./build.sh
git add -A .
git commit -m "build"
git push fork otgm --force