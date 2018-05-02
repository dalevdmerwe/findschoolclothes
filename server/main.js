import {Meteor} from 'meteor/meteor';

const fs = require('fs');
const readline = require('readline');

LOGFILE = 'C:/Dale/findschoolclothes/output.log';

Meteor.startup(() => {
  // code to run on server at startup
  _writeToLogFile();
});

Meteor.methods({
  logToConsole: function (msg) {
    fs.appendFile(LOGFILE, msg + " \n", (err) => {
      if (err) throw err;
    });
  }
})

_writeToLogFile = function () {
  const newDate = new Date();
  const momentDate = moment(newDate.toISOString()).format('YYYY/MM/DD HH:mm:ss:SS');
  //console.log("Debug Dale momentDate",momentDate  );

  var serverStarted = "Finish: " + momentDate;
  fs.appendFile( LOGFILE, serverStarted +" \n", (err) => {
    if (err) throw err;
    _calculateLoadTime(serverStarted)
  });



}

_calculateLoadTime = function(serverStarted){
  var lineReader = readline.createInterface({
    input: fs.createReadStream(LOGFILE, 'utf8')
  });

  var startTags = [];

  lineReader.on('line', function (line) {
    if (line.indexOf("Start:") != -1) {
      startTags.push(line);
    }
  });

  lineReader.on('close', function () {
    var startTimeString = startTags[startTags.length-1];
    var startDateOnly = startTimeString.substr(startTimeString.length - 22);
    var endDateOnly = serverStarted.substr(serverStarted.length - 22);
    var startDateTime = new Date(startDateOnly);
    var endDateTime = new Date(endDateOnly);

    //console.log("Debug Dale startDateTime", startDateTime );
    //console.log("Debug Dale endDateTime", endDateTime );


    var diffMs = (endDateTime - startDateTime);
    //console.log("Debug Dale diffMs", diffMs );

    var diffSeconds = diffMs/1000;
    //console.log("Debug Dale diffSeconds", diffSeconds );
    fs.appendFile( LOGFILE, "Loading Total Seconds: " +diffSeconds +" \n", (err) => {
      if (err) throw err;
    });


    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    //console.log("Debug Dale diffMins",  diffMins);
    fs.appendFile( LOGFILE, "Loading Total Minutes: " +diffMins +" \n", (err) => {
      if (err) throw err;
    });
  });
}