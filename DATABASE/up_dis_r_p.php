<?php
require('../CONFIG/sys.res.con.php');

$PK_dip = $_POST['id'] ?? null;
$campo = $_POST['campo'] ?? null;
$update_dato = $_POST['update_dato'] ?? null;

$up = "UPDATE dispocicion SET $campo = '$update_dato' WHERE PK_disp = $PK_dip ";

$update = mysqli_query($con, $up);

if ($update) {
   echo json_encode(array('err'=>false, 'status'=>'success','mensaje'=>'Actualizacion exitosa .'));
} else {

  echo json_encode(['err' => true, 'status'=>'err','mensaje' => 'Error al insertar: ' . mysqli_error($con)]);

    mysqli_error($con);
}


mysqli_close($con);
?>
