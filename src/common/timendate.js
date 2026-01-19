const date = new Date();

// Function to convert
// single digit input
// to two digits
// (for readability)
const formatTimeValue =
    (input) => {
        if (input > 9) {
            return input;
        } else return `0${input}`;
    };

// Function to convert
// 24 Hour to 12 Hour clock
const formatTo12Hour =
    (input) => {
        if (input > 12) {
            return input - 12;
        }
        return input;
    };

// Data about date
const format = {
    dd: formatTimeValue(date.getDate()),
    mm: formatTimeValue(date.getMonth() + 1),
    yyyy: date.getFullYear(),
    HH: formatTimeValue(date.getHours()),
    hh: formatTimeValue(formatTo12Hour(date.getHours())),
    MM: formatTimeValue(date.getMinutes()),
    SS: formatTimeValue(date.getSeconds()),
};

// Function to get Timestamp in 24 Hour format
const getTimestamp24 = 
    ({
        dd, mm, yyyy,
        HH, MM, SS
    }) => {
        return (`${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`);
    };

// Function to get Timestamp in 12 Hour format
const getTimestamp =
    ({
        dd, mm,
        yyyy, hh,
        MM, SS
    }) => {
        return (`${mm}/${dd}/${yyyy} ${hh}:${MM}:${SS}`);
    };



module.exports = {
    getTimestamp24,
    getTimestamp,
    format
};