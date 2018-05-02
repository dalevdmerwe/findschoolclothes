REM set MONGO_URL=mongodb://cloudadmin:ZSU47ET9CKST4CYP@129.232.208.130:27017/uarelease?authSource=admin
REM meteor run android-device --port 3500
REM meteor run android-device --port 3000 --mobile-server=http://release.ultimateaim.co.za

REM meteor build ../buildtest --server http://release.ultimateaim.co.za/
REM meteor run android

REM meteor remove-platform ios
@echo %date% %time%

set MONGO_URL=mongodb://127.0.0.1:3001/meteor

meteor run android-device --port 3000 --settings settings-local.json --verbose