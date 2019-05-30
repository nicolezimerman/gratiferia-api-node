const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/daoFactory')

// const publicacionesDAO = require('../data/publicacionesDAO_Arr')
// const publicacionesDAO = require('../data/publicacionesDAO_DB')

const router = express.Router()

const baseURI = '/api/publicaciones'
//testGetAll
router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQS(req, res)
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
/* este tengo que modificarlo para que sea get by category/zone/keyword
async function _handleGetWithQS(req, res) {
    try {
        if (isNaN(req.query.edadMin) || isNaN(req.query.edadMax))
            throw { status: 400, descripcion: 'las edades provistas no son numéricas' }

        if (req.query.edadMin < 0 || req.query.edadMax < 0)
            throw { status: 400, descripcion: 'las edades provistas no son positivas' }

        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const result = await publicacionesDAO.getByAge(req.query.edadMin, req.query.edadMax)
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}
*/

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

        const publicacionesDAO = daoFactory.getPublicacionesDAO()
        const pubActualizada = await publicacionesDAO.updateById(req.params.id, nuevo)
        res.json(pubActualizada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//GetByCategory
router.get('/:category', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        const publicacionesDAO = daoFactory.getpublicacionesDAO()
        const resultado = await publicacionesDAO.getByCategory(req.params.category)

        if (!resultado)
            throw { status: 404, descripcion: 'publicaciones no encontradas para esa categoria' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//GetByKeyword
router.get('/:keyword', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        const publicacionesDAO = daoFactory.getpublicacionesDAO()
        const resultado = await publicacionesDAO.getByKeyword(req.params.keyword)

        if (!resultado)
            throw { status: 404, descripcion: 'publicacion no encontrado para esa palabra clave' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//GetByZone
router.get('/:zone', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        const publicacionesDAO = daoFactory.getpublicacionesDAO()
        const resultado = await publicacionesDAO.getByZone(req.params.zone)

        if (!resultado)
            throw { status: 404, descripcion: 'publicacion no encontrada para esa zona' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esPublicacionInvalida(publicacion) {
    const schema = {
        id: Joi.number().integer().min(0).required(),
        title: Joi.string().min(1).required(),
        description: Joi.string().min(1).required(),
        category: Joi.string().min(1).required(),
        zone: Joi.string().min(1).required(),
        keyword: Joi.string().min(1),
        state: Joi.string().min(1).valid('available','reserved','finished').required()
    }
    const { error } = Joi.validate(publicacion, schema);
    return error
}

module.exports = router
/*
{
    "title": "Sillon 2 plazas",
    "description": "Sillon ecocuero de dos plazas con apoya pie",
    "category": "Muebles",
    "zone": "Villa crespo",
    "keyword": "Sillon",
    "state": "available"
}
*/