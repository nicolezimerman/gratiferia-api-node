const knex = require('../db/knex')

async function getAll() {
    console.log(knex)
    try {
        const selectAllQuery = `SELECT * FROM publicaciones;`
        const result = await knex.raw(selectAllQuery)
        // const result = await knex.select('*').from('estudiantes')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

module.exports = {
    getAll
}
