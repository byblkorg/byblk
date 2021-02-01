#!/bin/bash

distPath="./dist/"
if [ ! -d $distPath ]; then
    mkdir $distPath
fi

cd lambdas

declare -a lambdaDirs=(
    'readEmail'
)

for path in "${lambdaDirs[@]}"
do
   echo "switching to this $path"
   cd $path
   npm i
   npm run test --passWithNoTests
   npm run package || { echo "npm run package failed for $path" ; exit 1; }
   cd -
done
