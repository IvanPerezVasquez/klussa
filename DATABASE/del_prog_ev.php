<?php
require('../DATABASE/conexion.php');

// DATOS FTP
$ftp_server = "200.105.244.50";
$ftp_user   = "Administrador";
$ftp_pass   = "@Kde.2024";
$ftp_ruta   = "/DOC/ACTIVIDADES/";

// OBTENER ID
$id_prog = $_POST['id'] ?? null;

if (!$id_prog) {
    echo json_encode(['err' => true, 'mensaje' => 'ID no recibido.']);
    exit;
}

// BUSCAR ARCHIVO ACTUAL
$sql = "SELECT evidencia_arc FROM programacion WHERE PK_prg = $id_prog";
$res = mysqli_query($con, $sql);

if (!$res || mysqli_num_rows($res) === 0) {
    echo json_encode(['err' => true, 'mensaje' => 'Registro no encontrado.']);
    exit;
}

$row = mysqli_fetch_assoc($res);
$archivo = $row['evidencia_arc'];

if (empty($archivo)) {
    echo json_encode(['err' => true, 'mensaje' => 'No hay archivo para eliminar.']);
    exit;
}

// CONECTAR FTP
$conn_id = ftp_connect($ftp_server);
if (!$conn_id || !ftp_login($conn_id, $ftp_user, $ftp_pass)) {
    echo json_encode(['err' => true, 'mensaje' => 'Error al conectar al servidor FTP.']);
    exit;
}

ftp_pasv($conn_id, true); // modo pasivo

// ELIMINAR ARCHIVO
$ruta_ftp = $ftp_ruta . $archivo;
$eliminado = ftp_delete($conn_id, $ruta_ftp);
ftp_close($conn_id);

if ($eliminado) {
    // OPCIONAL: limpiar campo en base de datos
    $sql_update = "UPDATE programacion SET evidencia_arc = NULL WHERE PK_prg = $id_prog";
    mysqli_query($con, $sql_update);

    echo json_encode(['err' => false, 'mensaje' => 'Archivo eliminado correctamente.']);
} else {
    echo json_encode(['err' => true, 'mensaje' => 'No se pudo eliminar el archivo del FTP.']);
}

mysqli_close($con);
?>
