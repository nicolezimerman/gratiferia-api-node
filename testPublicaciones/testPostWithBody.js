const request = require('request-promise-native');

async function testPostWithBody(serverUrl) {

    const testPublicaciones = [
        {
            id: 99,
            title: 'Sillon 2 plazas eco cuero',
            description: 'Sillon',
            category: 'Sillones',
            zone: 'Villa crespo',
            keyword: 'muebles',
            state: 'available',
            owner: '1',
            reservedby: '2'
        }
        // },
        // {
        //     id: 999,
        //     title: 'Mesa ratona',
        //     description: 'Mesa ratona de madera combinada',
        //     category: 'Mesas',
        //     zone: 'Almagro',
        //     keyword: 'muebles',
        //     state: 'reserved',
        //     owner: 'user1',
        //     reservedby: 'user2'
        // },
        // {
        //     id: 9999,
        //     title: 'Set de platos',
        //     description: '',
        //     category: 'Vajilla',
        //     zone: 'Caballito',
        //     //keyword: ['cocina','vajilla'],
        //     keyword: 'vajilla',
        //     state: 'finished',
        //     owner: 'user1',
        //     reservedby: 'user2'
        // }
    ]

    let testOK = true

    let msj = "";

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
                msj = "mensaje vacío (sin publicacion)"
                testOK = false
            } else if (!result.hasOwnProperty('id')) {
                msj = "la publicacion recibido no tiene id"
                testOK = false
            } else if (!result.hasOwnProperty('title')) {
                msj = "la publicacion recibida no tiene titulo"
                testOK = false
            } else if (!result.hasOwnProperty('description')) {
                msj = "la publicacion recibida no tiene descripcion"
                testOK = false
            } else if (!result.hasOwnProperty('category')) {
                msj = "la publicacion recibida no tiene categoria"
                testOK = false
            } else if (!result.hasOwnProperty('zone')) {
                msj = "la publicacion recibida no tiene zona"
                testOK = false
            } else if (!result.hasOwnProperty('keyword')) {
                msj = "la publicacion recibida no tiene palabra clave"
                testOK = false
            } else if (!result.hasOwnProperty('state')) {
                msj = "la publicacion recibida no tiene estado"
                testOK = false
            }

            if (testOK) {
                // console.log("post: ok")
                return "ok"
            }else{
                return "PostWithBody -- " + msj
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

}

module.exports = testPostWithBody
