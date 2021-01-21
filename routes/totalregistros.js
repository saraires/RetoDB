"use strict"

const { Router } = require('express');
const { cnn_mysql } = require('../config/conexionDB');
const router = Router();

// router.get('/totalregistros', (req, res) => {
//     const regVehiculo = cnn_mysql.query(`SELECT COUNT(nro_placa) FROM vehiculos`);
//     const regLinea = cnn_mysql.query(`SELECT COUNT(id_linea) FROM tipo_linea`);
//     const regMarca = cnn_mysql.query(`SELECT COUNT(id_marca) FROM tipo_marca`);

//     if(regVehiculo[2] == 30 &&  regLinea[2] == 20 && regMarca[2] == 5){
//         res.status(200);
//         return res.json({Ok: "Las tablas tiene la cantidad de registros correcta"});
//     } else {
//         res.status(500);
//         return res.json({Error: "Las tablas no tienen la cantidad de registros solicitados"});
//     };
// });

// Total de registros

router.get('/regVehiculos', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(nro_placa) FROM vehiculos;`, (error, resultset, fields) => {
        if (resultset[0]["COUNT(nro_placa)"] !== 30) {
            return res.json({ Error: "La tabla no tiene la cantidad de registros solicitados" });
        } else {
            return res.json({ Ok: "La tabla tiene la cantidad de registros correcta" });
        }
    }
    );
});

router.get('/regLinea', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(id_linea) FROM tipo_linea;`, (error, resultset, fields) => {
        if (resultset[0]["COUNT(id_linea)"] !== 20) {
            return res.json({ Error: "La tabla no tiene la cantidad de registros solicitados" });
        } else {
            return res.json({ Ok: "La tabla tiene la cantidad de registros correcta" });
        }
    }
    );
});

router.get('/regMarca', (req, res) => {
    cnn_mysql.query(`SELECT COUNT(id_marca) FROM tipo_marca;`, (error, resultset, fields) => {
        if (resultset[0]["COUNT(id_marca)"] !== 5) {
            return res.json({ Error: "La tabla no tiene la cantidad de registros solicitados" });
        } else {
            return res.json({ Ok: "La tabla tiene la cantidad de registros correcta" });
        }
    }
    );
});

// Max y min



router.get('/modeloMax-Min', (req, res) => {
    cnn_mysql.query(`SELECT MIN(id_modelo), MAX(id_modelo) FROM vehiculos;`, (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json({
                Max: `El modelo de auto mas cercano a la fecha actual es del ${resultset[0]["MAX(id_modelo)"]}`,
                Min: `El modelo de auto mas alejado a la fecha actual es del ${resultset[0]["MIN(id_modelo)"]}`
            });
        }
    });
});

//Numero de marcas


router.get('/cantidadMarcas', (req, res) => {
    cnn_mysql.query(`SELECT tipo_linea.desc_linea, tipo_marca.desc_marca, COUNT(*) FROM tipo_linea INNER JOIN tipo_marca 
    ON tipo_linea.id_marca = tipo_marca.id_marca GROUP BY desc_marca;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            return res.json({
                Cantidad: `Hay ${resultset[0]["COUNT(*)"]} carros de marca ${resultset[0]["desc_marca"]}, Hay ${resultset[1]["COUNT(*)"]} carros de marca ${resultset[1]["desc_marca"]}, Hay ${resultset[2]["COUNT(*)"]} carros de marca ${resultset[2]["desc_marca"]}, Hay ${resultset[3]["COUNT(*)"]} carros de marca ${resultset[3]["desc_marca"]}, Hay ${resultset[4]["COUNT(*)"]} carros de marca ${resultset[4]["desc_marca"]}`
            });
        }
    });
});

// Rango fechas


router.get('/rangoFechas', (req, res) => {
    cnn_mysql.query(`SELECT * FROM vehiculos WHERE fecha_ven_contratodo BETWEEN "2021/01/01" and "2021/12/01";`,
    (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.send({
                resultset
            });
        }
    });
});

router.get('/rangoModelo', (req, res) => {
    cnn_mysql.query(`SELECT * FROM vehiculos WHERE id_modelo BETWEEN "1970" and "2000";`,
    (error, resultset, fields) => {
        if (error) {
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.json({
                resultset
            });
        }
    });
});

router.get('/update', (req, res) => {
    cnn_mysql.query(`UPDATE tipo_marca set desc_marca = "Mustang" WHERE id_marca = 4;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.send(`Se actualizo con exito la base de datos`)
        }
    });
});

router.get('/insertarRegistro', (req, res) => {
    cnn_mysql.query(`ALTER TABLE tipo_marca ADD estrellasSeguridad int(5) IN;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.send(`Se inserto con exito el nuevo registro, ya puede empezar a llenarlo con datos`)
        }
    });
});

router.get('/consultaUnica', (req, res) => {
    cnn_mysql.query(`SELECT nro_placa, id_modelo, desc_linea, desc_marca from vehiculos INNER JOIN tipo_marca INNER JOIN tipo_linea;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.send(resultset)
        }
    });
});

router.get('/consultaUnicaActivo', (req, res) => {
    cnn_mysql.query(`SELECT nro_placa, id_modelo, desc_linea, desc_marca from vehiculos INNER JOIN tipo_marca INNER JOIN tipo_linea WHERE tipo_linea.activo = 'S';`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            return res.send(resultset)
        }
    });
});

router.get('/sumar', (req, res) => {
    cnn_mysql.query(`SELECT SUM(id_modelo) FROM vehiculos;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                suma: `La suma de todos los modelos es igual a: ${resultset[0]["SUM(id_modelo)"]}`
        });
        }
    });
});

router.get('/promedio', (req, res) => {
    cnn_mysql.query(`SELECT AVG(id_modelo) FROM vehiculos;`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                Promedio: `El promedio de la suma de todos los modelos es igual a: ${resultset[0]["AVG(id_modelo)"]}`
        });
        }
    });
});

router.get('/act-inac', (req, res) => {
    cnn_mysql.query(`SELECT tipo_linea.activo, COUNT(*) from tipo_linea where tipo_linea.activo = 'S' UNION ALL
    SELECT tipo_linea.activo, COUNT(*) from tipo_linea where tipo_linea.activo = 'N'`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                Activo: `Los autos activos son iguales a: ${resultset[0]["COUNT(*)"]}`,
                Inactivo: `Los autos inactivos son iguales a: ${resultset[1]["COUNT(*)"]}`
        });
        }
    });
});

router.get('/inner', (req, res) => {
    cnn_mysql.query(`SELECT nro_placa, id_modelo, desc_marca, desc_linea FROM vehiculos INNER JOIN tipo_marca INNER JOIN tipo_linea`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                resultset
        });
        }
    });
});

router.get('/left', (req, res) => {
    cnn_mysql.query(`SELECT nro_placa, id_modelo, desc_linea, desc_marca FROM vehiculos LEFT JOIN tipo_linea ON vehiculos.id_linea = tipo_linea.id_linea 
    LEFT JOIN tipo_marca ON tipo_linea.id_marca = tipo_marca.id_marca`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                resultset
        });
        }
    });
});

router.get('/ultimopuntoVehiculo', (req, res) => {
    cnn_mysql.query(`SELECT * FROM vehiculos`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                resultset    
            });
        }
    });
});

router.get('/ultimopuntoTipo_linea', (req, res) => {
    cnn_mysql.query(`SELECT * FROM tipo_linea`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                resultset
        });
        }
    });
});

router.get('/ultimopuntoTipo_marca', (req, res) => {
    cnn_mysql.query(`SELECT * FROM tipo_marca`,
    (error, resultset, fields) => {
        if (error) {
            console.log(error)
            return res.status(500).send("Error: No se pudieron obtener los datos requeridos");
        } else {
            console.log(resultset);
            res.json({
                resultset
        });
        }
    });
});


module.exports = router;