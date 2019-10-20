const usuariosDAO_Arr = require('./daoUsuariosArray')
const usuariosDAO_DB = require('./daoUsuariosDB')
const usuariosDAO_FB = require('./daoUsuariosFirebase')
const publicacionesDAO_Arr = require('./daoPublicacionesArray')
const imagenesDAO_Arr = require('./daoImagenesArray')
const publicacionesDAO_DB = require('./daoPublicacionesDB')
const publicacionesDAO_FB = require('./daoPublicacionesFirebase')
const { mode } = require('../config')



function getUsuariosDAO(){
    switch (mode) {
        case 'online': return usuariosDAO_DB
        case 'offline': return usuariosDAO_Arr
        case 'firebase': return usuariosDAO_FB
        default: throw "invalid mode. check system config!"
    }
}

function getPublicacionesDAO(){
    switch (mode) {
        case 'online': return publicacionesDAO_DB
        case 'offline': return publicacionesDAO_Arr
        case 'firebase': return publicacionesDAO_FB
        default: throw "invalid mode. check system config!"
    }
}



function getImagenesDAO(){
    switch ('offline') {
        case 'offline': return imagenesDAO_Arr
        case 'firebase': return imagenesDAO_FB
        default: throw "invalid mode. check system config!"
    }
}

module.exports = {
    getUsuariosDAO,
    getPublicacionesDAO,
    getImagenesDAO
}