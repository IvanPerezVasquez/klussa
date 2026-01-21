


$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   cargar_menu(user_log)

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});




function cargar_menu(user_log){


  $('#opciones_sistema').empty();



   
   

$.ajax({
  url: '../DATABASE/home_permisos.php',
  type: 'POST',
  data:{user_log},
  success: function(response){
    var json = JSON.parse(response);
    console.log(response);
    // limpieza de seccion
  $('#opciones_sistema').empty();

    if(!json.err){
      var contador=1;
      $.each(json, function(i,item){
        if(i!="err"){
        
        //administrador
        
        if(item.FK_t_user == 1){
 
 
      


             opciones =`




                    <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="seccion_user">

                                <H3 class="py-3 ">PERFIL DE USUARIO</H3>
                                
                                    <div class="card shadow-lg   rounded">


                                        <div class="row no-gutters">
                                            <div class="col-md-4">
                                            <img src="../IMAGE/u.png" class="card-img-top p-4  " alt="...">
                                            </div>
                                            <div class="col-md-8">
                                            <div class="card-body  text-white">
                                                <h5 class="card-title">`+item.nom_user+ ` `+item.ap_user+`</h5>
                                                <h5 class="card-title">`+item.cargo_user+`</h5>
                                                 <h5 class="card-title">`+item.agencia_reg_user+`</h5>
                                                <p class="card-text">`+item.username_user+`</p>
                                            </div>
                                            </div>
                                        </div>
                                    
                                    
                                    
                                        </div>
                                
                                
                    </div>
            
          
         







  <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="seccion_pedido">

             <H3 class="py-3 ">AGENCIAS</H3>
            
                  <div class="card shadow-lg   rounded">
                        <img src="../IMAGE/ag.png" class="card-img-top p-4  " alt="...">
                        <div class="card-body text-center d-grid gap-2">
                            <button class="btn btn-lg  btn-warning " id="btn_pedidos_clbr" type="btn"> GESTION DE  AGENCIAS </button>
                        </div>
                    </div>
               
             
            </div>

 <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op">
         
            <H3 class="py-3">ACTIVIDADES</H3>
            
            <div class="card  shadow rounded" >
                  <img src="../IMAGE/TASK.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " type="btn">GESTION  ACTIVIDADES</button>
                     
                  </div>
              </div>
         
        
 </div>

     <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="seccion_despacho">
            <H3 class="py-3">DOCUMENTOS</H3>
            
            <div class="card  shadow-lg roundle">
                  <img src="../IMAGE/dc.png" class="card-img-top p-4"  alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="despachar_p" type="btn">GESTION  DOCUMENTOS</button>
                  </div>
              </div>
          </div>
        
        
        
 <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op">
            <H3 class="py-3">CALENDARIO</H3>
            
            <div class="card    shadow-lg roundle" >
                  <img src="../IMAGE/cl.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " type="btn"> GESTIONAR  CALENDARIO</button>
                  </div>
              </div>
          </div>
        


 <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="sec_user">
            <H3 class="py-3">USUARIOS</H3>
            
            <div class="card    shadow-lg roundle" >
                  <img src="../IMAGE/user.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_users" type="btn"> Añadir  Usuario</button>
                  </div>
              </div>
          </div>
        
          
 <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_pedido_online">
            <H3 class="py-3">PERMISOS</H3>
            
             <div class="card    shadow-lg roundle" >
                  <img src="../IMAGE/per.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_pedidos_online_clbr" type="btn" ></i>Conceder Permisos</button>
                  </div>
              </div>
           </div>


 <div class="col-lg-12 col-md-12 col-sm-12 mt-4 op" id="seccion_planes_pma">
            <H3 class="py-3">PLANES DE MANEJO AMBIENTAL</H3>
            
             <div class="card    shadow-lg roundle"  >
                  <img src="../IMAGE/plan.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_registros_pma" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                  </div>
              </div>
           </div>




            <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_res_n_p">
            <H3 class="py-3"> RESIDUOS NO PELIGROSOS </H3>
            
             <div class="card    shadow-lg roundle"  >
                  <img src="../IMAGE/rsnp.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                  </div>
              </div>
           
           
           
              </div>



            <div class="col-lg-6 col-md-12 col-sm-12 mt-4 op" id="seccion_res_p">
            <H3 class="py-3">RESIDUOS PELIGROSOS Y/O ESPECIALES </H3>
            
             <div class="card    shadow-lg roundle"  >
                  <img src="../IMAGE/rsp.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_rp_hse" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                  </div>
              </div>
           
           
           
              </div>



            <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_agua">
            <H3 class="py-3"> CONSUMO AGUA </H3>
            
             <div class="card    shadow-lg roundle"  >
                  <img src="../IMAGE/agua.png" class="card-img-top p-4" alt="...">
                  <div class="card-body text-center d-grid gap-2">
                      <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                  </div>
              </div>
           
           
           
              </div>


                <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_comb">
                    <H3 class="py-3"> CONSUMO COMBUSTIBLE </H3>
                    
                    <div class="card    shadow-lg roundle"  >
                        <img src="../IMAGE/gas.png" class="card-img-top p-4" alt="...">
                        <div class="card-body text-center d-grid gap-2">
                            <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                        </div>
                    </div>
                
                
                
                    </div>




                <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="seccion_res_n_p">
                    <H3 class="py-3"> CONSUMO ADITIVOS </H3>
                    
                    <div class="card    shadow-lg roundle"  >
                        <img src="../IMAGE/ad.png" class="card-img-top p-4" alt="...">
                        <div class="card-body text-center d-grid gap-2">
                            <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                        </div>
                    </div>
                
                
                
                    </div>


            <div class="col-lg-3 col-md-12 col-sm-12 mt-4 op" id="sec_pz">
                    <H3 class="py-3"> CONSUMO POZO </H3>
                    
                    <div class="card    shadow-lg roundle"  >
                        <img src="../IMAGE/pz.png" class="card-img-top p-4" alt="...">
                        <div class="card-body text-center d-grid gap-2">
                            <button class="btn btn-lg  btn-warning " id="btn_res_n_p" type="btn" ><i class="fas fa-th-list"></i> Ver Registros</button>
                        </div>
                    </div>
                
                
                
                    </div>

             
      
             
          
          
          `;
 
 // COLABORADOR
        }else if(item.FK_t_user == 2){
 
          opciones =`
             



               
  
       
       
       
          `;
 
 //PROVEEEDOR 
        }else if(item.FK_t_user == 4){
 
 
          opciones =`
             
     
        
          
     
        
   
       
       `;
 //DEVELOP
        }else if(item.FK_t_user == 7){





          opciones =`
             
           
       
       `;








        }
     
        $('#opciones_sistema').append(opciones);
 
 
 
 
 
       
 
        }
      })
    }
    else{
 
         Swal.fire({
              icon: 'info',
              title: json.mensaje,
              text:  'Sistema en fase de pruebas'
              ,footer: '<a href>Ver manual</a>'
 
              })
        }
  }
 })


          
        
        
        
        
        }



  



/////ACCIONES MODULO HOME

///USUAIRO
$(document).on('click','#btn_users',function(event){


    location.href="../CONTROLLERS/PMA-USERS.php";

});

$(document).on('click','#sec_user',function(event){


    location.href="../CONTROLLERS/PMA-USERS.php";

});

///PLANES

$(document).on('click','#btn_registros_pma',function(event){


    location.href="../CONTROLLERS/PLANES.php";

});


$(document).on('click','#seccion_planes_pma',function(event){


    location.href="../CONTROLLERS/PLANES.php";

});




// residuos 

$(document).on('click','#btn_rp_hse',function(event){


    location.href="../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

$(document).on('click','#seccion_res_p',function(event){


    location.href="../CONTROLLERS/RESIDUOS-PELIGROSOS.php";

});

$(document).on('click','#btn_res_n_p',function(event){


    location.href="../CONTROLLERS/RESIDUOS-NO-PELIGROSOS.php";

});

$(document).on('click','#seccion_res_n_p',function(event){


    location.href="../CONTROLLERS/RESIDUOS-NO-PELIGROSOS.php";

});



// seccion  consumo de aguas

$(document).on('click','#sec_agua',function(event){


    location.href="../CONTROLLERS/CONSUMO-AGUA-SEDES.php";

});


//seccion consumo de combustible
$(document).on('click','#sec_comb',function(event){


    location.href="../CONTROLLERS/CONSUMO-COMBUSTIBLE.php";

});

//seccion pozo
$(document).on('click','#sec_pz',function(event){


    location.href="../CONTROLLERS/CONSUMO-AGUA-POZOS.php";

});
