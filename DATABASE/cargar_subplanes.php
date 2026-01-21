<?php 




require('conexion.php');








  $query="SELECT * FROM planes, sub_plan  WHERE planes.PK_plan  = sub_plan.FK_plan  ";

	$result = mysqli_query($con,$query); 
	


if($result){
       
	 $json = array('err'=>false);
                  while ($row = mysqli_fetch_array($result)) {
                     $json[]=array(
                       
                        'plan_nom'=> $row['plan_nom'],
                        'plan_desc'=> $row['plan_desc'],
                        'PK_sub'=> $row['PK_sub'],
                        'plan_an'=> $row['plan_an'],
                        'sub_plan'=> $row['sub_plan'],
                        'user_up_plan_aut'=> $row['user_up_plan_aut'],
                         
                     );

                  }
                  if(isset($json[0]['PK_sub'])){
                        echo json_encode($json);
                  }else{
                  echo json_encode(array('err'=>true, 'mensaje'=>'Ups. No tenemos nada que mostrarte!!'));	
                  }

	
	}else{

		echo json_encode(array('err'=>true, 'mensaje'=>'Error al tratar de cargar informacion!! '));

	}


	mysqli_close($con);
?>