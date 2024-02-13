#!/bin/bash

clear
pushd auth-tutorial
# npx prisma migrate reset
npx prisma generate
npx prisma db push
npx prisma studio
popd