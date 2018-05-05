import {Meteor} from 'meteor/meteor';

import '../imports/api/meteorStartTimes.js';
import {MeteorStartTimes} from '/imports/api/meteorStartTimes.js';

const fs = require('fs');
const readline = require('readline');

LOGFILE = 'C:/Dale/findschoolclothes/output.log';

Meteor.startup(() => {
  // code to run on server at startup
  _writeToLogFile();
});

Meteor.methods({
  'writeToLogFile': function (msg) {
    fs.appendFile(LOGFILE, msg + " \n", (err) => {
      if (err) throw err;
    });
  },
  'meteorStartTimes_Insert': function (startTimeInfo) {
    MeteorStartTimes.insert(startTimeInfo);
  }
})

_writeToLogFile = function () {
  const newDate = new Date();
  const momentDate = moment(newDate.toISOString()).format('YYYY/MM/DD HH:mm:ss:SS');

  var serverStarted = "Finish: " + momentDate;
  fs.appendFile( LOGFILE, serverStarted +" \n", Meteor.bindEnvironment((err) => {
    if (err) throw err;
    _calculateLoadTime(serverStarted)
  }));



}

_calculateLoadTime = function(serverStarted){
  var lineReader = readline.createInterface({
    input: fs.createReadStream(LOGFILE, 'utf8')
  });

  let counter = 0;
  var startTags = [];
  var lastStartIndex =0;

  lineReader.on('line', function (line) {
    ++counter;

    if (line.indexOf("Start:") != -1) {
      debugger;
      startTags.push(line);
      lastStartIndex=counter;
    }
  });

  lineReader.on('close', Meteor.bindEnvironment(function () {
    if(counter-1 == lastStartIndex){
      var startTimeString = startTags[startTags.length-1];
      var startDateOnly = startTimeString.substr(startTimeString.length - 22);
      var endDateOnly = serverStarted.substr(serverStarted.length - 22);
      var startDateTime = new Date(startDateOnly);
      var endDateTime = new Date(endDateOnly);


      var diffMs = (endDateTime - startDateTime);

      var diffSeconds = diffMs/1000;

      fs.appendFile( LOGFILE, "Loading Total Seconds: " +diffSeconds +" \n", (err) => {
        if (err) throw err;
      });


      var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
      fs.appendFile( LOGFILE, "Loading Total Minutes: " +diffMins +" \n", (err) => {
        if (err) throw err;
      });

      var startTimeInfo = { start: startDateOnly, finished: endDateOnly, seconds: diffSeconds, minutes: diffMins };
      Meteor.call('meteorStartTimes_Insert',startTimeInfo);
    }
  }));
}

