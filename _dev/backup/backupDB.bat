
call "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\VsDevCmd.bat"

cd C:\Program Files\MongoDB\Server\3.4\bin

rem LOCAL mongodump --host=127.0.0.1 --port=3001 -d meteor -o C:/BackupMongo
rem SERVER mongodump --host=129.232.208.130 --port=27017 -d uarelease -o C:/BackupMongo --username cloudadmin --password "ZSU47ET9CKST4CYP" --authenticationDatabase=admin
mongodump --host=129.232.208.130 --port=27017 -d uarelease -o C:/BackupMongo --username cloudadmin --password "ZSU47ET9CKST4CYP" --authenticationDatabase=admin

%comspec% /k "C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\Tools\VsDevCmd.bat"