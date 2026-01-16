

function startLog() {
    Timestamp = Date.now(); // this is wrong but it can stay temp.
    // save data to file
}

function log(msg) {
    Timestamp = Date.now(); // this is wrong but it can stay temp.
    console.log(msg)
    // save data to file (Timestamp + | + msg)
}

function DisplayError(ErrorName, msg, ErrorLevel, IgnoreLogging) {
    if (IgnoreLogging) {
        // code to display on screen by manipulating the DOM
    } else {
        log(`${ErrorName} [${ErrorLevel}] |  ${msg}`) 
        // code to display on screen by manipulating the DOM
    }
}

DisplayError("NotFoundError", "Cant find this thing", 2, false)