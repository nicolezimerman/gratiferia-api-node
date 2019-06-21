const request = require('request-promise-native')

module.exports = async function testGetPublicacionesPaginado(serverUrl) {

    const targetPage = '?offset=0&limit=10'

    let msj = "";

    let testOK = true;

    const options = {
        uri: serverUrl + '/publicaciones' + '/' + targetPage,
        json: true
    }

    try {
        const publicaciones = await request(options)

        if (!publicaciones){
            msj = "mensaje vacío (sin publicaciones)"
            testOK = false;
        }
        // console.log("get paginado: ok " + "publicaciones:" + publicaciones.length)
        if (testOK){
            return "ok"
        }else{
            return "GetPaginado -- " + msj
        } 

    } catch (err) {
        // if (err.status == 404)
        //     // console.log("get paginado: ok (not found)")
        //     return "GetPaginado -- " + "ok (not found)"
        // else
            // console.log(err)
        return "GetPaginado -- " +err.message
    }
}
