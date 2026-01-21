<?php
require('fpdf/fpdf.php');

if(isset($_POST['cp'])){
    $cp = json_decode($_POST['cp'], true);

    $pdf = new FPDF('P','mm','A4');
    $pdf->AddPage();
    $pdf->SetAutoPageBreak(true, 25);

    // --- Encabezado tipo tabla (NO TOCAR) ---
    $y = 10; 
    $h = 20; 

    $pdf->SetFont('Arial','B',14);
    $pdf->SetFillColor(230,240,255);
    $pdf->SetDrawColor(180,180,180);

    $pdf->Cell(40, $h, '', 1, 0, 'C', true); 
    $pdf->Cell(110, $h, utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'), 1, 0, 'C', true);
    $pdf->Cell(40, $h, '', 1, 1, 'C', true);

    if(file_exists('../IMAGE/kluane.png')){
        $pdf->Image('../IMAGE/kluane.png', 15, $y+2, 22);
    }

    $pdf->SetFont('Arial','I',10);
    $pdf->SetXY(160, $y+5);
    $pdf->Cell(35,5, utf8_decode('EC-HSE-F-53'),0,1,'C');
    $pdf->SetXY(160, $y+11);
     $pdf->Cell(35,5, utf8_decode('REV-4 ENE-24'),0,1,'C');

    // --- SECCIÓN PRINCIPAL ---
    $pdf->Ln(7);
    $pdf->SetFillColor(33,37,41);
    $pdf->SetTextColor(255,255,255);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(0,8, utf8_decode('BITÁCORA DE CONTROL RESIDUOS PELIGROSOS Y/O ESPECIALES'),0,1,'L',true);
    $pdf->Ln(2);

    $pdf->SetTextColor(0,0,0);
    $pdf->SetFont('Arial','',11);

    // --- FUNCIÓN FIELD (sin borde, moderna) ---
    function field($pdf, $label, $value, $lineHeight=7){
        $pdf->SetFont('Arial','B',10);
        $pdf->SetTextColor(0,51,102);
        $pdf->Cell(45,$lineHeight,utf8_decode($label).':',0,0,'L');
        $pdf->SetFont('Arial','',10);
        $pdf->SetTextColor(0,0,0);
        $pdf->MultiCell(0,$lineHeight,utf8_decode($value ?? ''),0,'L');
        $pdf->Ln(1);
    }

    // --- FUNCIÓN PARA TITULARES EN RECUADRO ---
    function sectionTitle($pdf, $title){
        $pdf->Ln(2);
        $pdf->SetFillColor(220,235,255);
        $pdf->SetDrawColor(180,200,230);
        $pdf->SetFont('Arial','B',11);
        $pdf->SetTextColor(0,51,102);
        $pdf->Cell(0,8,utf8_decode("  ".$title),1,1,'L',true);
        $pdf->Ln(3);
        $pdf->SetTextColor(0,0,0);
    }

    // --- BLOQUE: Información general ---
    sectionTitle($pdf,'INFORMACIÓN GENERAL');
    field($pdf,'Mes',$cp['mes_res']);
    field($pdf,'Fecha de entrega',$cp['fc_disp']);
    field($pdf,'Agencia',$cp['proyecto']);
    field($pdf,'Ubicación',$cp['ubicacion']);

    // --- BLOQUE: Cantidades ---
    sectionTitle($pdf,'CANTIDADES REGISTRADAS');
    field($pdf,'Cantidad (ton)',$cp['ct_tn']);
    field($pdf,'Cantidad (kg)',$cp['ct_kg']);
    field($pdf,'Cantidad (gal)',$cp['ct_gl']);
    field($pdf,'Cantidad (L)',$cp['ct_lit']);

    // --- BLOQUE: Gestión y responsables ---
    sectionTitle($pdf,'GESTIÓN Y RESPONSABLES');
    field($pdf,'Gestora',$cp['gestor_res']);
    field($pdf,'Manifiesto',$cp['mnft']);
    field($pdf,'Responsable',$cp['resp_des']);
    field($pdf,'Máquina',$cp['serie_maquina']);

    // --- BLOQUE: Código y descripción del residuo ---
    sectionTitle($pdf,'CÓDIGO Y DESCRIPCIÓN DEL RESIDUO');
    $pdf->SetFont('Arial','',10);
    $pdf->MultiCell(0,4,utf8_decode(
        "Código: ".($cp['code_res'] ?? '')."\n".
        "Descripción: ".($cp['descrip_residuo'] ?? '')
    ),0,'L');
    $pdf->Ln(2);

    // --- BLOQUE: Descripción disposición ---
    sectionTitle($pdf,'DESCRIPCIÓN DE LA DISPOSICIÓN FINAL');
    $pdf->SetFont('Arial','',10);
    $pdf->MultiCell(0,4,utf8_decode($cp['des_des'] ?? ''),0,'L');
    $pdf->Ln(5);

    // --- BLOQUE: Firma ---
    sectionTitle($pdf,'FIRMA DEL RESPONSABLE');
    $pdf->Ln(10);
    $pdf->SetFont('Arial','',11);
    $pdf->Cell(80,0,'','T',0);
    $pdf->Ln(5);
    $pdf->Cell(80,5,utf8_decode($cp['resp_des'] ?? ''),0,0);
    $pdf->Ln(5);
    $pdf->Cell(80,5,utf8_decode($cp['cargo'] ?? ''),0,0);

    // --- Salida PDF ---
    header('Content-Type: application/pdf');
    header('Content-Disposition: inline; filename="detalle_modal.pdf"');
    $pdf->Output('I');
    exit;
}
?>
