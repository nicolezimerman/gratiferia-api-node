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

async function _handleGetAll(req, res) {
    try {
        const usuariosDAO = daoFactory.getUsuariosDAO()
        const result = await usuariosDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}

/*async function _handleGetWithQS(req, res) {
    try {
        if (isNaN(req.query.edadMin) || isNaN(req.query.edadMax))
            throw { status: 400, descripcion: 'las edades provistas no son numéricas' }

        if (req.query.edadMin < 0 || req.query.edadMax < 0)
            throw { status: 400, descripcion: 'las edades provistas no son positivas' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const result = await usuariosDAO.getByAge(req.query.edadMin, req.query.edadMax)
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}*/

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
        const userCreado = await usuariosDAO.add(nuevo)
        res.status(201).json(userCreado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.delete('/:email', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (!emailIsValid(req.params.email))
            throw { status: 400, descripcion: 'el email provisto es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        await usuariosDAO.deleteByEmail(req.params.email)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.put('/:email', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (!emailIsValid(req.params.email))
            throw { status: 400, descripcion: 'el email provisto es inválido' }

        const nuevo = req.body

        if (esUsuarioInvalido(nuevo))
            throw { status: 400, descripcion: 'el usuario posee un formato json invalido o faltan datos' }

        if (req.params.email != nuevo.email)
            throw { status: 400, descripcion: 'el email provisto no coincide entre el recurso buscado y el nuevo' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const userActualizado = await usuariosDAO.updateByEmail(req.params.email, nuevo)
        res.json(userActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esUsuarioInvalido(usuario) {
    const schema = {
        nombre: Joi.string().alphanum().min(1).required(),
        apellido: Joi.string().alphanum().min(1).required(),
        zona: Joi.string().alphanum().min(1).required(),
        email: Joi.string().email({ minDomainSegments: 2 }),
        edad: Joi.number().integer().min(0).max(100).required()
    }
    const { error } = Joi.validate(usuario, schema);
    return error
}

function emailIsValid (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

module.exports = router
