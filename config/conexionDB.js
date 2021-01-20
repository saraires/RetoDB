"use strict"

//En este doc se hace la conexión a la base de datos

const mysql = require("mysql2");
require('dotenv').config(); // Dotenv: Permite leer los archivos con variables de entorno .env

const conexion_mysql = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

module.exports = {
    cnn_mysql: conexion_mysql
}