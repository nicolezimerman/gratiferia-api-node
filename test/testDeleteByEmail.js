const request = require('request-promise-native');

module.exports = async function testDeleteByEmail(serverUrl) {

    const targetEmail = 'test1@test.com'

    const options = {
        method: 'DELETE',
        uri: serverUrl + 'usuarios' + '/' + targetEmail,
        json: true
    }

    try {
        const body = await request(options)
        if (body)
            throw "delete: unexpected response"
        
        console.log('delete: ok')
    } catch (err) {
        console.log(err)
    }
}