"use strict"

const express = require('express');
const morgan = require('morgan');
const app = express();
require('dotenv').config();

const tipo_linea = require ('./routes/tipo_linea.js');
const tipo_marca = require ('./routes/tipo_marca.js');
const vehiculos = require ('./routes/vehiculos.js');
// const registros = require ('./routes/totalregistros.js');


// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Rutas
app.use('/api/', vehiculos);
app.use('/api/', tipo_marca);
app.use('/api/', tipo_linea);
// app.use('/api/', registros);


// Configuración de metodos
app.get('/', (req, res) => {
    res.send("<h2>Bienvenidos a la base de datos de Semilleros.SAS</h2>")
});

app.set('port', process.env.PORT || 4000);

// Se levanta el servidor
app.listen(app.get('port'), () => {
    console.log(`Aplicación corriendo en el puerto ${app.get('port')}`)
});