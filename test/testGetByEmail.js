const request = require('request-promise-native')

module.exports = async function testGetByEmail(serverUrl) {

    const targetEmail = "perez@gmail.com"

    const options = {
        uri: serverUrl + 'usuarios' + '/' + targetEmail,
        json: true
    }

    try {
        const usuario = await request(options)

        if (!usuario)
            throw "get by email: mensaje vacío (sin usuario)"

        if (!usuario.hasOwnProperty('id'))
            throw "get by email: el usuario recibido no tiene id"

        if (usuario.email != targetEmail)
            throw "get by email: el usuario recibido no es el buscado"

        if (!usuario.hasOwnProperty('name'))
            throw "get by email: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('lastname'))
            throw "get by email: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('age'))
            throw "get by email: el usuario recibido no tiene edad"
        
        if (!usuario.hasOwnProperty('zone'))
            throw "get by email: el usuario recibido no tiene zona"
            
        if (!usuario.hasOwnProperty('password'))
            throw "get by email: el usuario recibido no tiene password"

        //console.log("get by id: ok")
        return "ok"

    } catch (err) {
        if (err.status == 404)
            //console.log("get by id: ok (not found)")
            return "GetByEmail -- " + "ok (not found)"
        else
            // console.log(err)
            return "GetByEmail -- " +err.message
    }
}
