const testGetAllUsuarios = require('./testGetAllUsuarios')
const testDeleteByEmail = require('./testDeleteByEmail')
//const testGetWithQueryParams = require('./testGetWithQueryParams')
const testGetByEmail = require('./testGetByEmail')
const testPostWithBody = require('./testPostWithBody')
const testPutWithIdentifier = require('./testPutWithIdentifier')


const serverUrl = 'http://127.0.0.1:8080/api/'

async function main(){
    await testGetAllUsuarios(serverUrl)
    await testDeleteByEmail(serverUrl)
    await testGetByEmail(serverUrl)
    await testPostWithBody(serverUrl)
    await testPutWithIdentifier(serverUrl)
}

main()
