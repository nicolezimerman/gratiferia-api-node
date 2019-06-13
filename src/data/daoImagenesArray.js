const imagenes = [{
    id:1,
    path: "C:/Users/Nicole/Desktop/NickyORT/API TP2/src/public/images/original/IMG_20170214_140049.jpg",
    self: "apellidoTest1"
},
{
    id:2,
    path: "/IMG_20170214_140049.jpg",
    self: "apellidoTest2"
},
{
    id:3,
    path: "C:/Users/Nicole/Desktop/NickyORT/API TP2/src/public/images/original/IMG_20170214_140049.jpg",
    self: "apellidoTest2"
},
{
    id:4,
    path: "C:/Users/Nicole/Desktop/NickyORT/API TP2/src/public/images/original/IMG_20170214_140049.jpg",
    self: "apellidoTest2"
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

async function add(usuarioNuevo) {
    const usuarioBuscado = await getById(usuarioNuevo.id)
    if (usuarioBuscado)
        throw { status: 400, descripcion: 'ya existe un usuario con ese id' }

    usuarios.push(usuarioNuevo)
    return usuarioNuevo
}

async function deleteById(id) {
    const posBuscada = usuarios.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'usuario no encontrado' }

    usuarios.splice(posBuscada, 1)
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
