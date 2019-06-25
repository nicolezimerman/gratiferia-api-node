const request = require('request-promise-native')

async function testGetWithQueryParams(serverUrl){

    const options = {
        uri: `${serverUrl}/publicaciones`,
        qs: { zone: 'Almagro', 
        category: 'Muebles',
        keyword: 'Muebles'},
        json: true
    }

    try {
        const publicaciones = await request(options)

        let testOK = true

        let msj =""

        if (!publicaciones) {
            msj = "mensaje vacío (sin publicaciones)"
            testOK = false
        } 

        for (const publicacion of publicaciones) {

        if (!publicacion.hasOwnProperty('title')) {
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

    }
    if(testOK){
        return "ok"
    }else{
        return "GetWithQueryParams -- " + msj
    }
    } catch (err) {
        // if (err.statusCode == expectedErrorCode) {
        //     // console.log("get by id: ok (con error esperado)")
        //     return "GetWithZoneParams -- " + "ok (not found)"
        // } else {
            // console.log("get by id: error inesperado")
        return "GetWithQueryParams -- " +err.message
        // }
    }
}

module.exports = testGetWithQueryParams
