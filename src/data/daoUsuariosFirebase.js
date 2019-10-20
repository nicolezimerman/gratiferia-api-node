var admin = require('../server').admin
var ref = admin.database().ref('usuarios')


async function getAll() {

        //NO IMPLEMENTA
}

//OK
async function getByEmail(email) {
    try {

        var result
        
        await ref.orderByChild('email').equalTo(email).once('value', (data) => {
            
            data.forEach(function(childSnapshot) {
                
                result = {id: childSnapshot.key, ...childSnapshot.val()};
              
              });
        })

        return result

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

async function getById(id) {

    try {

        var result

        await admin.database().ref('usuarios/' + id).once('value', (data) => {
            
            result = data.val();
        })

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

        //  NO IMPLEMENTA

}

//OK
async function updateById(id, usuarioNuevo) {

    const usuarioBuscado = await getById(id)
    
    if (usuarioBuscado == undefined || usuarioBuscado.length == 0)
        throw { status: 404, description: 'usuario no encontrado' }

    try {
        delete usuarioNuevo.id;
        admin.database().ref('usuarios/' + id).update(usuarioNuevo)

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

        // NO IMPLEMENTA
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
