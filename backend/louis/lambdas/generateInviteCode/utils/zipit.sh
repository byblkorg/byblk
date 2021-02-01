if [ -f "generateInviteCode.zip" ]; then
    rm ./generateInviteCode.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r generateInviteCode.zip ./
cp generateInviteCode.zip ../../../dist
mv generateInviteCode.zip ../
