const request = require('request-promise-native');
const fs = require('fs');

async function testPostPhoto(serverUrl) {

    //const photo = fs.readFile('C:/Users/Julieta/Desktop/ORT/1erCuat2019/Taller2/ApiTaller/apitp2/src/public/images/original/IMG_20170214_140049.jpg', function(err, data) {
        const photo = fs.readFile('IMG_20170214_140049.jpg', function(err, data) {
        if (err) throw err; // Fail if the file can't be read.
        
        console.log('img leida');
      });

     const publicacion = {
             photo: photo
     }

     let testResult = true

     const options = {
         method: 'POST',
         uri: `${serverUrl}/publicaciones/uploadphoto`,
         body: publicacion,
         json: true
     }

     try {
         const result = await request(options)

         if (!result) {
             console.log("post: mensaje vacío (sin publicacion)")
         }
     } catch (err) {
         console.log(err.error)
         testResult = false
     }
     if (testResult) {
         console.log("post: ok")
     }
}

module.exports = testPostPhoto