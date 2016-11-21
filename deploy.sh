#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd stage/_book

git init
git config user.name "agnelamodia13"
git config user.email "agnelamodia13@gmail.com"

git remote add upstream "https://$GITHUB_TOKEN@github.com/agnelamodia13/Sample2.git"
git fetch upstream
git reset upstream/gh-pages

echo "agnelamodia13@gmail.com" > CNAME

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push -q upstream HEAD:gh-pages