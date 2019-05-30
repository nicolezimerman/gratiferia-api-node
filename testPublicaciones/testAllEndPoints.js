const testGetAll = require('./testGetAll')
//const testGetWithQueryParams = require('./testGetWithQueryParams')
const testGetWithIdentifier = require('./testGetWithIdentifier')
const testPostWithBody = require('./testPostWithBody')
const testDeleteWithIdentifier = require('./testDeleteWithIdentifier')
const testPutWithIdentifier = require('./testPutWithIdentifier')

const serverUrl = 'http://127.0.0.1:8080/api'

async function main(){
    await testPostWithBody(serverUrl)
    await testGetAll(serverUrl)
    await testGetWithIdentifier(serverUrl)
    //await testGetWithQueryParams(serverUrl)
    await testPutWithIdentifier(serverUrl)
    await testDeleteWithIdentifier(serverUrl)
}

main()