#!/usr/bin/env sh

set -e

npm run build

# cd docs/.vitepress/dist
cd dist 

git init 
git add -A
git commit -m 'deploy'
git push -f git@github.com:dingqiangqiang/dingqiangqiang.github.io.git master

cd -
# rm -rf docs/.vitepress/dist