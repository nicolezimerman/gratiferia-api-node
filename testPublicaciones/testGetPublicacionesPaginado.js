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

        // console.log("get paginado: ok " + "publicaciones:" + publicaciones.length)
        return "ok"

    } catch (err) {
        if (err.status == 404)
            // console.log("get paginado: ok (not found)")
            return "GetPaginado -- " + "ok (not found)"
        else
            // console.log(err)
            return "GetPaginado -- " +err.message
    }
}
