const express = require('express')
//const { port } = require('./config')
const port = 8080
const usuariosRouter = require('./routes/usuariosRouter')
const publicacionesRouter = require('./routes/publicacionesRouter')

const app = express()

app.use(express.json())

app.set('json spaces', 4)

app.use('/api/usuarios', usuariosRouter)
app.use('/api/publicaciones', publicacionesRouter)

app.listen(port, () => {
    console.log(`servidor inicializado en puerto ${port}`)
})
