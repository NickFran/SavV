class DataFile {
    constructor(fileName, fileExtension, filePath, fileSize) {
        this.fileName = fileName;
        this.fileExtension = fileExtension;
        this.filePath = filePath;
        this.fileSize = fileSize;
        this.data = null
    }

    async load() { // this stores the data into the object
        if (!this._data) { 
            const text = await 
            fs.promises.readFile(this.filePath, "utf8"); 
            this._data = parseCDL(text); 
        } 
        return this._data; 
    }

    deleteFile() {
        console.log("|DEL|")
    }

    duplicateFile() {
        console.log("|DUP|")
    }

    addData() {
        console.log("|Add|")
    }

    removeData() {
        console.log("|Remove|")
    }

    updateData() {
        console.log("|Update|")
    }
}

class DataView {
    constructor(graphType) {
        this.graphType = graphType;
        //?
    }
}

// this needs to be fleshed out, but you get the point
const dataViewAxisSetting = {
    axis : "X",
    MappedDataFileVariable : "Salinity",
    minRange: 0,
    maxRange: 100
}
const dataViewSettings = {
    viewName : "Salinity and SSP",
    dataFilePath : "C:/",
    graphType : "SimpleChart",
    XAxisSettings : dataViewAxisSetting, // obviously replace these later with an instance
    YAxisSettings : dataViewAxisSetting, //
    dataViewAdditionalSettings: [
    "Snappy",
    "DarkTheme",
    "HighlightSelected"
    ]
}
console.log(dataViewSettings);



const df = new DataFile('dataTest', '.nc', 'C:/', '194053');

df.addData();
df.removeData();
df.updateData();
df.duplicateFile();
df.deleteFile();

// for i in allFiles
//    fileArray.append(new DataFile())
