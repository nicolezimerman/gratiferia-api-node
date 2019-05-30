
const request = require('request-promise-native');

module.exports = async function testPutWithIdentifier(serverUrl) {

    const targetEmail = 'test3@test.com'

    const nuevoUser = {
        nombre: 'Mirtha',
        apellido: 'Legrand',
        edad: 99,
        zona: 'recoleta',
        email:'test3@test.com'
    }

    const options = {
        method: 'PUT',
        uri: serverUrl + 'usuarios' + '/' + targetEmail,
        body: nuevoUser,
        json: true
    };

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "put: mensaje vacío (sin usuario)"

        if (usuario.email != targetEmail)
            throw "put: el usuario recibido no es el reemplazado"

        if (!usuario.hasOwnProperty('nombre'))
            throw "put: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('apellido'))
            throw "put: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('edad'))
            throw "put: el usuario recibido no tiene edad"

        if (!usuario.hasOwnProperty('email'))
            throw "put: el usuario recibido no tiene email"

        console.log("put: ok")

    } catch (err) {
        console.log(err)
    }
}
