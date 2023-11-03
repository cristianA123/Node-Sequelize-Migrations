
const express = require('express')
var cors = require('cors');
const fileUpload = require('express-fileupload');
const db = require('./database/connection.js');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {

            auth:"/api/auth",
            usuario:"/api/user" ,
            categorias : "/api/categorias", 
            productos : "/api/productos", 
            buscar : "/api/buscar", 
            uploads : "/api/uploads", 
            roles : "/api/roles", 
        }

        //Conectar a la base de datos:
        this.conectarBD();
        
        // Middlewares
        this.middlewares();


        // Rutas de mi aplicacion
        this.route();
    }

    async conectarBD(){
        try {
            await db.authenticate();
            console.log('DB online');
            
        } catch (error) {
            // throw new Error('No se pudo conectar a la bd == ', error.message)
            console.log(error.message);
            return {
                code: 400,
                errors: "could not connect to db"
            }
        }

    }

    middlewares(){

        //cors
        this.app.use( cors() )

        //Lectura y parseo del body
        this.app.use(  express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

        //Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    route(){
        this.app.use( this.paths.auth, require('./routes/auth.js') );
        this.app.use( this.paths.usuario, require('./routes/usuarios.js') );
        this.app.use( this.paths.uploads, require('./routes/uploads.js') );
    }

    listen(){
        this.app.listen( this.port , ()=>{
            console.log("Corriendo en el puerto", this.port )
        })
    }


}



module.exports = Server;