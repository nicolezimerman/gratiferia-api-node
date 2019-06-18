const request = require('request-promise-native')

module.exports = async function testGetPaginado(serverUrl) {

    const targetPage = '?page=1'

    const options = {
        uri: serverUrl + 'usuarios' + '/' + targetPage,
        json: true
    }

    try {
        const usuarios = await request(options)

        if (!usuarios)
            throw "get paginado: mensaje vacío (sin usuarios)"

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

        //console.log("get paginado: ok " + "usuarios:" + usuarios.length)

        return "ok"

    } catch (err) {
        if (err.status == 404)
            console.log("get paginado: ok (not found)")
        else
            // console.log(err)
            return "GetPaginado -- " +err.message
    }
}
