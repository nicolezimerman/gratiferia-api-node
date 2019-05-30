
const request = require('request-promise-native');

module.exports = async function testPutWithIdentifier(serverUrl) {

    const targetId = 2

    const nuevaPubli = {
        id: 2,
        title: 'Sillon 2 plazas',
        description: 'Sillon ecocuero de dos plazas con apoya pie',
        category: 'Muebles',
        zone: 'Villa crespo',
        keyword: 'Sillon',
        state: 'available'
    }

    const options = {
        method: 'PUT',
        uri: `${serverUrl}/publicacions/${targetId}`,
        body: nuevaPubli,
        json: true
    };

    try {
        const publicacion = await request(options)

        if (!publicacion)
            throw "put: mensaje vacío (sin publicacionn)"

        if (publicacion.id != targetId)
            throw "put: la publicacion recibida no es la reemplazada"

        if (!usuario.hasOwnProperty('title'))
            throw "put: la publicacion recibida no tiene titulo"

        if (!usuario.hasOwnProperty('description'))
            throw "put: la publicacion recibida no tiene descripcion"

        if (!usuario.hasOwnProperty('category'))
            throw "put: la publicacion recibida no tiene categoria"

        if (!usuario.hasOwnProperty('zone'))
            throw "put: la publicacion recibida no tiene zona de retiro"

        if (!usuario.hasOwnProperty('keyword'))
            throw "put: la publicacion recibida no tiene palabra/s clave"
        
        if (!usuario.hasOwnProperty('state'))
            throw "put:  la publicacion recibida no tiene estado"
        
        console.log("put: ok")

    } catch (err) {
        console.log(err)
    }
}
