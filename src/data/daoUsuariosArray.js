const usuarios = [{
    nombre: "nombreTest1",
    apellido: "apellidoTest1",
    edad: 18,
    email: "test1@test.com",
    zona: "zona1"
},{
    nombre: "nombreTest2",
    apellido: "apellidoTest2",
    edad: 22,
    email: "test2@test.com",
    zona: "zona2"
},{
    nombre: "nombreTest3",
    apellido: "apellidoTest3",
    edad: 42,
    email: "test3@test.com",
    zona: "zona3"
},{
    nombre: "nombreTest4",
    apellido: "apellidoTest4",
    edad: 23,
    email: "test4@test.com",
    zona: "zona4"
}]

async function getAll() {
    return usuarios
}

async function getByEmail(email) {
    const usuarioBuscado = usuarios.find(e => e.email == email)
    return usuarioBuscado
}

async function add(usuarioNuevo) {
    const usuarioBuscado = await getByEmail(usuarioNuevo.email)
    if (usuarioBuscado)
        throw { status: 400, descripcion: 'ya existe un usuario con ese email' }

    usuarios.push(usuarioNuevo)
    return usuarioNuevo
}

async function deleteByEmail(email) {
    const posBuscada = usuarios.findIndex(e => e.email == email)
    if (posBuscada == -1)
        throw { status: 404, description: 'usuario no encontrado' }

    usuarios.splice(posBuscada, 1)
}

async function updateByEmail(email, nuevoUsuario) {
    const posBuscada = usuarios.findIndex(e => e.email == email)
    if (posBuscada == -1)
        throw { status: 404, description: 'usuario no encontrado' }

    usuarios.splice(posBuscada, 1, nuevoUsuario)
    return nuevoUsuario
}

module.exports = {
    getAll,
    getByEmail,
    add,
    deleteByEmail,
    updateByEmail
}
