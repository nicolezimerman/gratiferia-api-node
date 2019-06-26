const request = require('request-promise-native');

async function testDeleteWithIdentifier(serverUrl) {

    targetId = 6;

    expectedErrorCode = 404;

    const options = {
        method: 'DELETE',
        uri: `${serverUrl}/publicaciones/${targetId}`,
        json: true,
    }

    try {
        await request(options)
        // console.log('delete: ok')
        return "ok"
    } catch (err) {
        if (err.statusCode == expectedErrorCode) {
            // console.log("delete: ok (con error esperado)")
            return "DeleteWithIdentifier -- " + "publicacion no encontrada"
        } else {
            // console.log("delete: error inesperado")
            return "DeleteWithIdentifier -- " +err.message
        }
    }
}

// async function testDeleteWithIdentifier(serverUrl) {
//     runTest(serverUrl, 1)
//     runTest(serverUrl, 123, 404)
// }

module.exports = testDeleteWithIdentifier