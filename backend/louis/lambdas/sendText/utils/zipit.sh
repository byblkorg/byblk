if [ -f "sendText.zip" ]; then
    rm ./sendText.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r sendText.zip ./
cp sendText.zip ../../../dist
mv sendText.zip ../
