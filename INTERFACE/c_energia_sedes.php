<div class="container contenido-op" style="margin-top: 100px;">

  <div class="card shadow-lg border-0 rounded-4 overflow-hidden">

  

 <div class="card-body bg-light mt-3 mb-4 rounded-4">

          <!-- BANNER -->
      <div class="card border-0 shadow-sm rounded-4 mb-4" id="bnn_int">
              <div class="card-body text-white py-4 px-4">
                  <div class="col-md-12">
                    <h4 class="fw-semibold mb-1">
                     
                    COSUMO DE ENERGIA - SEDES
                    </h4>
              
                </div>
        </div>
  </div>





    
<div class="container-fluid mb-4">
 
    <div class="row mb-3">
        
    <!-- buscador -->
        <div class="text-end mb-3 col-lg-6 col-md-6 col-sm-12">         
          <div class="col-12">
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

    <div class="mb-3 col-lg-6 col-md-6 col-sm-12 d-flex justify-content-end gap-2">
        <button id="bnt_reg" class="btn btn-sm btn-primary"><i class="fas fa-charging-station"></i> Registar </button>
        <button id="btn_pdf_g" class="btn btn-sm btn-outline-danger"><i class="fas fa-file-pdf"></i> PDF</button>
        <button id="btn_excel" class="btn btn-sm btn-outline-success">EXCEL <i class="fas fa-file-excel"></i></button>
    </div>



    </div>


</div>
     






      <!-- Tabla -->
      <div class="table-responsive rounded-3 shadow-sm">
        
       <table class="table table-hover align-middle mb-0 text-nowrap shadow-sm text-uppercase" id="tabla_res">
          <thead class="text-white" style="background: #212529;">
            <tr>
              <th scope="col" class="px-3 py-3">N°</th>
        
               <th scope="col" class="px-3 py-3">AGENCIA</th>
       
               <th scope="col" class="px-3 py-3">MES</th>
             
              <th scope="col" class="px-3 py-3">FECHA IN</th>
              <th scope="col" class="px-3 py-3">FECHA FIN</th>
              <th scope="col" class="px-3 py-3">CONSUMO KWH</th>
              <th scope="col" class="px-3 py-3">RESPONSABLE</th>
         
              <th scope="col" class="px-3 py-3 text-center">ACCIONES</th>
            </tr>
          </thead>
          <tbody id="content_table" class="small table-light text-center"></tbody>
        </table>
        <div class="col-12" id="res_busqueda">

          </div>


      </div>

    </div>

  </div>
</div>

<!-- Modal  multifuncional-->
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

<script src="../JS/c.en.sedes.fn.js"></script>
