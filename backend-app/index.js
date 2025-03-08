// Invocación de librerias express
const express = require('express');
// Invocación de la libreria mongoose para conexión de BD de Mongodb
const mongoose = require('mongoose');
//Importar las ruta de la collección Ventas
const movieRoute = require('./routes/movie.route')

//Inicializamos aplicación
const app = express();
//Incorporando parse de JSON
app.use(express.json());
//Determinación de puerto
/*
C CREATE --> POST
R READ --> GET
U UPDATE --> PUT
D DELETE --> DELETE 
*/

//Endpoint por defecto
app.get('/', (req, res) => {
    res.send('Bienvenido a mi servidor de API´s');
});

//Endponit de la collecion Ventas
app.use('/api/movie', movieRoute);

//Definir conexión de BD a través de base daros 
//la comunicación es de tipo dato promesa (asincrona)
mongoose.connect('mongodb+srv://utp0159325:Lanzita123@producto1.cu0dp.mongodb.net/Disney')
//mongoose.connect('mongodb://localhost:27017')
    .then(() => {
        console.log('Conectado a la base de datos de manera exitosa');
        app.listen(3000, () => {
            console.log('Servidor respondiendo en el puerto 3000');
        });
    })
    .catch(() => console.log('Ocurrió un problema al conectar la base de datos'))

