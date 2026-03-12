<?php
require_once 'conexion.php';

/* ================================
   1. DATOS DEL FORMULARIO
================================ */
$fc_inicio   = $_POST['fc_inicio']   ?? '';
$fc_cierre   = $_POST['fc_cierre']   ?? '';
$agencia     = $_POST['agencia']     ?? '';
$mes         = $_POST['mes']         ?? '';
$maquina     = $_POST['maquina']     ?? '';
$ubicacion   = $_POST['ubicacion']   ?? '';
$pozo        = $_POST['pozo']        ?? '';
$responsable = $_POST['responsable'] ?? '';

/* ================================
   2. VALIDAR CAMPOS OBLIGATORIOS
================================ */
if (
    !$fc_inicio || !$fc_cierre || !$agencia || !$mes ||
    !$maquina || !$ubicacion || !$pozo || !$responsable
) {
    echo json_encode([
        'err' => true,
        'mensaje' => 'Faltan datos obligatorios.'
    ]);
    exit;
}

/* ================================
   3. VERIFICAR SI YA EXISTE
================================ */
$busqueda = "
    SELECT PK_c_ag_ps
    FROM c_ag_posos
    WHERE
        fc_in_p_c_ag_ps = '$fc_inicio'
        AND fc_fn_p_c_ag_ps = '$fc_cierre'
        AND FK_mes = '$mes'
        AND FK_pro = '$agencia'
        AND pozo_c_ag_ps = '$pozo'
        AND FK_maquina = '$maquina'
        AND FK_ubicacion = '$ubicacion'
    LIMIT 1
";

$bs = mysqli_query($con, $busqueda);

if (!$bs) {
    echo json_encode([
        'err' => true,
        'mensaje' => 'Error al validar duplicado.'
    ]);
    exit;
}

if (mysqli_num_rows($bs) > 0) {
    echo json_encode([
        'err' => true,
        'mensaje' => 'Este consumo ya fue registrado.'
    ]);
    exit;
}

/* ================================
   4. INSERTAR REGISTRO
================================ */
$insert = "
    INSERT INTO c_ag_posos (
        fc_in_p_c_ag_ps,
        fc_fn_p_c_ag_ps,
        FK_mes,
        FK_maquina,
        FK_ubicacion,
        pozo_c_ag_ps,
        t_d_md_in,
        t_d_md_fn,
        t_n_md_in,
        t_n_md_fn,
        cm_t_gl_c_ag_ps,
        cm_t_li_c_ag_ps,
        FK_pro,
        user_rp_ca_ag_ps
    ) VALUES (
        '$fc_inicio',
        '$fc_cierre',
        '$mes',
        '$maquina',
        '$ubicacion',
        '$pozo',
        0,
        0,
        0,
        0,
        0,
        0,
        '$agencia',
        '$responsable'
    )
";

$reg = mysqli_query($con, $insert);

if ($reg) {
    echo json_encode([
        'err' => false,
        'mensaje' => 'Registrado exitosamente.'
    ]);
} else {
    echo json_encode([
        'err' => true,
        'mensaje' => 'No se pudo completar el registro.'
    ]);
}
