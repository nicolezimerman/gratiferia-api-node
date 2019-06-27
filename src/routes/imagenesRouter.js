const express = require('express')
const _ = require('lodash')
const Joi = require('@hapi/joi')
const daoFactory = require('../data/daoFactory')
//MULTER
var multer = require('multer')
var path = require('path')

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

//GET con query params
async function _handleGetWithQS(req, res) {
        res.status(400).json("no existe ninguna funcion para el parametro indicado")
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

        res.sendFile(path.resolve(resultado.path)) 
    } catch(err){
        res.status(400).json(err)
    }
})

//POST upload
router.post('/', upload.single('photo'), async (req, res) => {
    console.log(`GETTING: ${baseURI}${req.url}`)
    //console.log(req)
    try {   
        const archivo = req.file
        
        const imagenesDAO = daoFactory.getImagenesDAO()
        const imagenCreada = await imagenesDAO.add(archivo)
        
        res.status(201).json(imagenCreada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

//OK
router.delete('/:id', async (req, res) => {
    console.log(`DELETING: ${baseURI}${req.url}`)

    try {

        const imagenesDAO = daoFactory.getImagenesDAO()
        const result = await imagenesDAO.deleteById(req.params.id)
        res.status(201).json(result)
    } catch (err) {
        res.status(err.status).json(err)
    }
})
//FALTA PROBAR
router.put('/:id', upload.single('photo'), async (req, res) => {
    console.log(`REPLACING: ${baseURI}${req.url}`)

    try {
        if (req.file == undefined)
             throw { status: 400, descripcion: 'la imagen esta vacia o tiene un formato incorrecto' }

        const archivo = req.file

        const imagenesDAO = daoFactory.getImagenesDAO()
        const imagenActualizada = await imagenesDAO.updateById(req.params.id, archivo)

        res.status(201).json(imagenActualizada)
    } catch (err) {
        res.status(err.status).json(err)
    }
})

module.exports = router
