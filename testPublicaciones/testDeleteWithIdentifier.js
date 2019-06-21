const request = require('request-promise-native');

async function testDeleteWithIdentifier(serverUrl) {

    targetId = 1;

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
            return "DeleteWithIdentifier -- " + "ok (not found)"
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