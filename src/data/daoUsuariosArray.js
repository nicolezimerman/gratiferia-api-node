const usuarios = []

async function getAll() {
    return usuarios
}

async function getByEmail(email) {
    const usuarioBuscado = usuario.find(e => e.email == email)
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
