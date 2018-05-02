REM set MONGO_URL=mongodb://cloudadmin:ZSU47ET9CKST4CYP@129.232.208.130:27017/uarelease?authSource=admin
REM mongodb://cloudadmin:ZSU47ET9CKST4CYP@mongodb-mncluster-1.rancher.internal:27017,mongodb-mncluster-2.rancher.internal:27017,mongodb-mncluster-3.rancher.internal:27017/mmssessions?replicaSet=rs0&authSource=admin
REM meteor --port 3500
REM set ROOT_URL = http://192.168.1.151
REM set MONGO_URL=mongodb://127.0.0.1:3001/meteor



@echo off
>> output.log (
echo ******
echo Start: %date% %time%
)

@echo on

@echo %date% %time%

meteor --port 3000

