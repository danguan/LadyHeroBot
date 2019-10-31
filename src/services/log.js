const moment = require('moment');
const fs = require('fs');

// Logs in format: "MM-DD-YY HH:mm:ss\n [user:]<msg>" to logFile,
// where user is optional
function logTo(logFile, msgStr, user) {
  let timeStamp = `${moment().format('MM-DD-YY HH:mm:ss')}\n`;
  let message = `${user === undefined ? '' : user + ': '}${msgStr}\n`;

  fs.appendFile(logFile, timeStamp + message, err => {
    if (err) {
      console.error(`Error: ${err}`);
    }
  });
}

module.exports = {
  logTo
};
