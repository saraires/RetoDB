"use strict"

const { Router }  = require('express');
const { cnn_mysql } = require('../config/conexionDB');
const router = Router();

router.get('/tipo_marca', (req, res) => {
    cnn_mysql.query('SELECT * FROM `tipo_marca`', (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json(resultset);
        }
    })
});

router.post('/tipo_marca', async (req, res) => {
    try {
        const {
            id_marca,
            desc_marca,
            activo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO tipo_marca(id_marca, desc_marca, activo) 
        VALUES (?, ?, ?);`, [id_marca, desc_marca, activo]);

        if (rows.affectedRows > 0) {
            res.json({
                id_marca: id_marca,
                desc_marca: desc_marca,
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