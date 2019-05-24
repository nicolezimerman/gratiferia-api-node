const usuariosDAO_Arr = require('./daoUsuariosArray')
const usuariosDAO_DB = require('./daoUsuariosDB')
const publicacionesDAO_Arr = require('./daoPublicacionesArray')
const publicacionesDAO_DB = require('./daoPublicacionesDB')
const { mode } = require('../config')

function getUsuariosDAO(){
    switch (mode) {
        case 'online': return usuariosDAO_DB
        case 'offline': return usuariosDAO_Arr
        default: throw "invalid mode. check system config!"
    }
}

function getPublicacionesDAO(){
    switch (mode) {
        case 'online': return publicacionesDAO_DB
        case 'offline': return publicacionesDAO_Arr
        default: throw "invalid mode. check system config!"
    }
}

module.exports = {
    getUsuariosDAO,
    getPublicacionesDAO
}