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
            throw "get by id: mensaje vacío (sin usuario)"

        if (!usuario.hasOwnProperty('id'))
            throw "get by id: el usuario recibido no tiene id"

        if (usuario.email != targetEmail)
            throw "get by id: el usuario recibido no es el buscado"

        if (!usuario.hasOwnProperty('name'))
            throw "get by id: el usuario recibido no tiene nombre"

        if (!usuario.hasOwnProperty('lastname'))
            throw "get by id: el usuario recibido no tiene apellido"

        if (!usuario.hasOwnProperty('age'))
            throw "get by id: el usuario recibido no tiene edad"
        
        if (!usuario.hasOwnProperty('zone'))
            throw "get by id: el usuario recibido no tiene zona"
            
        if (!usuario.hasOwnProperty('password'))
            throw "get by id: el usuario recibido no tiene password"

        //console.log("get by id: ok")
        return "ok"

    } catch (err) {
        if (err.status == 404)
            //console.log("get by id: ok (not found)")
            return "GetById -- " + "ok (not found)"
        else
            // console.log(err)
            return "GetById -- " +err.message
    }
}
