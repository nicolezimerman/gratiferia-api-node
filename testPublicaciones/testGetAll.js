const request = require('request-promise-native');

async function testGetAll(serverUrl) {

    const options = {
        uri: `${serverUrl}/publicaciones`,
        json: true
    }

    try {
        const publicaciones = await request(options)

        let testOK = true
        for (let i = 0; i < publicaciones.length && testOK; i++) {
            if (!publicaciones[i].hasOwnProperty('title')) {
                console.log("get all: la publicaciones recibida no tiene titulo")
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('description')) {
                console.log("get all: la publicaciones recibida no tiene descripcion")
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('category')) {
                console.log("get all: la publicaciones recibida no tiene categoria")
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('zone')) {
                console.log("get all:  la publicaciones recibida no tiene zona de retiro")
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('keyword')) {
                console.log("get all:  la publicaciones recibida no tiene palabra/s clave ")
                testOK = false
            } else if (!publicaciones[i].hasOwnProperty('state')) {
                console.log("get all:  la publicaciones recibida no tiene estado")
                testOK = false
            }
        }
        if (testOK) {
            console.log("get all: ok")
        }
    } catch (err) {
        console.log("get all: error en la respuesta del servidor")
    }
}

module.exports = testGetAll