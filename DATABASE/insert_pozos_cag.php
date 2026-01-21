<?php


require('../CONFIG/sys.res.con.php');

//DATOS INSERCION

$fc_inicio = $_POST['fc_inicio'];
$fc_cierre = $_POST['fc_cierre'];
$agencia = $_POST['agencia'];
$mes = $_POST['mes'];
$maquina = $_POST['maquina'];
$ubicacion = $_POST['ubicacion'];
$pozo = $_POST['pozo'];
$responsable = $_POST['responsable'];






$busqueda = "SELECT * 
 
            FROM  

            c_ag_posos 

            WHERE 

            fc_in_p_c_ag_ps = '$fc_inicio' 
            AND fc_fn_p_c_ag_ps = '$fc_cierre' 
            AND FK_mes = '$mes' 
            AND FK_pro = '$agencia' 
            AND pozo_c_ag_ps = '$pozo' 
            AND FK_maquina = '$maquina' 
            AND FK_ubicacion = '$ubicacion'";


   $bs = mysqli_query($con, $busqueda);


   if($bs){


      $data_con = mysqli_fetch_array($bs);



    if(isset($data_con['fc_in_ca_ag'])){


       echo json_encode(array('err' => TRUE, 'mensaje' => 'Este consumo  ya fue registrado.'));

    


     }else{


          $insert ="INSERT INTO `c_ag_posos` (
                           
                                  `fc_in_p_c_ag_ps`, 
                                  `fc_fn_p_c_ag_ps`,
                                  `FK_mes`,
                                  `FK_pro`,
                                  `FK_ubicacion`,
                                  `FK_maquina`,
                                  `pozo_c_ag_ps`,
                                  `user_rp_ca_ag_ps`
                         
                            
                          
                              ) VALUES (
                               
                                  '$fc_inicio',                          
                                  '$fc_cierre', 
                                  '$mes',
                                  '$agencia',
                                  '$ubicacion',
                                  '$maquina',
                                  '$pozo',
                                  '$responsable'

                              )";


               $reg = mysqli_query($con,$insert);

                        if ($reg){


                                    echo json_encode(array('err' => false, 'mensaje' => 'Registrado exitosamente.'));

                                    
                                }else{

                                    
                                     echo json_encode(array('err' => TRUE, 'mensaje' => 'No se pudo completar el registro. Intente nuevamente.'));



                                }


     }
           
      

 }else{


echo json_encode(array('err' => TRUE, 'mensaje' => 'Error en sistema.'));



}






































