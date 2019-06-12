const request = require('request-promise-native')

module.exports = async function testGetById(serverUrl) {

    const targetId = 2

    const options = {
        uri: serverUrl + 'usuarios' + '/' + targetId,
        json: true
    }

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "get by id: mensaje vacío (sin usuario)"

        if (!usuario.hasOwnProperty('id'))
            throw "get by id: el usuario recibido no tiene id"

        if (usuario.id != targetId)
            throw "get by id: el usuario recibido no es el buscado"

        if (!usuario.hasOwnProperty('nombre'))
            throw "get by id: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('apellido'))
            throw "get by id: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('edad'))
            throw "get by id: el usuario recibido no tiene edad"
        
        if (!usuario.hasOwnProperty('zona'))
            throw "get by id: el usuario recibido no tiene zona"

        console.log("get by id: ok")

    } catch (err) {
        if (err.status == 404)
            console.log("get by id: ok (not found)")
        else
            console.log(err)
    }
}
