const publicaciones = [
    {
        id: 1,
        title: 'Sillon 2 plazas',
        description: 'Sillon ecocuero de dos plazas con apolla pie',
        category: 'Muebles',
        zone: 'Villa crespo',
        keyword: ['Sillon'],
        state: 'available',
        owner: 'http://localhost:8081/api/usuarios/test1@test.com',
        reservedby: ''
    },
    {
        id: 2,
        title: 'Mesa madera',
        description: 'mesa',
        category: 'Muebles',
        zone: 'Almagro',
        keyword: ['Muebles','Sillon'],
        state: 'finished',
        owner: 'http://localhost:8081/api/usuarios/test2@test.com',
        reservedby: 'http://localhost:8081/api/usuarios/test1@test.com'
    },
    {
        id: 3,
        title: 'Mesa maderafdsfsd',
        description: 'mesa',
        category: 'Mesas',
        zone: 'Almagro',
        keyword: ['Muebles'],
        state: 'finished',
        owner: 'http://localhost:8081/api/usuarios/test1@test.com',
        reservedby: 'http://localhost:8081/api/usuarios/test3@test.com'
    },
    {
        id: 4,
        title: 'Mesa vidrio',
        description: 'mesa',
        category: 'Mesas',
        zone: 'Almagro',
        keyword: ['Mesa'],
        state: 'available',
        owner: 'http://localhost:8081/api/usuarios/test1@test.com',
        reservedby: ''
    }
]

async function getAll() {
    return publicaciones
}

async function getById(id) {
    const publicacionBuscada = publicaciones.find(e => e.id == id)
    return publicacionBuscada
}

async function add(publicacionNueva) {
    const publicacionBuscada = await getById(publicacionNueva.id)
    if (publicacionBuscada)
        throw { status: 400, descripcion: 'ya existe una publicacion con ese id' }

    publicaciones.push(publicacionNueva)
    return publicacionNueva
}

async function deleteById(id) {
    const posBuscada = publicaciones.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'publicacion no encontrada' }

    publicaciones.splice(posBuscada, 1)
}

async function updateById(id, nuevaPublicacion) {
    const posBuscada = publicaciones.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'publicacion no encontrada' }

    publicaciones.splice(posBuscada, 1, nuevaPublicacion)
    return nuevaPublicacion
}

async function getByCategory(category) {
    const publicacionesBuscadas = []
    for (const pub of publicaciones){
        if(pub.category == category){
            publicacionesBuscadas.push(pub)
        }
    }
    return publicacionesBuscadas
}

async function getByKeyword(keyword) {
    const publicacionesBuscadas = []
    for (const pub of publicaciones) {
        for (const key of pub.keyword) {
            if(key == keyword){
                publicacionesBuscadas.push(pub)
                continue
            }
        }
    }
    return publicacionesBuscadas
}

async function getByZone(zone) {
    const publicacionesBuscadas = []
    for (const pub of publicaciones){
        if(pub.zone == zone){
            publicacionesBuscadas.push(pub)
        }
    }
    return publicacionesBuscadas
}


module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    getByCategory,
    getByKeyword,
    getByZone
}
