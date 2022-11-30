#!/bin/bash

NAME="auth_renewal"
PORT=""

image=`cat /home/ubuntu/$NAME/imagedefinitions.json`

echo $image

sudo docker stop $NAME
sudo docker rm $NAME

sudo aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin ${awsid}.dkr.ecr.ap-northeast-2.amazonaws.com

docker pull $image

echo DEPLOYMENT_GROUP_NAME: "$DEPLOYMENT_GROUP_NAME"

if [ $DEPLOYMENT_GROUP_NAME == "auth-renewal-dev" ];then
        docker run -d -p $PORT:$PORT -e NODE_ENV=dev -e TZ=Asia/Seoul --name $NAME $image 
        wait

elif [ $DEPLOYMENT_GROUP_NAME == "auth-renewal-release" ];then
        docker run -d -p $PORT:$PORT -e NODE_ENV=release -e TZ=Asia/Seoul --name $NAME $image
        wait

elif [ $DEPLOYMENT_GROUP_NAME == "auth-renewal-production" ];then
        docker run -d -p $PORT:$PORT -e NODE_ENV=production -e TZ=Asia/Seoul --name $NAME $image
        wait

fi    