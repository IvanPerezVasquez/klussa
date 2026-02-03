$(document).ready(function () {


  const user_log = $('#usuario_sistema').val();

  if (user_log && user_log.length !== 0) {
   
 /// url de acceso al servicio

    let url = '../DATABASE/cg_c_agua_pozos.php';
    let params = {};

    /// actvacion de servicios 


    cbx_fil_ag();
    cbx_fil_mq();
    fil_mes();
    c_aut_c_agua_pozos(url, params);

  } else {
    console.warn('No se encontró el usuario del sistema.');
  }


});


/// variables de entorno
    let url = '../DATABASE/cg_c_agua_pozos.php';
    let params = {};
    let llenar_tabla = []; 



function c_aut_c_agua_pozos (url, params){

  

   
  $.ajax({
    url:url ,
    data:params, 
    type: 'POST',
  
        success: function(response){
          console.log(response);
          $('#content_table').empty();
        llenar_tabla = Object.values(JSON.parse(response)).filter(item => typeof item === 'object');
      
          var json = JSON.parse(response);



      
      if(!json.err){
          var contador=1;

        $.each(json, function(i,item){
          


   
          
         
        if(i!="err"){

        
          
          
         
      


          var codigo = `
              <tr>
                <td>${contador}</td>
                <td class="fw-bold">${item.pozo}</td>
                <td>${item.sede}</td>
                <td>${item.maquina}</td>
                <td>${item.mes}</td>
               
                <td>${item.fi}</td>
                <td>${item.fn}</td>
                <td>  <span class="badge bg-success-subtle text-success">${item.gal}</span></td>
                <td> <span class="badge bg-primary-subtle text-primary">${item.litros}</span></td>
             
                <td id="${item.id}">

                <button type="button" class="btn btn-success btn-sm mb-1 mt-1" id="btn_t_dia">
                 <i class="fas fa-cloud-sun"></i>
                  </button>
                 
                 <button type="button" class="btn btn-dark btn-sm mb-1 mt-1" id="btn_t_noche">
                    <i class="fas fa-cloud-moon"></i>
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
                title: 'Ningún dato encontrado',
                text:  'No existen registros.'
                

                })
          }
    }
  })


}

/// mostrar datos en  el  sistema







$(document).on('click', '#bnt_reg_res_p', function() {

 
$('#modal').modal('show');


    cbx_mes_res();
    cbx_agencia();
    modal_insert();
    cbx_ubicacion();
    cbx_maquina();

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
        
      <form id="detalle_residuo" class="container-fluid py-2">

        <div class="card border-0 shadow-sm">
          <div class="card-body">

            <!-- ================= DATOS GENERALES ================= -->
            <div class="mb-3">
              <h6 class="fw-bold text-dark mb-3">
                <i class="fa-solid fa-database me-1"></i> Registro |  Pozos
              </h6>

              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Fecha Inicio</label>
                  <input type="date" class="form-control form-control-sm" id="fecha_inicio" name="fecha_inicio">
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Fecha Cierre</label>
                  <input type="date" class="form-control form-control-sm" id="fecha_cierre" name="fecha_cierre">
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Mes</label>
                  <select class="form-select form-select-sm" id="cbx_mes_res"  name="cbx_mes_res"></select>
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Agencia</label>
                  <select class="form-select form-select-sm" id="cbx_agencia" name="cbx_agencia"></select>
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Maquina</label>
                  <select class="form-select form-select-sm" id="cbx_maquina" name="cbx_maquina"></select>
                </div>

                <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Ubicación</label>
                  <select class="form-select form-select-sm" id="cbx_ubicacion" name="cbx_ubicacion"></select>
                </div>

            

          
              </div>
            </div>


      

            <!-- ================= RESPONSABLE ================= -->
            <div class="row g-3">

            
              <div class="col-md-6">
                  <label class="form-label small fw-semibold text-muted">Pozo</label>
                  <input type="text" class="form-control form-control-sm" id="pozo" name="pozo" placeholder="Pozo A, Pozo B, etc.">
                </div>

              <div class="col-md-6">
                <label class="form-label small fw-semibold text-muted">Responsable</label>
                <input type="text" class="form-control form-control-sm" name="responsable" id="resposable" placeholder="Katty Conforme">
              </div>


            </div>

          </div>
        </div>

      </form>


        
        
        
        `;
        var footer =`

        <div class="container-fluid border-top pt-3" >
        <div class="row g-2">



          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-primary w-100" id="btn_registro">
            <i class="fas fa-save"></i>  Guardar Registro
            </button>
          </div>



      <div class="col-md-6 col-12">
      
            <button type="button" class="btn btn-outline-danger w-100" id="btn_cerrar" data-bs-dismiss="modal">
              <i class="fas fa-times-circle"></i> Cancelar
            </button>
          </div>

        </div>
      </div>



      </div>
        `;
        

      $('#modal').modal('show');
      $('#titulo_modal').append(title);
      $('#form_modal').append(form);
      $('#form_modal_footer').append(footer);


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
          url: '../DATABASE/cbx_ma_pz.php',
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











$(document).on('click', '#btn_registro', function () {
  
// capturo datos del formulario

    const fc_inicio = $('#fecha_inicio').val().trim();
    const fc_cierre = $('#fecha_cierre').val().trim();
    const agencia = $('#cbx_agencia').val().trim();
    const mes = $('#cbx_mes_res').val().trim();
    const maquina = $('#cbx_maquina').val().trim();
    const ubicacion = $('#cbx_ubicacion').val().trim();
    const pozo = $('#pozo').val().trim();
    const responsable = $('#resposable').val().trim();

 //  valor de  la  descripcion  del  residuo
  
 
    if(fc_inicio.length === 0 ) return mensaje('La fecha de inicio es obligatoria','warning');
    if(fc_cierre.length === 0 ) return mensaje('La fecha de cierre es obligatoria','warning');
    if(fc_inicio >= fc_cierre)return mensaje('La fecha de inicio no puede ser mayor o igual a la fecha de cierre','warning');
    if(agencia.length === 0 ) return mensaje('La agencia es obligatoria','warning');
    if(mes.length === 0 ) return mensaje('El mes es obligatorio','warning');
    if(maquina.length === 0 ) return mensaje('La maquina es obligatoria','warning');
    if(ubicacion.length === 0 ) return mensaje('La ubicación es obligatoria','warning');
    if(maquina.length === 0 ) return mensaje('La maquina es obligatoria','warning');
    if(pozo.length === 0 ) return mensaje('El pozo es obligatorio','warning');
    if(responsable.length === 0 ) return mensaje('El responsable es obligatorio','warning');




  /// validdacion, si los campos estan vacios


// envio de datos al  servidor

 $.ajax({
    url: '../DATABASE/insert_pozos_cag.php',
    type: 'POST',
    data: { fc_inicio: fc_inicio, fc_cierre: fc_cierre, agencia: agencia, mes: mes, maquina: maquina, ubicacion: ubicacion, pozo: pozo, responsable: responsable },
    
    beforeSend: function () {
      mensaje('Enviando datos...', 'info');
      $('#btn_registro').prop('disabled', true);
    },
    success: function (response) {
     
       var json = JSON.parse(response);
    
        if(!json.err){  mensaje(json.mensaje,'success');c_aut_c_agua_pozos(url, params);  $('#modal').modal('hide'); }else{ mensaje( json.mensaje,'error')}



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
                $.post('../DATABASE/del_c_ag_pozos.php', { 
                  
                  
                  id_delete: id  


                })
                    .done(function(response) {
                      
                            const res = JSON.parse(response);
                            console.log(response);

                                  mensaje(res.mensaje, res.status);

                            if (res.status === 'success') {
                        
                               c_aut_c_agua_pozos(url, params);

                            }
                  
                    })
                    
            }
        });
    });


/// variable de entorno



// funciones de acciones en modales 

// Mostar ficha de dispocicion de residuos peligrosos




function armar_formulario(ficha, footer){




          $('#modal').modal('show');





        $('#titulo_modal').empty('');
        $('#form_modal').empty('');
        $('#form_modal_footer').empty('');



        /// contenido dinamico


        var title = `
        <div class="container-fluid py-2 border-bottom" >
          <div class="row align-items-center">
            <div class="col-3 d-flex align-items-center">
              <img src="../IMAGE/lg.png" alt="Logo" style="height:32px; width:auto;">
            </div>
            <div class="col-6 text-center">
              <span class="fw-semibold" style="font-size:0.95rem;">BITÁCORA DE GESTIÓN AMBIENTAL | AGUA POZOS</span>
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







        /// asignacion de valores  al modal

        $('#form_modal').append(ficha);
        $('#titulo_modal').append(title);

        $('#form_modal_footer').append(footer);


        }


/// turno dia 

      $(document).on('click', '#btn_t_dia', function() {

        // capturo el id del registro
        let view_info = $(this).closest('td');
        let id = view_info.attr('id');  // más limpio que parentElement

        console.log('ID capturado:', id);
        console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

        // buscar el objeto correspondiente en el JSON global
        let cp = llenar_tabla.find(item => item.id == parseInt(id));
        

        pk_registro = cp.id; // asignar a variable global si es necesario


      let ficha =   `
        
      
        <hr></hr>

            <!-- ================= TURNO DÍA ================= -->
            <div class="mb-3 ">
              <h6 class="fw-bold text-success mb-3 mt-3">
              Consumo de Agua – Turno Día
              </h6>

              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Inicio Turno Día</label>
                  <input type="number" value="${cp.dia_ini}" id="dia_ini" class="form-control form-control-sm" name="dia_inicio" placeholder="Lectura inicial">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Fin Turno Día</label>
                  <input type="number" value="${cp.dia_fin}" id="dia_fin" class="form-control form-control-sm" name="dia_fin" placeholder="Lectura final">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Día (m³)</label>
                  <input type="text" class="form-control form-control-sm" id="dia_consumo" name="dia_consumo" readonly>
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Día (L)</label>
                  <input type="text" class="form-control form-control-sm" id="dia_litros" name="dia_litros" readonly>
                </div>
              </div>
            </div>

            <hr></hr>`;

        
      var footer = `
      <div class="container-fluid border-top pt-3" >
        <div class="row g-2">





          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-primary w-100" id="btn_gurdar_dia">
            <i class="fas fa-save"></i>  Guardar Registro
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


        armar_formulario(ficha, footer);






      });


/// calculo consumo dia
      $(document).on('input', '#dia_fin, #dia_ini', function () {
        const dia_ini = parseFloat($('#dia_ini').val()) || 0;
        const dia_fin = parseFloat($('#dia_fin').val()) || 0;
        const consumo = dia_fin - dia_ini;
        const litros = consumo * 1000;
        $('#dia_consumo').val(consumo.toFixed(2));
        $('#dia_litros').val(litros.toFixed(2));

      });

/// guardar consumo dia
      let pk_registro = 0;

      $(document).on('click', '#btn_gurdar_dia', function () {


        id = pk_registro;
        const dia_ini = $('#dia_ini').val().trim();
        const dia_fin = $('#dia_fin').val().trim();
        const consumo = $('#dia_consumo').val().trim();
        const litros = $('#dia_litros').val().trim();

        console.log('Datos a guardar:', { id, dia_ini, dia_fin, consumo, litros });
        
      // capturo datos del formulario


        if(dia_fin === dia_ini) return mensaje('La lectura final no puede ser igual a la inicial', 'warning');
        if(dia_ini < 0) return mensaje('La lectura inicial no puede ser negativa', 'warning');
        if(dia_fin < 0) return mensaje('La lectura final no puede ser negativa', 'warning');
        if(consumo < 0) return mensaje('El consumo no puede ser negativo', 'warning');
        if(litros < 0) return mensaje('Los litros no pueden ser negativos', 'warning');


      // envio de datos al  servidor

          $.post(
                        '../DATABASE/up_dia_c_pozo.php',
                        { id: id, dia_ini: dia_ini, dia_fin: dia_fin, consumo: consumo, litros: litros },
                        function(response) {
                        
          
                          var json = JSON.parse(response);

                          console.log('Respuesta del servidor:', response);
                          mensaje(json.mensaje, json.status);
                         c_aut_c_agua_pozos(url, params); 
                          
                          // refrescar la tabla después de la actualización
                        }
                      );



      });


      /// turno noche
      $(document).on('click', '#btn_t_noche', function() {
      // capturo el id del registro
        let view_info = $(this).closest('td');
        let id = view_info.attr('id');  // más limpio que parentElement

        console.log('ID capturado:', id);
        console.log('llenar_tabla:', llenar_tabla); // 👈 verifica que tenga datos antes de buscar

        // buscar el objeto correspondiente en el JSON global
        let cp = llenar_tabla.find(item => item.id == parseInt(id));
        

        pk_registro = cp.id; // asignar a variable global si es necesario


      let ficha =   `
        
      
          <hr>

            <!-- ================= TURNO NOCHE ================= -->
            <div class="mb-3">
              <h6 class="fw-bold text-success mb-2">
              Consumo de Agua – Turno Noche
              </h6>

              <div class="row g-3">
                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Inicio Turno Noche</label>
                  <input type="number" id="noche_inicio" value="${cp.dia_fin}" class="form-control form-control-sm" name="noche_inicio" placeholder="Lectura inicial">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Fin Turno Noche</label>
                  <input type="number" id="noche_fin" value="${cp.noche_fin}" class="form-control form-control-sm" name="noche_fin" placeholder="Lectura final">
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Noche (m³)</label>
                  <input type="text" class="form-control form-control-sm" id="noche_consumo" name="noche_consumo" readonly>
                </div>

                <div class="col-md-3">
                  <label class="form-label small fw-semibold text-muted">Consumo Noche (L)</label>
                  <input type="text" class="form-control form-control-sm" id="noche_litros" name="noche_litros" readonly>
                </div>
              </div>
            </div>

            <hr>`;
      var footer = `
      <div class="container-fluid border-top pt-3" >
        <div class="row g-2">





          <div class="col-md-6 col-12">
            <button type="button" class="btn btn-outline-primary w-100" id="btn_gurdar_noche">
            <i class="fas fa-save"></i>  Guardar Registro
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

        armar_formulario(ficha, footer);
      });



    /// calculo consumo noche

    /// calculo consumo dia
    $(document).on('input', '#noche_fin, #noche_inicio', function () {
      const noche_ini = parseFloat($('#noche_inicio').val()) || 0;
      const noche_fin = parseFloat($('#noche_fin').val()) || 0;
      const consumo = noche_fin - noche_ini;
      const litros = consumo * 1000;
      $('#noche_consumo').val(consumo.toFixed(2));
      $('#noche_litros').val(litros.toFixed(2));

    });


    /// guardar turno noche


    $(document).on('click', '#btn_gurdar_noche', function () {


      id = pk_registro;
      const noche_ini = $('#noche_inicio').val().trim();
      const noche_fin = $('#noche_fin').val().trim();
      const consumo = $('#noche_consumo').val().trim();
      const litros = $('#noche_litros').val().trim();

      console.log('Datos a guardar:', { id, noche_ini, noche_fin, consumo, litros });

      // capturo datos del formulario


      if(noche_fin === noche_ini) return mensaje('La lectura final no puede ser igual a la inicial', 'warning');
      if(noche_ini < 0) return mensaje('La lectura inicial no puede ser negativa', 'warning');
      if(noche_fin < 0) return mensaje('La lectura final no puede ser negativa', 'warning');
      if(consumo < 0) return mensaje('El consumo no puede ser negativo', 'warning');
      if(litros < 0) return mensaje('Los litros no pueden ser negativos', 'warning');


    // envio de datos al  servidor

        $.post(
                      '../DATABASE/up_noche_c_pozo.php',
                      { id: id, noche_ini: noche_ini, noche_fin: noche_fin, consumo: consumo, litros: litros },
                      function(response) {
                      
        
                        var json = JSON.parse(response);

                        console.log('Respuesta del servidor:', response);
                        mensaje(json.mensaje, json.status);
                       c_aut_c_agua_pozos(url, params); 
                        
                        // refrescar la tabla después de la actualización
                      }
                    );



    });



// generacion de pdf

$(document).on('click', '#btn_pdf', function() {





  if(!llenar_tabla){
   console.error('No se encontró el registro c');
    return;
  }

  $.ajax({
    url: '../PDF/c_agua_pz.php',
    type: 'POST',
    data: { cp: JSON.stringify(llenar_tabla) },
    xhrFields: { responseType: 'blob' },
    success: function(blob) {
      if(blob.size === 0){
        alert('Error: PDF vacío o contenido inválido');
        return;
      }

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EC-HSE-F-53-AGUA-POZOS.pdf';
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




// exportar a excel



        $("#btn_export_excel").on("click", function () {

            $.ajax({
                url: "../EXCEL/RP_C_A_PZ.php",
                type: "POST",
                data: { data: JSON.stringify(llenar_tabla) },
                xhrFields: { responseType: "blob" },

                success: function (blob) {
                    const link = document.createElement("a");
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "EC-HSE-F-53-AGUA-POZOS.xls";
                    link.click();
                }
            });

        });



/// filtros 

//// 

function fil_mes(){
  $.ajax({
    url: '../DATABASE/cbx_mes_res_p.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_mes').empty();
        $('#cbx_fil_mes').append('<option value="">MES</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_mes+'">'+item.mes_res+'</option>';
            $('#cbx_fil_mes').append(option);
          }
        });
      }
    }
  });
}


function cbx_fil_ag(){
  $.ajax({
    url: '../DATABASE/cg_agencia_cbx.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_ag').empty();
        $('#cbx_fil_ag').append('<option value="">AGENCIA</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_pro+'">'+item.proyecto+'</option>';
            $('#cbx_fil_ag').append(option);
          }
        });
      }
    }
  });
}

/// cargar cbx maquina

function cbx_fil_mq(){
  $.ajax({
    url: '../DATABASE/cbx_ma_res.php',
    type: 'POST',
    success: function(response){
      var json = JSON.parse(response);
      if(!json.err){
        $('#cbx_fil_mq').empty();
        $('#cbx_fil_mq').append('<option value="">MAQUINA</option>');
        $.each(json, function(i,item){
          if(i!="err"){
            var option = '<option value="'+item.PK_maquina+'">'+item.serie_maquina+'</option>';
            $('#cbx_fil_mq').append(option);
          }
        });
      }
    }
  });
}

/// ejecucion del filtro 
/// FILTROS

function verificacar_filtro() {
  
/// vaibles de archivo y parametros de busqueda 
  const url = '../DATABASE/fil_c_ag_pozos.php';
  let params = {};


  /// variables de busqueda
  const mes    = $('#cbx_fil_mes').val();
  const agencia   = $('#cbx_fil_ag').val();
  const mq = $('#cbx_fil_mq').val(); 

  const campo1 = $('#cbx_fil_mes').attr('name');
  const campo2 = $('#cbx_fil_ag').attr('name');
  const campo3 = $('#cbx_fil_mq').attr('name');


  // Agregar filtros solo si tienen valor
  if (mes) {
    params.mes = mes;
    params.campo1 = campo1;
  }

  if (agencia) {
    params.agencia = agencia;
    params.campo2 = campo2;
  }
 
  if (mq) {
      params.mq = mq;
      params.campo3 = campo3;
    }


  
  // Validar que al menos un filtro esté seleccionado
  if (Object.keys(params).length === 0) {
    mensaje('Debes seleccionar al menos un filtro', 'warning');
    return;
  }
  
  console.log('Filtros enviados:', params);

  c_aut_c_agua_pozos(url, params);

}

// ejecucion de la funcion filtar
$('#btn_flt').click(function () {

  verificacar_filtro(); 


});