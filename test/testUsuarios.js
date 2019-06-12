const testGetAllUsuarios = require('./testGetAllUsuarios')
const testDeleteById = require('./testDeleteById')
//const testGetWithQueryParams = require('./testGetWithQueryParams')
const testGetById = require('./testGetById')
const testPostWithBody = require('./testPostWithBody')
const testPutWithIdentifier = require('./testPutWithIdentifier')
const testGetPaginado = require('./testGetPaginado')


const serverUrl = 'http://127.0.0.1:8081/api/'

async function main(){
    await testGetAllUsuarios(serverUrl)
    await testDeleteById(serverUrl)
    await testGetById(serverUrl)
    await testPostWithBody(serverUrl)
    await testPutWithIdentifier(serverUrl)
    await testGetPaginado(serverUrl)
}

main()
