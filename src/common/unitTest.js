function performUnitTest(result, expectedResult){
    if (result == expectedResult){
        console.log(`SUCSESS - got expected result: ${expectedResult}`)
    } else {
        console.log(`FAILED - expected ${expectedResult}, but got ${result}`)
    }
}

module.exports = { performUnitTest };