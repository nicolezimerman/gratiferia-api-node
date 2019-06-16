const imagenes = [{
    id:1,
    path: "src/public/images/original/IMG_20170214_140049.jpg",
    self: "http://localhost:8081/api/imagenes/1"
},
{
    id:2,
    path: "src/public/images/original/IMG_20170214_140049.jpg",
    self: "http://localhost:8081/api/imagenes/2"
},
{
    id:3,
    path: "src/public/images/original/IMG_20170214_140049.jpg",
    self: "http://localhost:8081/api/imagenes/3"
},
{
    id:4,
    path: "src/public/images/original/IMG_20170214_140049.jpg",
    self: "http://localhost:8081/api/imagenes/4"
}]

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
//FALTA
async function add(id,archivo) {
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
//FALTA
async function deleteById(id) {
    const posBuscada = imagenes.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'imagen no encontrada' }

    imagenes.splice(posBuscada, 1)
}

async function updateById(id, nuevoUsuario) {
    const posBuscada = usuarios.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'usuario no encontrado' }

    usuarios.splice(posBuscada, 1, nuevoUsuario)
    return nuevoUsuario
}

module.exports = {
    getAll,
    getById,
    add,
    deleteById,
    updateById,
    getPaginado
}
