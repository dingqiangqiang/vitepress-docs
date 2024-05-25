#!/usr/bin/env sh

set -e

npm run build

cd docs/.vitepress/dist

git init 
git add -A
git commit -m 'deploy' 
git push -f https://github.com/dingqiangqiang/docs.git main

cd -
rm -rf docs/.vitepress/dist