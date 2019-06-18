const request = require('request-promise-native');

module.exports = async function testDeleteById(serverUrl) {

    const targetId = 1

    const options = {
        method: 'DELETE',
        uri: serverUrl + 'usuarios' + '/' + targetId,
        json: true
    }

    try {
        const body = await request(options)
        if (body)
            throw "delete: unexpected response"
        
        //console.log('delete: ok')
        return "ok"
    } catch (err) {
        //console.log(err)
        return "DeleteById -- " +err.message
    }
}