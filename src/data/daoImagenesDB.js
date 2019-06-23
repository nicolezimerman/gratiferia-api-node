//OK
async function getAll() {
    return imagenes
}

//OK
async function getById(id) {
    const imagenBuscada = imagenes.find(e => e.id == id)
    return imagenBuscada
}

//OK
async function getPaginado (resultadoParcial,cantPorPagina,page){
    if(resultadoParcial != undefined){
        imagenesParcial = resultadoParcial
    }else{
        imagenesParcial = imagenes
    }
    
    const imagenesBuscadas = []
    const desde = ((page - 1)*cantPorPagina)

    for (let index = desde; index < (desde+cantPorPagina); index++) {
        if(imagenesParcial[index] != null){
            imagenesBuscadas.push(imagenesParcial[index])
        }
    }
    return imagenesBuscadas
}
//OK
async function add(archivo) {
    const id = (imagenes.length) +1
    const imagenBuscada = await getById(id)
    if (imagenBuscada)
        throw { status: 400, descripcion: 'ya existe una imagen con ese id' }

    const imagenNueva = {}
    imagenNueva.id = id,
    imagenNueva.path = 'src/public/images/uploads/'+archivo.filename,
    imagenNueva.self = 'http://localhost:8081/api/imagenes/'+id
   
    imagenes.push(imagenNueva)
    return imagenNueva
}
//OK
async function deleteById(id) {
    const posBuscada = imagenes.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'imagen no encontrada' }

    imagenes.splice(posBuscada, 1)
}

//OK
async function updateById(id, imagenNueva) {
    const posBuscada = imagenes.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'imagen no encontrada' }

    imagenes.splice(posBuscada, 1, imagenNueva)
    return imagenNueva
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    getPaginado
}
