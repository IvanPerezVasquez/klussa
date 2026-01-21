<?php

if (basename(__FILE__) == basename($_SERVER['SCRIPT_FILENAME'])) {
    http_response_code(403);
    exit('Acceso denegado');
}


$servidor = 'localhost';
$usuario  = 'root';
$password = '';
$database = 'klussa_desechos';

// Crear conexión
$con = mysqli_connect($servidor, $usuario, $password, $database);

// Verificar conexión
if (!$con) {
    die("❌ Error de conexión: " . mysqli_connect_error());
}

// Configurar charset UTF-8 para evitar problemas con acentos
mysqli_set_charset($con, "utf8mb4");

// ✅ Conexión correcta
// echo "✅ Conexión exitosa";



?>