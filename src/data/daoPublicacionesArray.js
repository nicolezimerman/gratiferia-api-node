const publicaciones = []

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
    const publicacionesBuscadas = publicaciones.find(e => e.category == category)
    return publicacionesBuscadas
}

async function getByKeyword(keyword) {
    //DESARROLLAR
    const publicacionesBuscadas = publicaciones.find(e => e.keyword == keyword)
    return publicacionBuscadas
}

async function getByZone(zone) {
    const publicacionesBuscadas = publicaciones.find(e => e.zone == zone)
    return publicacionBuscadas
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
