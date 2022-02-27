#!/bin/bash

rm -r node_modules/* package.json package-lock.json .eslintrc.json

npm install --save-dev \
    eslint \
    prettier \
    google-closure-compiler

npx eslint --init
