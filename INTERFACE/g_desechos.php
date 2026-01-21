<div class="container contenido-op" style="margin-top: 100px;">

  <div class="card shadow-lg border-0 rounded-4 overflow-hidden">

    <!-- Encabezado -->
    <div class="card-header bg-gradient text-white"
         style="background: linear-gradient(90deg, #007bff, #0056b3);">
      <h5 class="mb-0 fw-bold">
        <i class="fa-solid fa-recycle me-2"></i>
        GESTION  DE DESECHOS  PELIGROSOS / NO PELIGROSOS
      </h5>
    </div>

    <!-- Cuerpo -->
    <div class="card-body bg-light mt-3 mb-4 rounded-4">

      <!-- Botones -->
      <div class="text-end mb-3">

        <button id="btn_export_excel"
                type="button"
                class="btn btn-success px-4 shadow-sm">
          <i class="fa-solid fa-file-excel"></i> Excel
        </button>

    

      </div>

      <!-- Mini Cards -->
      <div class="row g-4" id="lista_residuos">
        <!-- contenido dinámico -->
      </div>

    </div>

  </div>

</div>

<!-- Modal -->
<div class="modal fade" id="modal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content border-0 shadow-lg rounded-4">

      <div class="modal-header text-white"
           id="titulo_modal"
           style="background:#040D29; color:#fff;">
      </div>

      <div class="modal-body bg-light" id="form_modal"></div>

      <div class="modal-footer border-top"
           id="form_modal_footer"
           style="background:#040D29;">
      </div>

    </div>
  </div>
</div>

<script src="../JS/g.desechos.fn.js"></script>
