#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vitepress/dist

git init 
git add -A
git commit -m 'deploy'
git push -f https://gitee.com/ding1992/docs.git master:gh-pages

cd -
rm -rf docs/.vitepress/dist