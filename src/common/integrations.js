const { execFile } = require('node:child_process');
const path = require('node:path');
const { fromHereToRoot } = require('./pathDep.js');

function callPyFunc(funcName, args) {
    return new Promise((resolve, reject) => {
        const pythonPath = path.join(fromHereToRoot(__dirname), 'src', 'common', 'pythonTest.py');
        execFile('python', [pythonPath, funcName, ...args], 
            (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                else resolve(JSON.parse(stdout));
            }
        );
    });
}
console.log(__dirname);

module.exports = { callPyFunc };

// const x = await callPyFunc('add', [5, 10]);
// console.log(x); // Outputs: 15