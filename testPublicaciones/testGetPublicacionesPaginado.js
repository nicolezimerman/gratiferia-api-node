const request = require('request-promise-native')

module.exports = async function testGetPublicacionesPaginado(serverUrl) {

    const targetPage = '?page=1'

    const options = {
        uri: serverUrl + '/publicaciones' + '/' + targetPage,
        json: true
    }

    try {
        const publicaciones = await request(options)

        if (!publicaciones)
            throw "get paginado: mensaje vacío (sin publicaciones)"

        // if (!usuario.hasOwnProperty('email'))
        //     throw "get paginado: el usuario recibido no tiene email"

        // if (!usuario.hasOwnProperty('nombre'))
        //     throw "get paginado: el usuario recibido no tiene nombre"

        // if (!usuario.hasOwnProperty('apellido'))
        //     throw "get paginado: el usuario recibido no tiene apellido"

        // if (!usuario.hasOwnProperty('edad'))
        //     throw "get paginado: el usuario recibido no tiene edad"
        
        // if (!usuario.hasOwnProperty('zona'))
        //     throw "get paginado: el usuario recibido no tiene zona"

        console.log("get paginado: ok " + "publicaciones:" + publicaciones.length)

    } catch (err) {
        if (err.status == 404)
            console.log("get paginado: ok (not found)")
        else
            console.log(err)
    }
}
