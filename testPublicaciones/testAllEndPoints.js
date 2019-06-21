const testGetAll = require('./testGetAll')
//const testGetWithQueryParams = require('./testGetWithQueryParams')
const testGetWithIdentifier = require('./testGetWithIdentifier')
const testPostWithBody = require('./testPostWithBody')
const testDeleteWithIdentifier = require('./testDeleteWithIdentifier')
const testPutWithIdentifier = require('./testPutWithIdentifier')
const testGetPublicacionesPaginado = require('./testGetPublicacionesPaginado')

const serverUrl = 'http://127.0.0.1:8081/api'

async function main(){
    const results = [];
    const errores = [];
    let ok = 0;

    results.push(await testPostWithBody(serverUrl))
    results.push(await testGetAll(serverUrl))
    results.push(await testGetWithIdentifier(serverUrl))
    //await testGetWithQueryParams(serverUrl)
    results.push(await testPutWithIdentifier(serverUrl))
    results.push(await testDeleteWithIdentifier(serverUrl))
    results.push(await testGetPublicacionesPaginado(serverUrl))

    for (let index = 0; index < results.length; index++) {
        if (results[index] == "ok") {
            ok++
        }else{
            errores.push(results[index]);
        }
    }

    console.log("-- test publicaciones -- correctos: " + ok + " de " + results.length);

    for (let index = 0; index < errores.length; index++) {
        console.log(errores[index])
    }
}

main()