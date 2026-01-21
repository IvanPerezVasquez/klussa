$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
   residuos_no_peligrosos()

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


let llenar_tabla = []; 

function residuos_no_peligrosos (){

  

   
  $.ajax({
    url: '../DATABASE/cg_res_hse_no_p.php',
    type: 'POST',
  
      success: function(response){
      console.log(response);
      $('#content_table').empty();
      llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      
      console.log('llenar_tabla:', llenar_tabla);
      console.log('Es array:', Array.isArray(llenar_tabla));



      
      if(!llenar_tabla.err){
          var contador=1;

        $.each(llenar_tabla, function(i,item){


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo =`
          
                      
       <tr>
          <td>${contador}</td>
          <td>${item.mes_res}</td>
          <td>${item.fc_disp}</td>
          <td>${item.descrip_residuo}</td>
          <td>${item.proyecto}</td>
          <td>${item.clf_sis_r}</td>
          <td>${item.gestor_res}</td>
          <td>${item.resp_des}</td>

          <td id="${item.PK_disp}">

              <button type="button" id="btn_edit" class="btn btn-warning btn-sm mb-1 mt-1">
                    <i class="fas fa-edit"></i>
              </button>

            <button type="button" id="btn_delete" class="btn btn-danger btn-sm mb-1 mt-1">
              <i class="fas fa-trash-alt"></i>
            </button>

       
          
          
            </td>
        </tr>
          

 
          
          `;


        
       }



          //asignacion de informacion

         $('#content_table').append(codigo);
        
         contador ++


        })
      }
      else{

           Swal.fire({
                icon: 'info',
                title: json.mensaje,
                text:  'No existen exámenes agendados.'
                

                })
          }
    }
  })


}

/// mostrar datos en  el  sistema






$(document).on('click', '#bnt_reg_res_p', function() {

 
$('#modal').modal('show');


    cbx_mes_res();
    cbx_res();
    cbx_maquina();
    cbx_agencia();
    modal_insert();
   cbx_gestora();
   cbx_ubicacion();
})






function modal_insert(){

$('#modal').modal('show');
$('#titulo_modal').empty('');
$('#form_modal').empty('');
$('#form_modal_footer').empty('');



   var title = `
<div class="container-fluid py-2 border-bottom" >
  <div class="row align-items-center">
    <div class="col-3 d-flex align-items-center">
      <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
    </div>
    <div class="col-6 text-center">
      <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL</span>
    </div>
    <div class="col-3 text-end">
      <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
    </div>
  </div>
</div>

<button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
  <i class="fa-solid fa-xmark fa-lg"></i>
</button>
`;

   var form =`
   <div class="container mt-2">
     <div class="card  border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i>REGISTRO | BITACORA DE CONTROL RESIDUOS NO PELIGROSOS
    </div>
  </div>
</div>
   
<form id="detalle_residuo" class="container-fluid p-4 shadow-sm rounded-3 border-light bg-white">

  <!-- Fecha de entrega -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="fecha_entrega">Fecha de entrega</label>
    <div class="col-md-8">
      <input type="date" class="form-control-plaintext" id="fecha_entrega" name="fecha_entrega" value="2025-01-10">
    </div>
  </div>

  <!-- Mes -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_mes_res">Mes</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_mes_res" name="cbx_mes_res"></select>
    </div>
  </div>

  <!-- Residuo -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_res">Residuo</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_res" name="cbx_res"></select>
    </div>
  </div>

  <!-- Agencia -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_agencia">Agencia</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_agencia" name="cbx_agencia"></select>
    </div>
  </div>

  <!-- Ubicación -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_ubicacion">Ubicación</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_ubicacion" name="cbx_ubicacion"></select>
    </div>
  </div>

  <!-- Máquina -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_maquina">Máquina</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_maquina" name="cbx_maquina"></select>
    </div>
  </div>

  <!-- Cantidades -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="ct_kg">Cantidad (KG)</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="ct_kg" name="ct_kg" placeholder="Kilos">
    </div>
  </div>

  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="ct_ton">Cantidad (TON)</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="ct_ton" name="ct_ton" placeholder="Toneladas">
    </div>
  </div>

  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="ct_lt">Cantidad (L)</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="ct_lt" name="ct_lt" placeholder="Litros">
    </div>
  </div>

  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="ct_gl">Cantidad (GL)</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="ct_gl" name="ct_gl" placeholder="Galones">
    </div>
  </div>

  <!-- Comprobante -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="comprobante">Comprobante</label>
    <div class="col-md-8">
      <input 
        type="text" 
        class="form-control-plaintext" 
        id="comprobante" 
        name="comprobante" 
        placeholder="Ej: N° 001-2025">
    </div>
  </div>

  <!-- Gestora -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cbx_gestora">Gestora</label>
    <div class="col-md-8">
      <select class="form-control-plaintext" id="cbx_gestora" name="cbx_gestora"></select>
    </div>
  </div>

  <!-- Responsable -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="responsable">Responsable</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="responsable" name="responsable" placeholder="Ej: Katty Conforme">
    </div>
  </div>

  <!-- Cargo del responsable -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="cargo">Cargo</label>
    <div class="col-md-8">
      <input type="text" class="form-control-plaintext" id="cargo" name="cargo" placeholder="Ej: Supervisor Ambiental">
    </div>
  </div>

  <!-- Descripción de la disposición -->
  <div class="mb-3 row">
    <label class="col-md-4 col-form-label" for="desc_dispo">Descripción de la disposición</label>
    <div class="col-md-8">
      <textarea class="form-control form-control-plaintext" rows="3" id="desc_dispo" name="desc_dispo" placeholder="Detalle de la disposición realizada"></textarea>
    </div>
  </div>

</form>

   
   
   
   `;

var footer = `
<div class="container-fluid border-top pt-3" >
  <div class="row g-2">





 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-success  w-100" id="btn_registro">
      <i class="fas fa-save"></i> Guardar
      </button>
    </div>

 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
        <i class="fas fa-times-circle"></i> Cerrar
      </button>
    </div>

  </div>
</div>
`;

   

$('#modal').modal('show');
$('#titulo_modal').append(title);
$('#form_modal').append(form);
$('#form_modal_footer').append(footer);


}







function cbx_res(){
  $.ajax({
    url: '../DATABASE/cg_res_hse_no_p_lst.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_res').empty();
        $('#cbx_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
           var option = `<option value="${item.id_res}">${item.descrip_residuo}</option>`;
           desc = item.descrip_residuo;
           option = $(option).data('desc', desc);
      
            $('#cbx_res').append(option);
          

          }
        });
      }
    }
  });
}




function cbx_mes_res(){
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_mes_res').empty();
        $('#cbx_mes_res').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
            $('#cbx_mes_res').append(option);
          }
        });
      }
    }
  });
}




function cbx_maquina(){
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_maquina').empty();
        $('#cbx_maquina').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_maquina+'">'+item.serie_maquina+'</option>';
            $('#cbx_maquina').append(option);
          }
        });
      }
    }
  });
}

function cbx_agencia(){
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_agencia').empty();
        $('#cbx_agencia').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
            $('#cbx_agencia').append(option);
          }
        });
      }
    }
  });
}

function cbx_gestora(){
  $.ajax({
    url: '../DATABASE/cbx_gestora_des_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_gestora').empty();
        $('#cbx_gestora').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_gestor+'">'+item.gestor_res+'</option>';
            $('#cbx_gestora').append(option);
          }
        });
      }
    }
  });
}


function cbx_ubicacion(){
  $.ajax({
    url: '../DATABASE/cbx_ubicacion.php', // PHP que devuelve los manifiestos
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_ubicacion').empty();
        $('#cbx_ubicacion').append('<option value="">SELECCIONE UNA OPCIÓN</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_ub+'">'+item.ubicacion+'</option>';
            $('#cbx_ubicacion').append(option);
          }
        });
      }
    }
  });
}




///// calculo automatico 


  $(document).on('input', '#ct_kg', function() {

    const kg = parseFloat($(this).val()) || 0;
    const densidad = 0.85; // kg/L (densidad promedio del aceite)

    // Conversiones basadas en densidad del aceite
    const ton = kg / 1000;                // toneladas
    const litros = kg / densidad;         // litros = masa / densidad
    const galones = litros / 3.785;       // galones = litros / 3.785

    // Mostrar resultados
    $('#ct_ton').val(ton.toFixed(3));
    $('#ct_lt').val(litros.toFixed(1));
    $('#ct_gl').val(galones.toFixed(2));

  });






/// eliminacion de registros//
$(document).on('click','#btn_delete',function(event){

// MOSTRAMOS LOS RECURSOS PARA CARGAR DATOS

 var delete_info = $(this)[0].parentElement;
 id = $(delete_info).attr("id");
  
console.log(id);

Swal.fire({
        title: "¿Deseas eliminar el registro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            $.post('../DATABASE/del_reg_resp.php', { 
              
              
              id_delete: id  


            })
                .done(function(response) {
                   
                        const res = JSON.parse(response);
                        console.log(response);

                              mensaje(res.mensaje, res.status);

                        if (res.status === 'success') {
                     
                            residuos_no_peligrosos();

                        }
               
                })
                
        }
    });
});


/// registro de residuos

$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario
  const fechaEntrega = $('#fecha_entrega').val().trim();
  const mes = $('#cbx_mes_res').val().trim();
  const codigo = $('#cbx_res').val().trim();
  const agencia = $('#cbx_agencia').val().trim();
  const ub = $('#cbx_ubicacion').val().trim();
  const mq = $('#cbx_maquina').val().trim();
  const kg = $('#ct_kg').val().trim();
  const ton = $('#ct_ton').val().trim();
  const lt = $('#ct_lt').val().trim();
  const gl = $('#ct_gl').val().trim();
  const gestora = $('#cbx_gestora').val().trim();
  const manifesto = $('#comprobante').val().trim();
  const responsable = $('#responsable').val().trim();
  const cargo = $('#cargo').val().trim();
  const descrip = $('#desc_dispo').val().trim(); //  valor de  la  descripcion  del  residuo
  
  /// validdacion, si los campos estan vacios


 if (fechaEntrega === '') return mensaje('Selecciona una fecha de entrega', 'warning');
  if (mes === '') return mensaje('Selecciona el mes correspondiente', 'warning');
  if (codigo === '') return mensaje('Selecciona un  residuo', 'warning');
  if (agencia === '') return mensaje('Selecciona una agencia', 'warning');
  if (ub === '') return mensaje('Selecciona la ubicación', 'warning');
  if (mq === '') return mensaje('Selecciona la máquina o equipo', 'warning');
  if (kg === '' && ton === '' && lt === '' && gl === '')
    return mensaje('Debes ingresar al menos una cantidad (kg, ton, lt o gl)', 'warning');
  if (gestora === '') return mensaje('Selecciona una empresa gestora', 'warning');

  if (manifesto === '') return mensaje('Ingresa un N° comprobante', 'warning');
  if (responsable === '') return mensaje('Ingresa el nombre del responsable', 'warning');
  if (cargo === '') return mensaje('Ingrese su cargo', 'warning');
  if (descrip === '') return mensaje('Ingrese una descripcion', 'warning');
///  ingreso del  registro, 

 $.ajax({
    url: '../DATABASE/insert_reg_p.php',
    type: 'POST',
    data: { fechaEntrega, mes, codigo, agencia, ub, mq, kg, ton, lt, gl, gestora, responsable,manifesto, cargo, descrip },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');     residuos_no_peligrosos();  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



    },
    error: function (xhr, status, error) {
      console.error(error);
      mensaje('Ocurrió un error en la solicitud', 'error');
    },
     complete: function () {
      $('#btn_registro').prop('disabled', false);
    }
  });


});


function mensaje(mensaje, icono) {

      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: icono,
        title: mensaje,
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true
      });


  }


  /// editar registros 


  let pk_registro = 0;

$(document).on('click', '#btn_edit', function() {

  // capturo el id del registro
  let view_info = $(this).closest('td');
  let id = view_info.attr('id');  // más limpio que parentElement

  console.log('ID capturado:', id);
  console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

  // buscar el objeto correspondiente en el JSON global
  let cp = llenar_tabla.find(item => item.PK_disp == parseInt(id));
  

  pk_registro = cp.PK_disp; // asignar a variable global si es necesario



  $('#modal').modal('show');





$('#titulo_modal').empty('');
$('#form_modal').empty('');
$('#form_modal_footer').empty('');


var title = `
<div class="container-fluid py-2 border-bottom" >
  <div class="row align-items-center">
    <div class="col-3 d-flex align-items-center">
      <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
    </div>
    <div class="col-6 text-center">
      <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL</span>
    </div>
    <div class="col-3 text-end">
      <small class="text-light opacity-75 fw-semibold">EC-HSE-F-53 </small>
    </div>
  </div>
</div>

<button type="button" class="btn btn-link text-danger p-0" data-bs-dismiss="modal" aria-label="Close">
  <i class="fa-solid fa-xmark fa-lg"></i>
</button>
`;



   var ficha =`
<div class="container mt-2">
  <div class="card border-0 rounded-3 ficha-form">
    <div class="card-header text-white fw-bold py-3" style="background: #212529;">
      <i class="fa-solid fa-recycle me-2"></i>REGISTRO | BITÁCORA DE CONTROL DE RESIDUOS NO PELIGROSOS
    </div>
  </div>
</div>

<form id="detalle_residuo" class="container-fluid p-4 shadow-sm rounded-3 border-light bg-white text-uppercase">

  <div class="row g-3">

    <!-- ========================= -->
    <!--     COLUMNA IZQUIERDA     -->
    <!-- ========================= -->
    <div class="col-md-6">

      <!-- Fecha -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="fc_disp" class="col-auto mb-0 me-3 fw-bold">Fecha</label>
        <input type="date" id="fc_disp" name="fecha_entrega" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.fc_disp}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Mes -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Mes</label>
        <input type="text" id="mes_res" name="FK_mes" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.mes_res}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Residuo -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Residuo</label>
        <input type="text" id="res" name="FK_res" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.descrip_residuo}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Agencia -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Agencia</label>
        <input type="text" id="agencia" name="FK_pro" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.proyecto}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Ubicación -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Ubicación</label>
        <input type="text" id="ubicacion" name="FK_ub" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.ubicacion}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

    </div>

    <!-- ========================= -->
    <!--     COLUMNA DERECHA       -->
    <!-- ========================= -->
    <div class="col-md-6">

      <!-- Máquina -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Máquina</label>
        <input type="text" id="maquina" name="FK_mq" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.serie_maquina}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Kilos -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="ct_kg" class="col-auto mb-0 me-3 fw-bold">Kilos (KG)</label>
        <input type="text" id="ct_kg" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.ct_kg}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Toneladas -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="ct_tn" class="col-auto mb-0 me-3 fw-bold">Toneladas (TN)</label>
        <input type="text" id="ct_tn" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.ct_tn}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Litros -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="ct_lit" class="col-auto mb-0 me-3 fw-bold">Litros (L)</label>
        <input type="text" id="ct_lit" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.ct_lit}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

      <!-- Galones -->
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="ct_gl" class="col-auto mb-0 me-3 fw-bold">Galones (GL)</label>
        <input type="text" id="ct_gl" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.ct_gl}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>

    </div>

    <!-- ========================= -->
    <!--     CAMPO GRANDE          -->
    <!-- ========================= -->

    <!-- Gestor -->
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 mb-3">
        <label class="col-auto mb-0 me-3 fw-bold">Gestor</label>
        <input type="text" id="gestora" name="FK_gest" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.gestor_res}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_select">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- Comprobante -->
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="mnft" class="col-auto mb-0 me-3 fw-bold">Comprobante</label>
        <input type="text" id="mnft" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.mnft}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- Responsable -->
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="resp_des" class="col-auto mb-0 me-3 fw-bold">Responsable</label>
        <input type="text" id="resp_des" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.resp_des}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- Cargo -->
    <div class="col-12">
      <div class="d-flex align-items-center gap-2 mb-3">
        <label for="cargo" class="col-auto mb-0 me-3 fw-bold">Cargo</label>
        <input type="text" id="cargo" class="form-control-plaintext form-control-sm flex-grow-1" value="${cp.cargo}" readonly>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

    <!-- Descripción -->
    <div class="col-12">
      <div class="d-flex align-items-start gap-2 mb-2">
        <label for="des_des" class="col-auto mb-0 me-3 fw-bold">Descripción</label>
        <textarea class="form-control-plaintext form-control-sm flex-grow-1" id="des_des" rows="3" readonly>${cp.des_des}</textarea>
        <button class="btn btn-sm bg-transparent border-0" type="button" id="edit_textarea">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </div>
    </div>

  </div>
</form>


   
   
   
   `;

var footer = `
<div class="container-fluid border-top pt-3" >
  <div class="row g-2">





 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-info  w-100" id="btn_pdf">
      <i class="fas fa-file-pdf"></i> Imprimir
      </button>
    </div>

 <div class="col-md-6 col-12">
      <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
        <i class="fas fa-times-circle"></i> Cerrar
      </button>
    </div>

  </div>
</div>
`;



/// asignacion de valores  al modal

$('#form_modal').append(ficha);
$('#titulo_modal').append(title);

$('#form_modal_footer').append(footer);
});




/// editar imputs 

$(document).on('click', '#edit', function() {

  var input = $(this).siblings('input'); // busca el input hermano
 

  if (input.prop('readonly')) {
      
    input.prop('readonly', false);

    $(this).attr('title', 'Guardar fecha');
    $(this).find('i').removeClass('fa-pencil').addClass('fa-floppy-disk');


  } else {

    input.prop('readonly', true);
    $(this).attr('title', 'Editar fecha');
    $(this).find('i').removeClass('fa-floppy-disk').addClass('fa-pencil');  
  

    // Aquí puedes agregar la lógica para guardar la nueva fecha en la base de datos si es necesario

    var campo  = input.attr('id');
    update_dato = input.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);

        if(update_dato.length === 0){
            mensaje('El campo no puede estar vacío', 'warning');
            return;


         }

          $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                    residuos_no_peligrosos(); // refrescar la tabla después de la actualización
                  }
                );

    
  }


});



//// editar selects 


 id_elemento = '';
// editar  select
$(document).on('click', '#edit_select', function() {



    var input = $(this).siblings('input'); 
     id_elemento  = input.attr('id');
    var name = input.attr('name');
    console.log('Campo a editar:', name);

    // Ejecutar función cbx_<campo>
    var cargar_cbx = `cbx_${id_elemento}`;

    if (typeof window[cargar_cbx] === "function") {
        window[cargar_cbx]();
    } else {
        console.log("Función no encontrada:", cargar_cbx);
        return;
    }

    // Crear select
    var select = `
        <select class="form-control-plaintext form-control-sm" id="cbx_${id_elemento}" name="${name}"></select>
    `;

    // Botón que aparecerá junto al select
    var botonGuardar = `
        <button type="button" class="btn btn-success btn-sm ml-2" id="btn_guardar">
            <i class="fa-solid fa-check"></i>
        </button>
    `;

  
    // Reemplazar input → select
    input.replaceWith(select);

    // Insertar botón después del select
    $(this).after(botonGuardar);

});


// Guardar selección del select editado
$(document).on('click', '#btn_guardar', function() {
    var select = $(this).siblings('select');
    var name = select.attr('name');
    let newText = select.find("option:selected").text();
    
    id_reg = select.val();

    if(id_reg.length === 0){
        mensaje('Debes seleccionar una opción', 'warning');
        
    }else{


      $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: name, update_dato: id_reg, id: pk_registro },
                  function(response) {
                  
     
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                    residuos_no_peligrosos(); // refrescar la tabla después de la actualización
                  }
                );


    }
 

   
     imput_replace = `<input type="text" class="form-control-plaintext" name="${name}" id="${id_elemento}" value="${newText}" readonly>`;
     console.log(imput_replace);

    select.replaceWith(imput_replace);
    $(this).remove();


  });

    //editar textarea
$(document).on('click', '#edit_textarea', function() {


  var textarea = $(this).siblings('textarea'); // busca el textarea hermano
 

  if (textarea.prop('readonly')) {    
    textarea.prop('readonly', false);

    $(this).attr('title', 'Guardar descripción');
    $(this).find('i').removeClass('fa-pencil').addClass('fa-floppy-disk');
  } else {
    textarea.prop('readonly', true);

    $(this).attr('title', 'Editar descripción');
    $(this).find('i').removeClass('fa-floppy-disk').addClass('fa-pencil');  
    // Aquí puedes agregar la lógica para guardar la nueva descripción en la base de datos si es necesario
    var campo  = textarea.attr('id');
    update_dato = textarea.val();

    console.log('PK registro:', pk_registro);

    console.log('Nueva dato:', update_dato);


        if(update_dato.length === 0){
            mensaje('El campo no puede estar vacío', 'warning');
            return;     



          }          $.post(
                  '../DATABASE/up_dis_r_p.php',
                  { campo: campo, update_dato: update_dato, id: pk_registro },
                  function(response) {  
                    var json = JSON.parse(response);

                    console.log('Respuesta del servidor:', response);
                    mensaje(json.mensaje, json.status);
                    residuos_no_peligrosos(); // refrescar la tabla después de la actualización
                  }
                );
  }
  
})


// generacion de pdf
$(document).on('click', '#btn_pdf', function() {



  let cp = llenar_tabla.find(item => item.PK_disp == parseInt(pk_registro));

  if(!cp){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/bit_peligrosos.php',
    type: 'POST',
    data: { cp: JSON.stringify(cp) },
    xhrFields: { responseType: 'blob' },
    success: function(blob) {
      if(blob.size === 0){
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-NO_RESIDUOS_PELIGROSOS.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    },
    error: function(xhr, status, error){
      console.error('Error AJAX:', error);
    }
  });

});
/// reporte en excel 
$("#btn_export_excel").on("click", function () {

    $.ajax({
        url: "../EXCEL/RP_RES_P.php",
        type: "POST",
        data: { data: JSON.stringify(llenar_tabla) },
        xhrFields: { responseType: "blob" },

        success: function (blob) {
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = "EC-HSE-F-53-NO_RESIDUOS_PELIGROSOS.xls";
            link.click();
        }
    });

});

