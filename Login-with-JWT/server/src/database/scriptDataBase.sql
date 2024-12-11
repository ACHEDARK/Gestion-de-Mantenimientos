create database gestor_mantenimiento;
use gestor_mantenimiento;

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL -- Campo para eliminación lógica
);

-- Insertar datos en la tabla login
INSERT INTO login (username, password) VALUES
    ('admin', '1234'),
    ('mantenimiento1', '1234'),
    ('docente1', '1234'),
    ('docente2', '1234');
