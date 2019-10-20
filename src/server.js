const express = require('express')
const { port } = require('./config')
var admin = require("firebase-admin");
require('firebase/firebase-storage')

var serviceAccount = require("../sdk-firebase.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gratiferia-app.firebaseio.com"
});
exports.admin = admin

const usuariosRouter = require('./routes/usuariosRouter')
const publicacionesRouter = require('./routes/publicacionesRouter')
const imagenesRouter = require('./routes/imagenesRouter')


const app = express()

app.use(express.json())

app.set('json spaces', 4)

app.use('/api/usuarios', usuariosRouter)
app.use('/api/publicaciones', publicacionesRouter)
app.use('/api/imagenes', imagenesRouter)


app.listen(port, () => {

    console.log(`servidor inicializado en puerto ${port}`)
})


