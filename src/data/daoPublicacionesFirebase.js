var cloudinary = require('cloudinary');
cloudinary.config({ 
    cloud_name: 'facuchap', 
    api_key: '737132188284967', 
    api_secret: '8NNLon_pPJKDEgbUYagvhb4EGNE' 
  });

 var querybase = require('querybase')
var admin = require('../server').admin
var ref = admin.database().ref('publicaciones')




//OK
async function getAll() {
    try {

        var result = []

        await ref.once('value', (data) => {
            
            data.forEach(function(childSnapshot) {
                
                result.push({id: childSnapshot.key, ...childSnapshot.val()});
              
              });
        })

        return result
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function getById(id) {
    try {

        var result

        await admin.database().ref('publicaciones/' + id)
        .once('value', (data) => {
                result = {id: id, ...data.val()};
        })

        return result

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function add(publicacionNueva) {
    try{

        var nuevaPublicacion = publicacionNueva

                var refPub = ref.push();
                await refPub.set({
        
                   title: nuevaPublicacion.title, 
                   description: nuevaPublicacion.description,
                   category: nuevaPublicacion.category,
                   zone: nuevaPublicacion.zone,
                   zonelat: nuevaPublicacion.zonelat,
                   zonelong: nuevaPublicacion.zonelong,
                   keyword: nuevaPublicacion.keyword,
                   state: nuevaPublicacion.state,
                   owner: nuevaPublicacion.owner,
                   reservedby: nuevaPublicacion.reservedby,
                   image: nuevaPublicacion.image
                   })
            

        return nuevaPublicacion

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function deleteById(id) {
   
    try {

       await admin.database().ref('publicaciones/' + id).remove()

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function updateById(id, publicacionNueva) {
    const publicacionBuscada = await getById(id)    
    
    if (publicacionBuscada == undefined || publicacionBuscada.length == 0)
        throw { status: 404, description: 'Publicacion no encontrada' }

    try {

        delete publicacionNueva.id;
        admin.database().ref('publicaciones/' + id).update(publicacionNueva)

        return publicacionNueva
    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }
}

//OK
async function searchWithParameters(parametros){

    try {

        var publicaciones = await getAll()
        var publicacionesBuscadas = [] 
        function match(item, filter) {
            var keys = Object.keys(filter);
            // true if any true
            return keys.every(function (key) {
              return item[key] == filter[key];
            });
        }
    
        publicaciones.forEach(function(obj) {
            if(match(obj, parametros)){
                publicacionesBuscadas.push(obj)
            }      
        })
    
        return publicacionesBuscadas

    } catch (err) {
        throw { status: 500, descripcion: err.message }
    }    
}

//OK 
async function getPaginado (resultadoParcial,offset,limit){
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = getAll()
    }

    let offsetInt;

    if (offset != undefined) {
        offsetInt= parseInt(offset)
    }

    if(offsetInt< 0){
        offsetInt = 0
    }

    const publicacionesBuscadas = []
    // const desde = ((page - 1)*cantPorPagina)

    for (let index = offsetInt; index < limit; index++) {
        if(publicacionesParcial[index] != null){
            publicacionesBuscadas.push(publicacionesParcial[index])
        }
    }
    return publicacionesBuscadas
}


module.exports = {
    getAll,
    getById,
    add, 
    deleteById, 
    updateById,
    searchWithParameters,
    getPaginado,
}
