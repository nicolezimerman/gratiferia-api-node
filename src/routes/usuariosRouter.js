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

async function _handleGetWithQS(req, res) {
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
}

router.get('/:dni', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.dni))
            throw { status: 400, descripcion: 'el dni provisto no es un número o es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const resultado = await usuariosDAO.getByDni(req.params.dni)

        if (!resultado)
            throw { status: 404, descripcion: 'estudiante no encontrado' }

        res.json(resultado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.post('/', async (req, res) => {
    console.log(`POSTING: ${baseURI}${req.url}`)

    try {
        const nuevo = req.body

        if (esEstudianteInvalido(nuevo))
            throw { status: 400, descripcion: 'el estudiante posee un formato json invalido o faltan datos' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const estuCreado = await usuariosDAO.add(nuevo)
        res.status(201).json(estuCreado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.delete('/:dni', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.dni))
            throw { status: 400, descripcion: 'el dni provisto no es un número o es inválido' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        await usuariosDAO.deleteByDni(req.params.dni)
        res.status(204).send()
    } catch (err) {
        res.status(err.status).json(err)
    }
})

router.put('/:dni', async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (isNaN(req.params.dni))
            throw { status: 400, descripcion: 'el dni provisto no es un número o es inválido' }

        const nuevo = req.body

        if (esEstudianteInvalido(nuevo))
            throw { status: 400, descripcion: 'el estudiante posee un formato json invalido o faltan datos' }

        if (req.params.dni != nuevo.dni)
            throw { status: 400, descripcion: 'el dni provisto no coincide entre el recurso buscado y el nuevo' }

        const usuariosDAO = daoFactory.getUsuariosDAO()
        const estuActualizado = await usuariosDAO.updateByDni(req.params.dni, nuevo)
        res.json(estuActualizado)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

function esEstudianteInvalido(estudiante) {
    const schema = {
        nombre: Joi.string().alphanum().min(1).required(),
        apellido: Joi.string().alphanum().min(1).required(),
        edad: Joi.number().integer().min(0).max(120).required(),
        dni: Joi.number().integer().min(1).max(99999999).required()
    }
    const { error } = Joi.validate(estudiante, schema);
    return error
}

module.exports = router
