const request = require('request-promise-native');

module.exports = async function testPostWithBody(serverUrl) {

    const nuevoUser = {
        id:22,
        nombre: 'facundo',
        apellido: 'aguero',
        edad: 22,
        email: 'facu.aguero12@hotmail.com',
        zona: 'vdp'
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

        if (!usuario.hasOwnProperty('nombre'))
            throw "post: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('apellido'))
            throw "post: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('edad'))
            throw "post: el usuario recibido no tiene edad"

        if (!usuario.hasOwnProperty('zona'))
            throw "post: el usuario recibido no tiene zona"

        // console.log("post: ok")

        return "ok"

    } catch (err) {
        // console.log(err)
        return "PostWithBody -- " +err.message
    }
}
