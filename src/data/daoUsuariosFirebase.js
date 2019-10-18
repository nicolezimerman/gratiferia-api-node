var firebase = require("firebase");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyBwaNREcBvs97jykTJ4TdIfGnWOPoHhCoc",
    authDomain: "gratiferia-app.firebaseapp.com",
    databaseURL: "https://gratiferia-app.firebaseio.com",
    projectId: "gratiferia-app",
    storageBucket: "gratiferia-app.appspot.com",
    messagingSenderId: "364543198736",
    appId: "1:364543198736:web:eb6ee3874fb06dbc39ac95",
    measurementId: "G-2JJXNSKTD4"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var user = {"name":"Facu","lastname":"cervin","id":1,"email":"f@f.com","age":25,"password":"123456", "zone":"almagro"}

  var ref = firebase.database().ref('usuarios')




async function getAll() {
    try {
        const selectAllQuery = `SELECT * from users;`
        const result = await knex.raw(selectAllQuery)
        // const result = await knex.select('*').from('estudiantes')
        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function getByEmail(email) {
    try {
        // const selectById = `SELECT * FROM publications WHERE id= ${id};`
        // const result = await knex.raw(selectById)
        var result = ref.orderByChild('email').equalTo(email).once('value', (data) => {

          return data.exists()

        })

        return result

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getById(id) {
    try {
        // const selectById = `SELECT * FROM publications WHERE id= ${id};`
        // const result = await knex.raw(selectById)
       // var result = firebase.database().ref('usuarios').orderByKey(id);

        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function add(usuarioNuevo) {
    try{

        var nuevoUsuario = ref.push();
        nuevoUsuario.set({

            name: usuarioNuevo.name,
            lastname: usuarioNuevo.lastname,
            age: usuarioNuevo.age,
            email: usuarioNuevo.email,
            zone: usuarioNuevo.zone,
            password: usuarioNuevo.password})
        
         return usuarioNuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function deleteById(id) {
    const usuarioBuscado = await getById(id)    
    
    if (usuarioBuscado == undefined || usuarioBuscado.length == 0)
        throw { status: 404, description: 'usuario no encontrado' }
    
    try {
        const deleteByIdQuery = `DELETE FROM users WHERE id=${id}`
        await knex.raw(deleteByIdQuery)
        return
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function updateById(id, usuarioNuevo) {
    const usuarioBuscado = await getById(id)    
    
    if (usuarioBuscado == undefined || usuarioBuscado.length == 0)
        throw { status: 404, description: 'usuario no encontrado' }

    try {
        await knex('users').where('id','=',id).update(
        { name: usuarioNuevo.name, 
            lastname: usuarioNuevo.lastname,
            zone: usuarioNuevo.zone,
            email: usuarioNuevo.email,
            age: usuarioNuevo.age,
            password: usuarioNuevo.password
         })

        return usuarioNuevo
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

// //OK
// async function searchWithParameters(parametros){

//     try {
//         const publicacionesBuscadas = await knex.select('*').from('publications').where(parametros)
//         return publicacionesBuscadas
//     } catch (err) {
//         throw { status: 500, descripcion: err.message }
//     }    
// }

//OK 
async function getPaginado (offset,limit){
    
    let offsetInt;

    if (offset != undefined) {
        offsetInt= parseInt(offset)
    }

    if(offsetInt< 0){
        offsetInt = 0
    }


    const usuarios = getAll()

    const usuariosBuscados = []
    // const desde = ((page - 1)*cantPorPagina)

    for (let index = offsetInt; index < limit; index++) {
        if(usuarios[index] != null){
            usuariosBuscados.push(usuarios[index])
        }
    }
    return usuariosBuscados
}


module.exports = {
    getAll,
    getByEmail,
    add, 
    deleteById, 
    updateById,
    // searchWithParameters,
    getPaginado,
    getById
}
