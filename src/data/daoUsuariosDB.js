const knex = require('../db/knex')

//OK
async function getAll() {
    try {
        const selectAllQuery = `SELECT * from users;`
        const result = await knex.raw(selectAllQuery)
        // const result = await knex.select('*').from('estudiantes')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function getByEmail(email) {
    try {
        // const selectById = `SELECT * FROM publications WHERE id= ${id};`
        // const result = await knex.raw(selectById)
        const result = await knex.select('*').from('users').where('email', email)

        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function add(usuarioNuevo) {
    try{
        await knex('users').insert({ name: usuarioNuevo.name, 
            lastname: usuarioNuevo.lastname,
            zone: usuarioNuevo.zone,
            email: usuarioNuevo.email,
            age: usuarioNuevo.age,
            password: usuarioNuevo.password
         })
        
         return usuarioNuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function deleteById(id) {
    const usuarioBuscado = await getById(id)    
    
    if (usuarioBuscado == undefined || usuarioBuscado.length == 0)
        throw { status: 404, description: 'usuario no encontrado' }
    
    try {
        const deleteByIdQuery = `DELETE FROM users WHERE id=${id}`
        await knex.raw(deleteByIdQuery)
        return
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function updateById(id, usuarioNuevo) {
    const usuarioBuscado = await getById(id)    
    
    if (usuarioBuscado == undefined || usuarioBuscado.length == 0)
        throw { status: 404, description: 'usuario no encontrado' }

    try {
        await knex('users').where('id','=',id).update(
        { name: usuarioNuevo.name, 
            lastname: usuarioNuevo.lastname,
            zone: usuarioNuevo.zone,
            email: usuarioNuevo.email,
            age: usuarioNuevo.age,
            password: usuarioNuevo.password
         })

        return usuarioNuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

// //OK
// async function searchWithParameters(parametros){

//     try {
//         const publicacionesBuscadas = await knex.select('*').from('publications').where(parametros)
//         return publicacionesBuscadas
//     } catch (err) {
//         throw { status: 500, descripcion: err.message }
//     }    
// }

//falta-pensar como sumarlo a las queries. 
async function getPaginado (offset,limit){
    
    if(offset == undefined || offset < 0){
        offset = 0
    }

    const usuarios = getAll()

    const usuariosBuscados = []
    // const desde = ((page - 1)*cantPorPagina)

    for (let index = offset; index < limit; index++) {
        if(usuarios[index] != null){
            usuariosBuscados.push(usuarios[index])
        }
    }
    return usuariosBuscados
}


module.exports = {
    getAll,
    getByEmail,
    add, 
    deleteById, 
    updateById,
    // searchWithParameters,
    getPaginado
}
