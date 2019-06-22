const knex = require('../db/knex')

async function getAll() {
    try {
        const selectAllQuery = `SELECT * from publications;`
        const result = await knex.raw(selectAllQuery)
        // const result = await knex.select('*').from('estudiantes')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getById(id) {
    try {
        // const selectById = `SELECT * FROM publications WHERE id= ${id};`
        // const result = await knex.raw(selectById)
        const result = await knex.select('*').from('publications').where('id', id)

        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function add(publicacionNueva) {
    try{
        const publicacionBuscada = await getById(publicacionNueva.id)
        if (publicacionBuscada)
        throw { status: 400, descripcion: 'ya existe una publicacion con ese id' }
        
        await knex('publications').insert({ title: publicacionNueva.title, 
            description: publicacionNueva.description,
            category: publicacionNueva.category,
            zone: publicacionNueva.zone,
            keyword: publicacionNueva.keyword,
            state: publicacionNueva.state,
            owner: publicacionNueva.owner,
            reservedby: publicacionNueva.reservedby,
            image: publicacionNueva.image
         })
        
         return publicacionNueva
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function deleteById(id) {
    const publicacionBuscada = await getById(id)    
    if (publicacionBuscada == undefined)
        throw { status: 404, description: 'publicacion no encontrada' }

    publicaciones.splice(posBuscada, 1)
}

module.exports = {
    getAll,
    getById,
    add
}
