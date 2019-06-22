const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/daoFactory')

const router = express.Router()

const baseURI = '/api/publicaciones'


// const publicacionesDAO = require('../data/publicacionesDAO_Arr')
// const publicacionesDAO = require('../data/publicacionesDAO_DB')


//testGetAll
router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQSNew(req, res)
    }
})

async function _handleGetAll(req, res) {
    try {
        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const result = await publicacionesDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

//Get by category/zone/keyword
async function _handleGetWithQS(req, res) {
    var category = req.query.category
    var keyword = req.query.keyword
    var zone = req.query.zone
    var offset = req.query.offset
    var limit = req.query.limit
    // var page = req.query.page
    const cantPorPagina = 5
    var resultadoParcial = undefined
    //console.log(resultadoParcial == undefined)
    if(category != undefined){
        console.log("busqueda por category")
        try {
            const publicacionesDAO = daoFactory.getPublicacionesDAO()
            resultadoParcial = await publicacionesDAO.getByCategory(category,resultadoParcial)

            if (!resultadoParcial)
                throw { status: 404, descripcion: 'publicaciones no encontradas para esa categoria' }
            
            //res.json(resultadoParcial)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
    if(zone != undefined){
        console.log("busqueda por zone")
        try {
            const publicacionesDAO = daoFactory.getPublicacionesDAO()
            resultadoParcial = await publicacionesDAO.getByZone(zone,resultadoParcial)

            if (!resultadoParcial)
                throw { status: 404, descripcion: 'publicacion no encontrada para esa zona' }

            //res.json(resultadoParcial)
        } catch (err) {
            res.status(err.status).json(err)
        }
    } 
    if(keyword != undefined){
        console.log("busqueda por keyword")
        try {
            const publicacionesDAO = daoFactory.getPublicacionesDAO()
            resultadoParcial = await publicacionesDAO.getByKeyword(keyword,resultadoParcial)
    
            if (!resultadoParcial)
                throw { status: 404, descripcion: 'publicacion no encontrado para esa palabra clave' }
    
            //res.json(resultadoParcial)
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
    if(limit != undefined){
        console.log("paginado")
        try{
            const publicacionesDAO = daoFactory.getPublicacionesDAO()
            resultadoParcial = await publicacionesDAO.getPaginado(resultadoParcial, offset, limit)

            if(!resultadoParcial)
                throw { status: 404, descripcion: 'publicaciones no encontradas para esa página' }
        
            //res.json(resultadoParcial)
        } catch (err){
            res.status(err.status).json(err)
        }
    }
    //ver como ver si esta vacio o es que no habian funciones para los parametros
    if(resultadoParcial == undefined){
        res.status(400).json("no existe ninguna funcion para el/los parametro/s indicado/s")
    }else{
        res.json(resultadoParcial)
    }
}

async function _handleGetWithQSNew(req, res) {
    console.log("busqueda con filtros parametrizada")
    var parametros = req.query
    // var page = parametros.page
    const offset = parametros.offset
    const limit = parametros.limit
    // const cantPorPagina = 2
    // delete parametros.page
    console.log(parametros)
    // console.log('page: ' + page)
    var resultado = undefined

    try {
        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        resultado = await publicacionesDAO.searchWithParameters(parametros)

        if (!resultado)
            throw { status: 404, descripcion: 'publicaciones no encontradas para esa busqueda' }
        
        //res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    } 
    if(limit != undefined){
        try {
            const publicacionesDAO = daoFactory.getPublicacionesDAO()
            const resultadoParcial = undefined;
            resultado = await publicacionesDAO.getPaginado(resultadoParcial,offset, limit)
            
            if(!resultado || (resultado.length === 0))
                throw { status: 404, descripcion: 'publicaciones no encontradas para esa pagina' }
        
            //res.json(resultado)        
        } catch (err) {
            res.status(err.status).json(err)
        }
    }
    res.json(resultado)
}

//testGetWithIdentifier
router.get('/:id', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const resultado = await publicacionesDAO.getById(req.params.id)

        if (!resultado)
            throw { status: 404, descripcion: 'publicación no encontrada' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//testPostWithBody
router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevo = req.body
        if (esPublicacionInvalida(nuevo))
            throw { status: 400, descripcion: 'la publicacion posee un formato json invalido o faltan datos' }
        
        if(nuevo.owner == nuevo.reservedby)
            throw { status: 401, descripcion: 'el owner y el reservedby no pueden ser el mismo usuario'}

        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const pubCreada = await publicacionesDAO.add(nuevo)
        res.status(201).json(pubCreada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//testDeleteWithIdentifier
router.delete('/:id', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }

        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        await publicacionesDAO.deleteById(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//testPutWithIdentifier
router.put('/:id', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.id))
            throw { status: 400, descripcion: 'el id provisto no es un número o es inválido' }
        const nuevo = req.body

        if (esPublicacionInvalida(nuevo))
            throw { status: 400, descripcion: 'la publicacion posee un formato json invalido o faltan datos' }

        if (req.params.id != nuevo.id)
            throw { status: 400, descripcion: 'el id provisto no coincide entre el recurso buscado y el nuevo' }

        //CHEQUEAR -> para validar que el que actualiza sea su owner. O tiene que ir dentro del updateById en el dao?
        if (req.body.owner != nuevo.owner)
            throw { status: 400, descripcion: 'la publicacion solo puede ser actualizada por su owner'}
        
        if (nuevo.owner == nuevo.reservedby)
            throw { status: 401, descripcion: 'el owner y el reservedby no pueden ser el mismo usuario'}
        
        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const pubActualizada = await publicacionesDAO.updateById(req.params.id, nuevo)
        res.json(pubActualizada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esPublicacionInvalida(publicacion) {
    const schema = {
        id: Joi.number().integer().min(0),
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        category: Joi.string().min(1).required(),
        zone: Joi.string().min(1).required(),
        keyword: Joi.string().min(1), //ver como validar array
        state: Joi.string().min(1).valid('available','reserved','finished').required(),
        owner: Joi.string().required(),
        reservedby: Joi.string().required(),
        image: Joi.string()
    }
    const { error } = Joi.validate(publicacion, schema);
    return error
}


module.exports = router
