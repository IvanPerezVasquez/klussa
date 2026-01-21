<div class="container contenido-op" style="margin-top: 100px;">

  <div class="card shadow-lg border-0 rounded-4 overflow-hidden">

    <!-- Encabezado -->
    <div class="card-header bg-gradient text-white" 
         style="background: linear-gradient(90deg, #007bff, #0056b3);">
      <h5 class="mb-0 fw-bold">
        <i class="fa-solid fa-recycle me-2"></i>
        BITACORA DE CONTROL RESIDUOS NO PELIGROSOS
      </h5>
    </div>

    <!-- Cuerpo -->
    <div class="card-body bg-light mt-3 mb-4 rounded-4">

    

      <!-- Botón de registro -->
      <div class="text-end mb-3">

      
          
          
             


          <button id="btn_export_excel" 
                type="button" 
                class="btn btn-success px-4 shadow-sm">
           <i class="fa-solid fa-file-excel"></i> Excel
        </button>

        <button id="bnt_reg_res_p" 
                type="button" 
                class="btn btn-primary px-4 shadow-sm">
          <i class="fa-solid fa-plus me-2"></i>Registrar
        </button>
      
      
      
      
         
      
      </div>


         <!-- Cuerpo -->
    <div class="card-body bg-light mt-3 mb-4 rounded-4">

    

      <!-- Botón de registro -->
      <div class="text-end mb-3">

      
          
          
             
<div class="col-md-6">
    <div class="position-relative">
        <input type="text" 
               class="form-control form-control-sm pe-4 " 
               id="buscar_residuo"  
               placeholder="Buscar...">

        <i class="fa-solid fa-magnifying-glass text-secondary position-absolute" 
           style="right: 10px; top: 50%; transform: translateY(-50%); opacity: .7;"></i>
    </div>
</div>

    
      
      
      
      
          
      
      </div>




    <div class="table-responsive rounded-3 shadow-sm">
       <table class="table table-hover align-middle mb-0 text-nowrap shadow-sm text-uppercase" id="tabla_res">
          <thead class="text-white" style="background: #212529;">
            <tr>
              <th scope="col">N°</th>
              
              <th scope="col">MES</th>
              <th scope="col">FC ENTREGA</th>
              <th scope="col">RESIDUO</th>
              <th scope="col">AGENCIA</th>
              <th scope="col">CLASIF. RHOMB</th>
              <th scope="col">GESTORA</th>
              <th scope="col">RESPONSABLE</th>
         
             
              <th scope="col">OPCIONES</th>
            </tr>
          </thead>
          <tbody id="content_table" class="small"></tbody>
        </table>

          
          <div class="col-12" id="res_busqueda">

          </div>

       </div>
    </div>

  </div>

     

</div>



<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">
       <div class="modal-header  text-white" id="titulo_modal" style="background:#040D29; color:#fff;">

       
      </div>

      <div class="modal-body bg-light" id="form_modal"></div>

     <div class="modal-footer border-top " id="form_modal_footer" style="background:#040D29;">

      </div>

    </div>
  </div>
</div>

<script src="../JS/res.no.peligrosos.js"></script>
