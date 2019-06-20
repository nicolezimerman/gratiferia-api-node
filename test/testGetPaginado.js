const request = require('request-promise-native')

module.exports = async function testGetPaginado(serverUrl) {

    const targetPage = '?offset=0&limit=10'

    const options = {
        uri: serverUrl + 'usuarios' + '/' + targetPage,
        json: true
    }

    try {
        const usuarios = await request(options)

        if (!usuarios)
            throw "get paginado: mensaje vacío (sin usuarios)"

        //console.log("get paginado: ok " + "usuarios:" + usuarios.length)

        return "ok"

    } catch (err) {
        if (err.status == 404)
            //console.log("get paginado: ok (not found)")
            return "GetPaginado -- " + "ok (not found)"
        else
            // console.log(err)
            return "GetPaginado -- " +err.message
    }
}
