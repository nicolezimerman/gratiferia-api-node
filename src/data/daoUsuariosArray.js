const usuarios = [{
    id:1,
    name: "nicole",
    lastname: "zimerman",
    age: 24,
    email: "nzimer@gmail.com",
    zone: "almagro",
    password: "123456"
},{
    id:2,
    name: "nameTest2",
    lastname: "lastnameTest2",
    age: 22,
    email: "test2@test.com",
    zone: "zone2",
    password: "123456"
},{
    id:3,
    name: "nameTest3",
    lastname: "lastnameTest3",
    age: 42,
    email: "test3@test.com",
    zone: "zone3",
    password: "123456"
},{
    id:4,
    name: "nameTest4",
    lastname: "lastnameTest4",
    age: 23,
    email: "test4@test.com",
    zone: "zone4",
    password: "123456"
},{
    id:5,
    name: "nameTest5",
    lastname: "lastnameTest5",
    age: 25,
    email: "test5@test.com",
    zone: "zone5",
    password: "123456"
},{
    id:6,
    name: "nameTest6",
    lastname: "lastnameTest6",
    age: 43,
    email: "test6@test.com",
    zone: "zone6",
    password: "123456"
},{
    id:7,
    name: "nameTest7",
    lastname: "lastnameTest7",
    age: 71,
    email: "test7@test.com",
    zone: "zone7",
    password: "123456"
},{
    id:8,
    name: "nameTest8",
    lastname: "lastnameTest8",
    age: 25,
    email: "test8@test.com",
    zone: "zone8",
    password: "123456"
},{
    id:9,
    name: "nameTest9",
    lastname: "lastnameTest9",
    age: 36,
    email: "test9@test.com",
    zone: "zone9",
    password: "123456"
},{
    id:10,
    name: "nameTest10",
    lastname: "lastnameTest10",
    age: 21,
    email: "test10@test.com",
    zone: "zone10",
    password: "123456"
},{
    id:11,
    name: "nameTest11",
    lastname: "lastnameTest11",
    age: 42,
    email: "test11@test.com",
    zone: "zone11",
    password: "123456"
},{
    id:12,
    name: "nameTest12",
    lastname: "lastnameTest12",
    age: 22,
    email: "test12@test.com",
    zone: "zone12",
    password: "123456"
}]

async function getAll() {
    return usuarios
}

async function getById(id) {
    const usuarioBuscado = usuarios.find(e => e.id == id)
    return usuarioBuscado
}

async function getByEmail(email) {
    const usuarioBuscado = usuarios.find(e => e.email == email)
    return usuarioBuscado
}

async function getPaginado(offset, limit) {

    // const resultadosPorPagina = 10;

    if (offset == undefined || offset < 0){
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
    const usuarioBuscado = await getByEmail(usuarioNuevo.email)
    if (usuarioBuscado)
        throw { status: 400, descripcion: 'ya existe un usuario con ese email' }

    const usuario = usuarios[usuarios.length-1]

    const id = usuario.id

    usuarioNuevo.id = id+1;

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
    getByEmail,
    add,
    deleteById,
    updateById,
    getPaginado
}
