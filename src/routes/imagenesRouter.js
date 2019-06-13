const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/daoFactory')
//MULTER
var multer = require('multer')
var path = require('path')

// const usuariosDAO = require('../data/usuariosDAO_Arr')
// const usuariosDAO = require('../data/usuariosDAO_DB')

const router = express.Router()

const baseURI = '/api/imagenes'

//MULTER - Set storage
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/images/uploads')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
    }
});
var upload = multer({storage: storage});

//POST upload
router.post('/', upload.single('photo'), (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)
    console.log(req.file)
    res.json(result)
})


//GET 
router.get('/', async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)

    if (_.isEmpty(req.query)) {
        _handleGetAll(req, res)
    } else {
        _handleGetWithQS(req, res)
    }
})

//GET ALL
async function _handleGetAll(req, res) {
    try {
        const imagenesDAO = daoFactory.getImagenesDAO()
        const result = await imagenesDAO.getAll()
        res.json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
}
//GET con paginado
async function _handleGetWithQS(req, res) {
    var page = req.query.page
    const cantPorPagina = 5
    var resultadoParcial = undefined

    if(page != undefined){
        console.log("paginado")
        try{
            const imagenesDAO = daoFactory.getImagenesDAO()
            resultadoParcial = await imagenesDAO.getPaginado(resultadoParcial,cantPorPagina,parseInt(page))

            if(!resultadoParcial)
                throw { status: 404, descripcion: 'imagenes no encontradas para esa página' }
        
            res.json(resultadoParcial)
        } catch (err){
            res.status(err.status).json(err)
        }
    }else{
        res.status(400).json("no existe ninguna funcion para el parametro indicado")
    }
}

//GET ONE IMAGE FILE
router.get('/:id', async (req,res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)
    
    try {
        const imagenesDAO = daoFactory.getImagenesDAO()
        const resultado = await imagenesDAO.getById(req.params.id)

        if(!resultado){
            throw { status: 404, descripcion: 'imagen no encontrada' }
        }

        res.sendFile(path.resolve('./src/public/images/original' + resultado.path)) 
    } catch(err){
        res.status(400).json(err)
    }
})
//FALTA
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

//FALTA
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
//FALTA
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

//como validar?
/*
function esImagenInvalida(imagen) {
    const schema = {
        id: Joi.number().integer().min(1).required(),
        path: Joi.string().alphanum().min(1).required(),
        self: Joi.string().alphanum().min(1).required(),
    }
    const { error } = Joi.validate(usuario, schema);
    return error
}
*/
module.exports = router
