if [ -f "readEmail.zip" ]; then
    rm ./readEmail.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r readEmail.zip ./
cp readEmail.zip ../../../dist
mv readEmail.zip ../
