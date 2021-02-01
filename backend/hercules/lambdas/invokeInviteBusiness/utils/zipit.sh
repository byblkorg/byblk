if [ -f "invokeInviteBusiness.zip" ]; then
    rm ./invokeInviteBusiness.zip
fi

mkdir dist

cp ./package.json ./dist/package.json

cd dist

rm -rf package-lock.json
rm -rf test

npm i --prod
zip -r invokeInviteBusiness.zip ./
cp invokeInviteBusiness.zip ../../../dist
mv invokeInviteBusiness.zip ../
