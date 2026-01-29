<div class="container contenido-op" style="margin-top: 100px;">

  <div class="card shadow-lg border-0 rounded-4 overflow-hidden">



<!-- Encabezado -->
    <div class="card-body bg-light mt-3 mb-4 rounded-4">

          <!-- BANNER -->
      <div class="card border-0 shadow-sm rounded-4 mb-4" id="bnn_int">
              <div class="card-body text-white py-4 px-4">
                  <div class="col-md-12">
                    <h4 class="fw-semibold mb-1">
                   CONSUMO DE AGUA SEDES
                    </h4>
              
                </div>
        </div>
  </div>


   <!-- FILTROS + ACCIONES -->
      <div class="container-fluid mb-2">
        <div class="row align-items-center">

          <!-- Filtros -->
          <div class="col-lg-8 col-md-6 col-12 mb-2">
            <div class="d-flex flex-wrap align-items-center gap-2">

              <select name="FK_mes" id="cbx_fil_mes" class="form-select form-select-sm w-auto">
                <option value="">Código</option>
              </select>

             
              <select name="FK_ag" id="cbx_fil_ag" class="form-select form-select-sm w-auto">
                <option value="">Código</option>
              </select>

                <button id="btn_flt" class="btn btn-sm btn-outline-dark">
               FILTRAR <i class="fas fa-filter"></i>
              </button>

            </div>
          </div>

          <!-- Botones -->
          <div class="col-lg-4 col-md-6 col-12 mb-2">
            <div class="d-flex justify-content-lg-end justify-content-start gap-2">

              <button id="bnt_reg_res_p" class="btn btn-sm btn-primary">
               <i class="fas fa-faucet"></i> Registrar
              </button>

              <button id="btn_pdf" class="btn btn-sm btn-outline-danger">
               PDF <i class="fas fa-file-pdf"></i>
              </button>

              <button id="btn_export_excel" class="btn btn-sm btn-outline-success">
               EXCEL <i class="fas fa-file-excel"></i>
              </button>

            </div>
          </div>

        </div>
      </div>

    <!-- BUSCADOR -->
      <div class="row mb-2">
        <div class="col-lg-4 col-md-6 col-12 ms-auto">
          <div class="position-relative">
            <input type="text"
                   class="form-control form-control-sm pe-4"
                   id="buscar_residuo"
                   placeholder="Buscar...">
            <i class="fa-solid fa-magnifying-glass text-secondary position-absolute"
               style="right:10px; top:50%; transform:translateY(-50%); opacity:.7;"></i>
          </div>
        </div>
      </div>























      <!-- Tabla -->
      <div class="table-responsive rounded-3 shadow-sm">
       <table class="table table-hover align-middle mb-0 text-nowrap shadow-sm text-uppercase" id="tabla_res">
          <thead class="text-white" style="background: #212529;">
            <tr>
              <th scope="col" class="px-3 py-3">N°</th>
              <th scope="col" class="px-3 py-3">MES</th>
              <th scope="col" class="px-3 py-3">CONSUMO M</th>
              <th scope="col" class="px-3 py-3">CONSUMO L</th>
              <th scope="col" class="px-3 py-3">FC INICIO</th>
              <th scope="col" class="px-3 py-3">FC CORTE</th>
              <th scope="col" class="px-3 py-3">PROYECTO </th>
              <th scope="col" class="px-3 py-3">RESPONSABLE</th>
              <th scope="col" class="px-3 py-3 text-center">OPCIONES</th>
            </tr>
          </thead>
          <tbody id="content_table" class="small table-light"></tbody>
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

<script src="../JS/c.agua.sede.fn.js"></script>
