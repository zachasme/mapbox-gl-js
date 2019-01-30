#!/usr/bin/env bash
set -ex
BRANCH="${1}"
echo "Rebasing from ${BRANCH}..."
sleep 5
git fetch --tags origin ${BRANCH}
git rebase ${BRANCH}