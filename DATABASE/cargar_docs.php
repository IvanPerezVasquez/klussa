<?php 




require('conexion.php');



$plan_doc =$_POST['plan_doc'];




  $query="SELECT * FROm  planes where  PK_plan = '$plan_doc'";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                        'doc_pln_mc_lg'=> $row['doc_pln_mc_lg'],
                        'plan_nom'=> $row['plan_nom'],
                        'plan_desc'=> $row['plan_desc'],
                        'PK_plan'=> $row['PK_plan'],
                        'plan_an'=> $row['plan_an'],
                        'user_up_plan_aut'=> $row['user_up_plan_aut'],
                         
                     );

                  }
                  if(isset($json[0]['PK_plan'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Datos incorrectos.'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'¡Usuario o contraseña, incorrectos!! '));

	}


	mysqli_close($con);
?>