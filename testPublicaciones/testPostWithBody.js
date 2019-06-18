const request = require('request-promise-native');

async function testPostWithBody(serverUrl) {

    const testPublicaciones = [
        {
            id: 1,
            title: 'Sillon 2 plazas eco cuero',
            description: 'Sillon',
            category: 'Sillones',
            zone: 'Villa crespo',
            keyword: 'muebles',
            state: 'available'
        },
        {
            id: 2,
            title: 'Mesa ratona',
            description: 'Mesa ratona de madera combinada',
            category: 'Mesas',
            zone: 'Almagro',
            keyword: 'muebles',
            state: 'reserved'
        },
        {
            id: 3,
            title: 'Set de platos',
            description: '',
            category: 'Vajilla',
            zone: 'Caballito',
            //keyword: ['cocina','vajilla'],
            keyword: 'vajilla',
            state: 'finished'
        }
    ]

    let testResult = true

    for (const publicacion of testPublicaciones) {

        const options = {
            method: 'POST',
            uri: `${serverUrl}/publicaciones`,
            body: publicacion,
            json: true
        }

        try {
            const result = await request(options)

            if (!result) {
                console.log("post: mensaje vacío (sin publicacion)")
            } else if (!result.hasOwnProperty('id')) {
                console.log("post: la publicacion recibido no tiene id")
            } else if (!result.hasOwnProperty('title')) {
                console.log("post: la publicacion recibida no tiene titulo")
            } else if (!result.hasOwnProperty('description')) {
                console.log("post: la publicacion recibida no tiene descripcion")
            } else if (!result.hasOwnProperty('category')) {
                console.log("post: la publicacion recibida no tiene categoria")
            } else if (!result.hasOwnProperty('zona')) {
                console.log("post: la publicacion recibida no tiene zona")
            } else if (!result.hasOwnProperty('keyword')) {
                console.log("post: la publicacion recibida no tiene palabra clave")
            } else if (!result.hasOwnProperty('state')) {
                console.log("post: la publicacion recibida no tiene estado")
            }
        } catch (err) {
            // console.log(err.error)
            return "PostWithBody -- " +err.message
            // if (err.statusCode == 400) {
            //     console.log("post: error - peticion mal formada")
            // } else if (err.statusCode == 500) {
            //     console.log("post: error - el servidor no pudo realizar lo pedido")
            // } else {
            //     console.log("post: error inesperado")
            // }
            // testResult = false
        }
    }
    if (testResult) {
        // console.log("post: ok")
        return "ok"
    }
}

module.exports = testPostWithBody
