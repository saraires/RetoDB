"use strict"

const { Router }  = require('express');
const { cnn_mysql } = require('../config/conexionDB');
const router = Router();

router.get('/tipo_linea', (req, res) => {
    cnn_mysql.query('SELECT * FROM `tipo_linea`', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json(resultset);
        }
    })
});

router.post('/tipo_linea', async (req, res) => {
    try {
        const {
            id_linea,
            desc_linea,
            id_marca,
            activo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_linea(id_linea, desc_linea, id_marca, activo) 
        VALUES (?, ?, ?, ?);`, [id_linea, desc_linea, id_marca, activo]);

        if (rows.affectedRows > 0) {
            res.json({
                id_linea: id_linea,
                desc_linea: desc_linea,
                id_marca: id_marca,
                activo: activo
            })
        } else {
            res.json({})
        }
    } catch (e) {
        console.log(e)
        res.status(500).json({errorCode : e.error, message: "Error en el servidor"});
    }
});

module.exports = router;