const request = require('request-promise-native');

async function testGetAll(serverUrl) {

    const options = {
        uri: `${serverUrl}/publicaciones`,
        json: true
    }

    try {
        const publicaciones = await request(options)

        let testOK = true

        let msj ="";

        for (let i = 0; i < publicaciones.length && testOK; i++) {
            if (!publicaciones[i].hasOwnProperty('title')) {
                // console.log("get all: la publicaciones recibida no tiene titulo")
                msj = "la publicacion recibida no tiene titulo"
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('description')) {
                msj = "la publicacion recibida no tiene descripcion"
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('category')) {
                msj = "la publicacion recibida no tiene categoria"
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('zone')) {
                msj = "la publicacion recibida no tiene zona de retiro"
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('keyword')) {
                msj = "la publicacion recibida no tiene palabra/s clave "
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('state')) {
                msj = "la publicacion recibida no tiene estado"
                testOK = false
            }
        }
        if (testOK) {
            // console.log("get all: ok")
            return "ok"
        }else{
            return "GetAll -- " + msj
        }
    } catch (err) {
        // console.log("get all: error en la respuesta del servidor")
        return "GetAll -- " +err.message
    }
}

module.exports = testGetAll