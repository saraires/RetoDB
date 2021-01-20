-- Base de datos semilleros.sql
-- mysql -u sarai < MySQl\Semilleros.sql; 
USE Semilleros

DROP TABLE IF EXISTS vehiculos;
DROP TABLE IF EXISTS modelo;
DROP TABLE IF EXISTS tipo_linea;
DROP TABLE IF EXISTS tipo_marca;

CREATE TABLE modelo (
    id_modelo INT(5) PRIMARY KEY AUTO_INCREMENT,
    anios YEAR NOT NULL,
    marca VARCHAR(255) NOT NULL,
    carroceria VARCHAR(255) -- descapotable, monovolumen, dos volumenes, tres volumenes, familiar
);

CREATE TABLE tipo_marca (
    -- Campos NULL
    id_marca INT(5) PRIMARY KEY AUTO_INCREMENT,
    desc_marca VARCHAR(255),
    activo ENUM ('S', 'N') NOT NULL -- null
);

CREATE TABLE tipo_linea (
    -- Campos NULL
    id_linea INT(5) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    desc_linea VARCHAR(255),
    id_marca INT(5), 
    activo ENUM ('S', 'N'),
    FOREIGN KEY (id_marca) REFERENCES tipo_marca(id_marca)
);

CREATE TABLE vehiculos (
    -- Campos NULL
    /*El campo "MODELO" puede ser Null ya que de tener la placa y el Id_Linea se puede
    prescindir del modelo, los dos anteriores pueden actuar como identificadores
    
    El campo de "FECHA_VEN_CONTRATODO" puede ser null ya que no es obligatorio contar con un seguro contra
    todo riesgo, se debe contar con el basico (SOAT) pero este es mas si la persona
    lo desea*/
    nro_placa VARCHAR(150) PRIMARY KEY,
    id_linea INT(5) NOT NULL, -- null
    id_modelo INT(5),
    fecha_ven_seguro DATE NOT NULL,
    fecha_ven_tecnomecanica DATE NOT NULL,
    fecha_ven_contratodo DATE -- null
);

ALTER TABLE vehiculos
    ADD CONSTRAINT `(vehiculos-tipo_linea)`
    FOREIGN KEY (`id_modelo`) 
    REFERENCES `modelo`(`id_modelo`),
    ADD CONSTRAINT `id_linea(vehiculos-tipo_linea)`
    FOREIGN KEY (`id_linea`) 
    REFERENCES `tipo_linea`(`id_linea`);