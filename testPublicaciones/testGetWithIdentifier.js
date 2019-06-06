const request = require('request-promise-native')

async function runTest(serverUrl, targetId, expectedErrorCode){

    const options = {
        uri: `${serverUrl}/publicaciones/${targetId}`,
        json: true
    }

    try {
        const publicacion = await request(options)

        if (!publicacion) {
            console.log("get by id: mensaje vacío (sin publicacion)")
        } else if (publicacion.id != targetId) {
            console.log("get by id: la publicacion recibida no es la buscada")
        } else if (!publicacion.hasOwnProperty('title')) {
            console.log("get by id: la publicacion recibida no tiene titulo")
        } else if (!publicacion.hasOwnProperty('description')) {
            console.log("get by id: la publicacion recibida no tiene descripcion")
        } else if (!publicacion.hasOwnProperty('category')) {
            console.log("get by id: la publicacion recibida no tiene categoria")
        } else if (!publicacion.hasOwnProperty('zone')) {
            console.log("get by id: la publicacion recibida no tiene zona de retiro")
        } else if (!publicacion.hasOwnProperty('keyword')) {
            console.log("get by id: la publicacion recibida no tiene palabra/s clave")
        } else if (!publicacion.hasOwnProperty('state')) {
            console.log("get by id: la publicacion recibida no tiene estado")
        } else {
            console.log("get by id: ok")
        }
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            console.log("get by id: ok (con error esperado)")
        } else {
            console.log("get by id: error inesperado")
        }
    }
}

async function testGetWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testGetWithIdentifier
