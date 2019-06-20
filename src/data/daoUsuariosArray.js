const usuarios = [{
    id:1,
    nombre: "nombreTest1",
    apellido: "apellidoTest1",
    edad: 18,
    email: "test1@test.com",
    zona: "zona1"
},{
    id:2,
    nombre: "nombreTest2",
    apellido: "apellidoTest2",
    edad: 22,
    email: "test2@test.com",
    zona: "zona2"
},{
    id:3,
    nombre: "nombreTest3",
    apellido: "apellidoTest3",
    edad: 42,
    email: "test3@test.com",
    zona: "zona3"
},{
    id:4,
    nombre: "nombreTest4",
    apellido: "apellidoTest4",
    edad: 23,
    email: "test4@test.com",
    zona: "zona4"
},{
    id:5,
    nombre: "nombreTest5",
    apellido: "apellidoTest5",
    edad: 25,
    email: "test5@test.com",
    zona: "zona5"
},{
    id:6,
    nombre: "nombreTest6",
    apellido: "apellidoTest6",
    edad: 43,
    email: "test6@test.com",
    zona: "zona6"
},{
    id:7,
    nombre: "nombreTest7",
    apellido: "apellidoTest7",
    edad: 71,
    email: "test7@test.com",
    zona: "zona7"
},{
    id:8,
    nombre: "nombreTest8",
    apellido: "apellidoTest8",
    edad: 25,
    email: "test8@test.com",
    zona: "zona8"
},{
    id:9,
    nombre: "nombreTest9",
    apellido: "apellidoTest9",
    edad: 36,
    email: "test9@test.com",
    zona: "zona9"
},{
    id:10,
    nombre: "nombreTest10",
    apellido: "apellidoTest10",
    edad: 21,
    email: "test10@test.com",
    zona: "zona10"
},{
    id:11,
    nombre: "nombreTest11",
    apellido: "apellidoTest11",
    edad: 42,
    email: "test11@test.com",
    zona: "zona11"
},{
    id:12,
    nombre: "nombreTest12",
    apellido: "apellidoTest12",
    edad: 22,
    email: "test12@test.com",
    zona: "zona12"
}]

async function getAll() {
    return usuarios
}

async function getById(id) {
    const usuarioBuscado = usuarios.find(e => e.id == id)
    return usuarioBuscado
}

async function getPaginado(offset, limit) {

    // const resultadosPorPagina = 10;

    if (offset == undefined){
        offset = 0
    }

    const paginado = [];

        for (let index = offset; index < limit; index++) {
            if (usuarios[index] != null) {
                paginado.push(usuarios[index]);
            }
        }

    return paginado
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
