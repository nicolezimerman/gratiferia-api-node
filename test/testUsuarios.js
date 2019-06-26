const testGetAllUsuarios = require('./testGetAllUsuarios')
const testDeleteById = require('./testDeleteById')
//const testGetWithQueryParams = require('./testGetWithQueryParams')
const testGetByEmail = require('./testGetByEmail')
const testPostWithBody = require('./testPostWithBody')
const testPutWithIdentifier = require('./testPutWithIdentifier')
const testGetPaginado = require('./testGetPaginado')


const serverUrl = 'http://127.0.0.1:8081/api/'

async function main(){
    const results = [];
    const errores = [];
    let ok = 0;

    results.push(await testGetAllUsuarios(serverUrl))
    results.push(await testGetByEmail(serverUrl))
    results.push(await testDeleteById(serverUrl))
    results.push(await testPostWithBody(serverUrl))
    results.push(await testPutWithIdentifier(serverUrl))
    results.push(await testGetPaginado(serverUrl))

    for (let index = 0; index < results.length; index++) {
        if (results[index] == "ok") {
            ok++
        }else{
            errores.push(results[index]);
        }
    }

    console.log("-- test usuarios -- correctos: " + ok + " de " + results.length);

    for (let index = 0; index < errores.length; index++) {
        console.log(errores[index])
    }
    
}

main()
