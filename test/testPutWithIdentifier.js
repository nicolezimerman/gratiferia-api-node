
const request = require('request-promise-native');

module.exports = async function testPutWithIdentifier(serverUrl) {

    const targetId = 3

    const nuevoUser = {
        id: 3,
        name: 'Mirtha',
        lastname: 'Legrand',
        age: 99,
        zone: 'recoleta',
        email:'test3@test.com',
        password: '123456'
    }

    const options = {
        method: 'PUT',
        uri: serverUrl + 'usuarios' + '/' + targetId,
        body: nuevoUser,
        json: true
    };

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "put: mensaje vacío (sin usuario)"

        if (usuario.id != targetId)
            throw "put: el usuario recibido no es el reemplazado"

        if (!usuario.hasOwnProperty('name'))
            throw "put: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('lastname'))
            throw "put: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('age'))
            throw "put: el usuario recibido no tiene edad"

        if (!usuario.hasOwnProperty('email'))
            throw "put: el usuario recibido no tiene email"

        if (!usuario.hasOwnProperty('zone'))
            throw "put: el usuario recibido no tiene zona"

        if (!usuario.hasOwnProperty('password'))
            throw "put: el usuario recibido no tiene password"

        // console.log("put: ok")

        return "ok"

    } catch (err) {
        // console.log(err)
        return "PutWithIdentifier -- " +err.message
    }
}
