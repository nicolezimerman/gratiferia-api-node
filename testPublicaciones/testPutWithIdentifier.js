
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
        state: 'available',
        owner: 'http://localhost:8081/api/usuarios/1',
        reservedby: 'http://localhost:8081/api/usuarios/2'
    }

    const options = {
        method: 'PUT',
        uri: `${serverUrl}/publicaciones/${targetId}`,
        body: nuevaPubli,
        json: true
    };

    let testOK = true

    let msj = ""

    try {
        const publicacion = await request(options)

        if (!publicacion){
            msj = "mensaje vacío (sin publicacion)"
            testOK = false
        }
        else if (publicacion.id != targetId){
            msj = "la publicacion recibida no es la reemplazada"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('title')){
            msj = "la publicacion recibida no tiene titulo"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('description')){
            msj = "la publicacion recibida no tiene descripcion"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('category')){
            msj = "la publicacion recibida no tiene categoria"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('zone')){
            msj = "la publicacion recibida no tiene zona de retiro"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('keyword')){
            msj = "la publicacion recibida no tiene palabra/s clave"
            testOK = false
        }
        else if (!publicacion.hasOwnProperty('state')){
            msj = "la publicacion recibida no tiene estado"
            testOK = false
        }
        // console.log("put: ok")
        if(testOK){
            return "ok"
        }else{
            return "PutWithIdentifier -- " + msj
        }
        
    } catch (err) {
        // console.log(err)
        return "PutWithIdentifier -- " +err.message
    }
}
