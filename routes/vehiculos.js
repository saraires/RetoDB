"use strict"

const { Router }  = require('express');
const { cnn_mysql } = require('../config/conexionDB');
const router = Router();

router.get('/vehiculo', (req, res) => {
    cnn_mysql.query('SELECT * FROM VEHICULOS', (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json(resultset);
        }
    })
});

router.get('/vehiculo/:id', async (req, res) => {
    const id = req.params.id
    const [rows] = await cnn_mysql.promise().query(`SELECT * VEHICULOS WHERE id = ?`, [id])
    if (rows[0]) {
        res.json(rows[0])
    } else {
        res.json({}).sendStatus(404);
    };
});

router.post('/vehiculo', async (req, res) => {
    try {
        const {
            nro_placa,
            id_linea,
            modelo,
            fecha_ven_seguro,
            fecha_ven_tecnomecanica,
            fecha_ven_contratodo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO VEHICULOS(nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo) 
        VALUES (?, ?, ?, ?, ?, ?)`, [nro_placa, id_linea, modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo]);

        if (rows.affectedRows > 0) {
            res.json({
                nro_placa,
                id_linea,
                modelo,
                fecha_ven_seguro,
                fecha_ven_tecnomecanica,
                fecha_ven_contratodo
            })
        } else {
            res.json({})
        }
    } catch (e) {
        res.status(500).json({errorCode : e.errno, message: "Error en el servidor"});
    }
});

module.exports = router;