const path = require('path'); 
//const { app } = require('electron'); 


// Takes folder names and converts to hardset ints of sublevel from root.
const folderToSublevelMap = {
    'dist': 1,
    'logs': 1,
    'savedData' : 1,
    'src' : 1,
    'common' : 2,
    'debug' : 2,
    'mdeia' : 2
}

// take file, get its current folder.
function getCurrentFolder() {

}

// Expects Folder as input, uses it to find its corresponding sublevel.
function fromHereToRoot(folderName) {
    lPathObject = '..'

    if (folderName in folderToSublevelMap) {
        return lPathObject.reapeat(folderToSublevelMap[folderName]); // not working
    } else {
        //DisplayError("NotFoundError, (name not found in sublevel Map)", 2);
        return ''
    }
}

// function resolveToProperDataPath(folderName) {
//     // Electron Method to check dev/prod status of the app
//     const isDev = !app.isPackaged; 


//     // __dirname and resourcesPath shouldnt be hardset, 
//     // This path should be built off of root, so it needs to somehow use fromHereToRoot()
//     // prehaps we should be doing fromHereToRoot(currentFolder) and using that instead of __dirname
//     // regardless, path.join here should NOT be responsible for worrying about '..'
//     // this is because, where are we starting when traversing towards root so that the path works?.
//     // we need need fromHereToRoot() for that.
//     // this should literally be evaluating path.join(fromHereToRoot(CurrentFolder), ${foldername})
//     if (folderName == "logs" || folderName == "savedData") { 
//         return isDev 
//             ? path.join(__dirname, '..', `${folderName}`)
//             : path.join(process.resourcesPath, '..', `${folderName}`);
//     } else {
//         DisplayError("InvalidValueError, (folder name not log or savedData)", 3)
//     }
    
    

// } 
    
console.log(fromHereToRoot("common"));

//module.exports = { getSavedDataPath };