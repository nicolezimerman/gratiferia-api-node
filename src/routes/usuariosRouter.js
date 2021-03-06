const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/daoFactory')

// const usuariosDAO = require('../data/usuariosDAO_Arr')
// const usuariosDAO = require('../data/usuariosDAO_DB')

const router = express.Router()

const baseURI = '/api/usuarios'

router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQS(req, res)
    }
})

// router.get('/:num_page', async (req, res) => {
//     console.log(`GETTING: ${baseURI}${req.url}`)
//     try {
//         const num_page = parseInt(req.params.num_page);

//         const resultadosPorPagina = 10;

//         const desde = (num_page-1)*resultadosPorPagina

//         const usuariosDAO = daoFactory.getUsuariosDAO()
        
//         const result = await usuariosDAO.getPaginado(desde) 

//         res.json(result)
//     } catch (err) {
//         res.status(err.status).json(err)
//     }
    
    
// })

async function _handleGetAll(req, res) {
    try {
        const usuariosDAO = daoFactory.getUsuariosDAO()
        const result = await usuariosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

async function _handleGetWithQS(req, res) {
    var offset = req.query.offset
    var limit = req.query.limit
    if(limit != undefined){
        // const num_page = parseInt(page);

        // const resultadosPorPagina = 10;

        // const desde = (num_page-1)*resultadosPorPagina

        const usuariosDAO = daoFactory.getUsuariosDAO()
        
        const result = await usuariosDAO.getPaginado(offset, limit)

        res.json(result)
    }else{
        res.status(400).json("no existe ninguna funcion para el parametro indicado")
    }
}

/* router.get('/:id', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        // if (!emailIsValid(req.params.email))
        //     throw { status: 400, descripcion: 'el email provisto es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const resultado = await usuariosDAO.getById(req.params.id)

        if (!resultado)
            throw { status: 404, descripcion: 'usuario no encontrado' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
}) */

router.get('/:email', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (!emailIsValid(req.params.email))
            throw { status: 400, descripcion: 'el email provisto es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const resultado = await usuariosDAO.getByEmail(req.params.email)

        if (!resultado)
            throw { status: 404, descripcion: 'usuario no encontrado' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevo = req.body
        if (esUsuarioInvalido(nuevo))
            throw { status: 400, descripcion: 'el usuario posee un formato json invalido o faltan datos' }

        const usuariosDAO = daoFactory.getUsuariosDAO()

        const usuario = await usuariosDAO.getByEmail(nuevo.email)

        if(usuario != undefined){throw { status: 400, descripcion: 'ya existe un usuario con el email provisto' } }

        const userCreado = await usuariosDAO.add(nuevo)
        res.status(201).json(userCreado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        // if (!emailIsValid(req.params.email))
        //     throw { status: 400, descripcion: 'el email provisto es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        await usuariosDAO.deleteById(req.params.id)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.put('/:id', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        // if (!emailIsValid(req.params.email))
        //     throw { status: 400, descripcion: 'el email provisto es inválido' }

        const nuevo = req.body

        if (esUsuarioInvalido(nuevo))
            throw { status: 400, descripcion: 'el usuario posee un formato json invalido o faltan datos' }

        if (req.params.id != nuevo.id)
            throw { status: 400, descripcion: 'el id provisto no coincide entre el recurso buscado y el nuevo' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const userActualizado = await usuariosDAO.updateById(req.params.id, nuevo)
        res.json(userActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esUsuarioInvalido(usuario) {
    const schema = {
        id: Joi.number().integer().min(1),
        name: Joi.string().min(1).required(),
        lastname: Joi.string().min(1).required(),
        zone: Joi.string().min(1).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        age: Joi.number().integer().min(0).max(100).required(),
        password: Joi.string().min(1).required()
    }
    const { error } = Joi.validate(usuario, schema);
    return error
}

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

module.exports = router
