#!/bin/bash
var=$(pwd)
echo ${var}

echo "installing global progect dev pakages"
npm install

# cd app

# echo "instaling app pakages"
# npm install

# cd ..

echo "build container"
npm run container:build

npm run innitdb