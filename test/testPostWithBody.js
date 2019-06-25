const request = require('request-promise-native');

module.exports = async function testPostWithBody(serverUrl) {

    const nuevoUser = {
        name: 'facundo',
        lastname: 'aguero',
        age: 22,
        email: 'facu.aguero12@hotmail.com',
        zone: 'vdp',
        password: '123456'
    }

    const options = {
        method: 'POST',
        uri: serverUrl + 'usuarios',
        body: nuevoUser,
        json: true
    }

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "post: mensaje vacío (sin usuario)"

        if (!usuario.hasOwnProperty('email'))
            throw "post: el usuario recibido no tiene email"

        if (!usuario.hasOwnProperty('name'))
            throw "post: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('lastname'))
            throw "post: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('age'))
            throw "post: el usuario recibido no tiene edad"

        if (!usuario.hasOwnProperty('zone'))
            throw "post: el usuario recibido no tiene zona"

        if (!usuario.hasOwnProperty('password'))
            throw "post: el usuario recibido no tiene password"

        // console.log("post: ok")

        return "ok"

    } catch (err) {
        // console.log(err)
        return "PostWithBody -- " +err.message
    }
}
