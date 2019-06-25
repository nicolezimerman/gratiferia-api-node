const publicaciones = [
    {
        id: 1,
        title: 'Sillon 2 plazas',
        description: 'Sillon ecocuero de dos plazas con apoya pie',
        category: 'Muebles',
        zone: 'Villa crespo',
        keyword: 'Sillon',
        state: 'available',
        owner: '1',
        reservedby: '',
        image: 'http://localhost:8081/api/imagenes/1'
    },
    {
        id: 2,
        title: 'Mesa madera',
        description: 'mesa',
        category: 'Muebles',
        zone: 'Almagro',
        keyword: 'Muebles',
        state: 'finished',
        owner: '1',
        reservedby: '2',
        image:'http://localhost:8081/api/imagenes/2'
    },
    {
        id: 3,
        title: 'Mesa maderafdsfsd',
        description: 'mesa',
        category: 'Mesas',
        zone: 'Almagro',
        keyword: 'Muebles',
        state: 'finished',
        owner: '3',
        reservedby: '1',
        image: 'http://localhost:8081/api/imagenes/3'
    },
    {
        id: 4,
        title: 'Mesa vidrio',
        description: 'mesa',
        category: 'Mesas',
        zone: 'Almagro',
        keyword: 'Mesa',
        state: 'available',
        owner: '1',
        reservedby: '',
        image: 'http://localhost:8081/api/imagenes/4'
    }
]

async function getAll() {
    return publicaciones
}

async function getById(id) {
    const publicacionBuscada = publicaciones.find(e => e.id == id)
    return publicacionBuscada
}

async function add(publicacionNueva) {
    const publicacionBuscada = await getById(publicacionNueva.id)
    if (publicacionBuscada)
        throw { status: 400, descripcion: 'ya existe una publicacion con ese id' }

    const publicacion = publicaciones[publicaciones.length-1]

    const id = publicacion.id

    publicacionNueva.id = id+1

    publicaciones.push(publicacionNueva)
    return publicacionNueva
}

async function deleteById(id) {
    const posBuscada = publicaciones.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'publicacion no encontrada' }

    publicaciones.splice(posBuscada, 1)
}

async function updateById(id, nuevaPublicacion) {
    const posBuscada = publicaciones.findIndex(e => e.id == id)
    if (posBuscada == -1)
        throw { status: 404, description: 'publicacion no encontrada' }

    publicaciones.splice(posBuscada, 1, nuevaPublicacion)
    return nuevaPublicacion
}

async function searchWithParameters(parametros){
    console.log(parametros)
   
    const publicacionesBuscadas = []

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
}

/* NO SE USAN MAS
async function getByCategory(category,resultadoParcial) {
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = publicaciones
    }

    const publicacionesBuscadas = []
    for (const pub of publicacionesParcial){
        if(pub.category == category){
            publicacionesBuscadas.push(pub)
        }
    }
    return publicacionesBuscadas
}

async function getByKeyword(keyword,resultadoParcial) {
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = publicaciones
    }

    const publicacionesBuscadas = []

    for (const pub of publicacionesParcial) {
        for (const key of pub.keyword) {
            if(key == keyword){
                publicacionesBuscadas.push(pub)
                continue
            }
        }
    }
    return publicacionesBuscadas
}

async function getByZone(zone,resultadoParcial) {
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = publicaciones
    }

    const publicacionesBuscadas = []

    for (const pub of publicacionesParcial){
        if(pub.zone == zone){
            publicacionesBuscadas.push(pub)
        }
    }
    return publicacionesBuscadas
}
*/
async function getPaginado (resultadoParcial,offset,limit){
    if(resultadoParcial != undefined){
        publicacionesParcial = resultadoParcial
    }else{
        publicacionesParcial = publicaciones
    }
    
    if(offset == undefined || offset < 0){
        offset = 0
    }

    const publicacionesBuscadas = []
    // const desde = ((page - 1)*cantPorPagina)

    for (let index = offset; index < limit; index++) {
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
    getPaginado,
    searchWithParameters
}
