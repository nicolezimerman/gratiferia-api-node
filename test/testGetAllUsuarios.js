const request = require('request-promise-native');

module.exports = async function testGetAllUsuarios(serverUrl) {

    const options = {
        uri: serverUrl + 'usuarios',
        json: true
    }

    try {
        const usuarios = await request(options)

        for (const usuario of usuarios) {

            if (!usuario.hasOwnProperty('nombre'))
                throw "get all: el usuario recibido no tiene nombre"

            if (!usuario.hasOwnProperty('apellido'))
                throw "get all: el usuario recibido no tiene apellido"

            if (!usuario.hasOwnProperty('edad'))
                throw "get all: el usuario recibido no tiene edad"

            if (!usuario.hasOwnProperty('email'))
                throw "get all: el usuario recibido no tiene email"
            
                if (!usuario.hasOwnProperty('zona'))
                throw "get all: el usuario recibido no tiene zona"
        }

        //console.log("get all: ok")

        return "ok"

    } catch (err) {
        //console.log(err)

        return "GetAllUsuarios -- " + err.message
    }
}
