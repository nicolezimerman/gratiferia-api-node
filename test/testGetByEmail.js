const request = require('request-promise-native')

module.exports = async function testGetByEmail(serverUrl) {

    const targetEmail = 'test2@test.com'

    const options = {
        uri: serverUrl + 'usuarios' + '/' + targetEmail,
        json: true
    }

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "get by email: mensaje vacío (sin usuario)"

        if (!usuario.hasOwnProperty('email'))
            throw "get by email: el usuario recibido no tiene email"

        if (usuario.email != targetEmail)
            throw "get by email: el usuario recibido no es el buscado"

        if (!usuario.hasOwnProperty('nombre'))
            throw "get by email: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('apellido'))
            throw "get by email: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('edad'))
            throw "get by email: el usuario recibido no tiene edad"
        
        if (!usuario.hasOwnProperty('zona'))
            throw "get by email: el usuario recibido no tiene zona"

        console.log("get by email: ok")

    } catch (err) {
        if (err.status == 404)
            console.log("get by email: ok (not found)")
        else
            console.log(err)
    }
}
