const express = require('express'); // Importamos la librería express
const cors = require('cors'); // Importamos la librería cors
const looger = require('morgan'); // Importamos la librería morgan

class Server{
    
    constructor(){
        this.app = express(); // Creando la aplicación express
        this.port = process.env.PORT; // Puerto que se asigna en el archivo .env
        this.server = require('http').createServer(this.app); // Creando el servidor
        
        //paths
        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
        }

        //Connect to database
        //this.dbConnection();

        //Middlewares
        this.middlewares();

        //Routes Applications 
        this.routes();

    }

    async dbConnection(){
        //await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors()); 

        //Morgan
        this.app.use(looger('dev'));

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

