const { get } = require('http');
const path = require('path'); 
const unitTests = require('./unitTest.js')
//const { app } = require('electron'); 


// Takes folder names and converts to hardset ints of the number of sublevels from root.
const folderSublevelFromRootMap = {
    'dist': 1,
    'logs': 1,
    'savedData' : 1,
    'src' : 1,
    'common' : 2,
    'debug' : 2,
    'mdeia' : 2
}

// takes the __dirname and returns the current folder name
function getCurrentFolderName(dirname) {
    //.split(path.sep) splits the path into an array based on the system's path separator
    //pop() returns the last element of the array (last folder name in the path)
    return dirname.split(path.sep).pop();
}

// takes the __dirname and returns the current folder path
function getCurrentFolderPath(dirname) {
    return dirname;
}

// Expects Folder as input, uses it to find its corresponding sublevel.
function fromHereToRoot(dirname) {
    // One of these per level from root
    localPathObject = '..'

    // use both our functions to locally store the bame and path of the folder.
    folderName = getCurrentFolderName(dirname);
    folderPath = getCurrentFolderPath(dirname);

    // take the pathObject, and repeat it i times, where i is the value that the folder name maps to in the folderSublevelFromRootMap 
    // (its a string of n amounts of .., match will array it into groups of two using RE.
    builtDotsArray = localPathObject.repeat(folderSublevelFromRootMap[folderName]).match(/.{1,2}/g);

    // as long as the folder name is in the map, return our new map using the current full path and appending on to it the proper number of ".."'s
    if (folderName in folderSublevelFromRootMap) {
        return path.join(folderPath, ...builtDotsArray); // 3 ... is the spread operator
    } else {
        DisplayError("NotFoundError, (foldername not found in sublevel Map)", 3);
        return 'NotFoundError';
    }
}

function resolveToProperDataPath(dirname, folderName) {
    // Electron Method to check dev/prod status of the app
    //const isDev = !app.isPackaged; 

    isSpecifiedFolderValid = (folderName == "logs" || folderName == "savedData")

    if (isSpecifiedFolderValid) { 
        return true //isDev 
        // If Development Mode
            ? path.join(path.join(fromHereToRoot(__dirname) , `${folderName}`))
        // If Production Mode
            : path.join(path.join(fromHereToRoot(__dirname) , "dist" , `${folderName}`));
    } else {
        DisplayError("InvalidValueError, (folder name not log or savedData)", 3);
        return "InvalidValueError";
    }
} 

// UNIT TESTS
unitTests.performUnitTest(
    getCurrentFolderName(__dirname), 
    String.raw`common`
);

unitTests.performUnitTest(
    getCurrentFolderPath(__dirname), 
    String.raw`D:\Repository\SavV\src\common`
);

unitTests.performUnitTest(
    path.join(fromHereToRoot(__dirname)), 
    String.raw`D:\Repository\SavV`
);

unitTests.performUnitTest(
    path.join(fromHereToRoot(__dirname), "dist", "savedData"), 
    String.raw`D:\Repository\SavV\dist\savedData`
);

unitTests.performUnitTest(
    resolveToProperDataPath(__dirname, "logs"), 
    String.raw`D:\Repository\SavV\logs`
);

unitTests.performUnitTest(
    resolveToProperDataPath(__dirname, "savedData"), 
    String.raw`D:\Repository\SavV\savedData`
);



//module.exports = { getSavedDataPath };