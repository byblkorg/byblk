if [ -f "createBusiness.zip" ]; then
    rm ./createBusiness.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r createBusiness.zip ./
cp createBusiness.zip ../../../dist
mv createBusiness.zip ../
