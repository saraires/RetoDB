"use strict"

const { Router }  = require('express');
const { cnn_mysql } = require('../config/conexionDB');
const router = Router();

router.get('/vehiculo', (req, res) => {
    cnn_mysql.query('SELECT * FROM `vehiculos`', (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json(resultset);
        }
    })
});

router.post('/vehiculo', async (req, res) => {
    try {
        const {
            nro_placa,
            id_linea,
            id_modelo,
            fecha_ven_seguro,
            fecha_ven_tecnomecanica,
            fecha_ven_contratodo
        } = req.body
        const [rows, fields] = await cnn_mysql.promise().execute(`INSERT INTO vehiculos(nro_placa, id_linea, id_modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo) 
        VALUES (?, ?, ?, ?, ?, ?);`, [nro_placa, id_linea, id_modelo, fecha_ven_seguro, fecha_ven_tecnomecanica, fecha_ven_contratodo]);

        if (rows.affectedRows > 0) {
            res.json({
                nro_placa: nro_placa,
                id_linea: id_linea,
                id_modelo: id_modelo,
                fecha_ven_seguro: fecha_ven_seguro,
                fecha_ven_tecnomecanica: fecha_ven_tecnomecanica,
                fecha_ven_contratodo: fecha_ven_contratodo
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