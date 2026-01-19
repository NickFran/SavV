const { getTimestamp, format } = require('./timendate.js');

function startLog() {
    let timestamp = getTimestamp(format)   
}

function log(msg) {
    let timestamp = getTimestamp(format)
    console.log(`${timestamp} | ${msg}`)
    // save data to file (Timestamp + | + msg)
}

function DisplayError(ErrorName, msg, ErrorLevel, IgnoreLogging) {
    if (IgnoreLogging) {
        // code to display on screen by manipulating the DOM
    } else {
        log(`${ErrorName} [${ErrorLevel}] | ${msg}`) 
        // code to display on screen by manipulating the DOM
    }
}




module.exports = { log, DisplayError };