const express = require('express'); // Importamos la librería express
const cors = require('cors'); // Importamos la librería cors
const looger = require('morgan'); // Importamos la librería morgan
const db = require('../db/connection'); // Importamos la conexión a la base de datos
const Role = require('./role'); // Importamos el modelo Role
const User = require('./user'); // Importamos el modelo User

class Server{
    
    constructor(){
        this.app = express(); // Creando la aplicación express
        this.port = process.env.PORT; // Puerto que se asigna en el archivo .env
        this.server = require('http').createServer(this.app); // Creando el servidor
        
        //paths
        this.paths = {
            auth: '/api/auth',
            user: '/api/user',
        }

        //Connect to database
        this.dbConnection();


        //Middlewares
        this.middlewares();

        //Routes Applications 
        this.routes();

    }

    async dbConnection(){
        try {
            await db.authenticate();
            await Role.sync({force: false});
            await User.sync({force: false});
            console.log('DATABASE CONNECTED');
        } catch (error) {
            console.log(error);
        }
    }

    middlewares(){


        //Morgan
        this.app.use(looger('dev'));

        this.app.use(express.json());

        //cors
        this.app.use(cors()); 

    }

    routes(){
        this.app.use(this.paths.auth, require('../routes/authRoutes'));

    }

    listen(){
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server; 

