const request = require('request-promise-native');

module.exports = async function testGetAllUsuarios(serverUrl) {

    const options = {
        uri: serverUrl + 'usuarios',
        json: true
    }

    try {
        const usuarios = await request(options)

        for (const usuario of usuarios) {

            if (!usuario.hasOwnProperty('name'))
                throw "get all: el usuario recibido no tiene nombre"

            if (!usuario.hasOwnProperty('lastname'))
                throw "get all: el usuario recibido no tiene apellido"

            if (!usuario.hasOwnProperty('age'))
                throw "get all: el usuario recibido no tiene edad"

            if (!usuario.hasOwnProperty('email'))
                throw "get all: el usuario recibido no tiene email"
            
            if (!usuario.hasOwnProperty('zone'))
                throw "get all: el usuario recibido no tiene zona"

            if (!usuario.hasOwnProperty('password'))
                throw "get all: el usuario recibido no tiene contraseña"
        }

        //console.log("get all: ok")

        return "ok"

    } catch (err) {
        //console.log(err)

        return "GetAllUsuarios -- " + err.message
    }
}
