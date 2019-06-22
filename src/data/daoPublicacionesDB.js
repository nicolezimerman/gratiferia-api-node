const knex = require('../db/knex')

//OK
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

//OK
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

//OK
async function add(publicacionNueva) {
    try{
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

//OK
async function deleteById(id) {
    const publicacionBuscada = await getById(id)    
    
    if (publicacionBuscada == undefined || publicacionBuscada.length == 0)
        throw { status: 404, description: 'publicacion no encontrada' }
    
    try {
        const deleteByIdQuery = `DELETE FROM publications WHERE id=${id}`
        await knex.raw(deleteByIdQuery)
        return
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function updateById(id, publicacionNueva) {
    const publicacionBuscada = await getById(id)    
    
    if (publicacionBuscada == undefined || publicacionBuscada.length == 0)
        throw { status: 404, description: 'publicacion no encontrada' }

    try {
        await knex('publications').where('id','=',id).update(
        { title: publicacionNueva.title, 
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

//OK
async function searchWithParameters(parametros){

    try {
        const publicacionesBuscadas = await knex.select('*').from('publications').where(parametros)
        return publicacionesBuscadas
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }    
}

//falta-pensar como sumarlo a las queries. 
async function getPaginado (resultadoParcial,offset,limit){
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = publicaciones
    }
    
    if(offset == undefined || offset < 0){
        offset = 0
    }

    const publicacionesBuscadas = []
    // const desde = ((page - 1)*cantPorPagina)

    for (let index = offset; index < limit; index++) {
        if(publicacionesParcial[index] != null){
            publicacionesBuscadas.push(publicacionesParcial[index])
        }
    }
    return publicacionesBuscadas
}


module.exports = {
    getAll,
    getById,
    add, 
    deleteById, 
    updateById,
    searchWithParameters,
    getPaginado,
}
