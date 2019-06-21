const request = require('request-promise-native')

async function runTest(serverUrl, zonaRetiro, expectedErrorCode){

    const options = {
        uri: `${serverUrl}/publicaciones`,
        qs: { zone: zonaRetiro},
        json: true
    }

    try {
        const publicacion = await request(options)

        let testOK = true

        let msj =""

        if (!publicacion) {
            msj = "mensaje vacío (sin publicacion)"
            testOK = false
        } else if (publicacion.id != targetId) {
            msj = "la publicacion recibida no es la buscada"
            testOK = false
        } else if (!publicacion.hasOwnProperty('title')) {
            msj = "la publicacion recibida no tiene titulo"
            testOK = false
        } else if (!publicacion.hasOwnProperty('description')) {
            msj = "la publicacion recibida no tiene descripcion"
            testOK = false
        } else if (!publicacion.hasOwnProperty('category')) {
            msj = "la publicacion recibida no tiene categoria"
            testOK = false
        } else if (!publicacion.hasOwnProperty('zone')) {
            msj = "la publicacion recibida no tiene zona de retiro"
            testOK = false
        } else if (!publicacion.hasOwnProperty('keyword')) {
            msj = "la publicacion recibida no tiene palabra/s clave"
            testOK = false
        } else if (!publicacion.hasOwnProperty('state')) {
            msj = "la publicacion recibida no tiene estado"
            testOK = false
        }

        if(testOK){
            return "ok"
        }else{
            return "GetWithZoneParams -- " + msj
        }
    } catch (err) {
        // if (err.statusCode == expectedErrorCode) {
        //     // console.log("get by id: ok (con error esperado)")
        //     return "GetWithZoneParams -- " + "ok (not found)"
        // } else {
            // console.log("get by id: error inesperado")
        return "GetWithZoneParams -- " +err.message
        // }
    }
}

async function testGetWithIdentifier(serverUrl) {
    runTest(serverUrl, 1)
    runTest(serverUrl, 123, 404)
}

module.exports = testGetWithIdentifier
