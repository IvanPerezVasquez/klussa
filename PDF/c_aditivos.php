<?php
require('fpdf/fpdf.php');

if (!isset($_POST['cp'])) die('Sin datos');

$data = json_decode($_POST['cp'], true);
if (!is_array($data) || count($data) === 0) die('Datos inválidos');

/* ===== ORDENAR POR FECHA ===== */
usort($data, function($a, $b) {
    return strtotime($a['fr']) <=> strtotime($b['fr']);
});

/* ===== AGRUPAR POR MES ===== */
$mensual = [];
foreach ($data as $r) {
    $mes = $r['mes'];

    if (!isset($mensual[$mes])) {
        $mensual[$mes] = [
            'mes' => $mes,
            'kg'  => 0,
            'lt'  => 0
        ];
    }

    $mensual[$mes]['kg'] += (float)$r['kg'];
    $mensual[$mes]['lt'] += (float)$r['lt'];
}
$mensual = array_values($mensual);

/* ===== AGRUPAR POR PROYECTO ===== */
$proyectos = [];
foreach ($data as $r) {
    $pro = $r['pro'];
    if (!isset($proyectos[$pro])) {
        $proyectos[$pro] = ['kg'=>0,'lt'=>0];
    }
    $proyectos[$pro]['kg'] += (float)$r['kg'];
    $proyectos[$pro]['lt'] += (float)$r['lt'];
}

/* ================= FUNCIONES ================= */

function headerGeneral($pdf){
    $pdf->SetFont('Arial','B',14);
    $pdf->SetFillColor(230,240,255);

    $pdf->Cell(40,20,'',1,0,'C',true);
    $pdf->Cell(110,20,utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),1,0,'C',true);
    $pdf->Cell(40,20,'',1,1,'C',true);

    if (file_exists('../IMAGE/kluane.png')) {
        $pdf->Image('../IMAGE/kluane.png',15,12,22);
    }

    $pdf->SetFont('Arial','I',9);
    $pdf->SetXY(160,15);
    $pdf->Cell(35,5,'EC-HSE-F-53',0,1,'C');
    $pdf->SetXY(160,20);
    $pdf->Cell(35,5,'REV-4 ENE-2024',0,1,'C');
}

function section($pdf,$title){
    $pdf->Ln(4);
    $pdf->SetFillColor(33,37,41);
    $pdf->SetTextColor(255);
    $pdf->SetFont('Arial','B',12);
    $pdf->Cell(0,8,utf8_decode("  ".$title),1,1,'L',true);
    $pdf->SetTextColor(0);
    $pdf->Ln(2);
}

function drawChartMensual($pdf,$data,$x=20,$y=70,$w=170,$h=60){
    $max = max(array_column($data,'kg'));
    if ($max <= 0) $max = 1;

    $gap = 4;
    $barW = ($w - (count($data)+1)*$gap) / count($data);

    $pdf->Line($x,$y,$x,$y+$h);
    $pdf->Line($x,$y+$h,$x+$w,$y+$h);

    foreach($data as $i=>$r){
        $bh = ($r['kg']/$max)*($h-10);
        $bx = $x + $gap + $i*($barW+$gap);
        $by = $y+$h-$bh;

        $pdf->SetFillColor(52,152,219);
        $pdf->Rect($bx,$by,$barW,$bh,'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($bx,$y+$h+2);
        $pdf->MultiCell($barW,4,$r['mes'],0,'C');
    }

    $pdf->SetFont('Arial','B',10);
    $pdf->SetXY($x,$y-8);
    $pdf->Cell($w,6,'Consumo mensual total (KG)',0,0,'C');
}

function tablaMensual($pdf,$data){
    $pdf->SetFont('Arial','B',10);
    $pdf->Cell(60,8,'Mes',1);
    $pdf->Cell(60,8,'Total KG',1);
    $pdf->Cell(60,8,'Total LT',1,1);

    foreach($data as $r){
        $pdf->SetFont('Arial','',10);
        $pdf->Cell(60,8,$r['mes'],1);
        $pdf->Cell(60,8,number_format($r['kg'],2),1,0,'C');
        $pdf->Cell(60,8,number_format($r['lt'],2),1,1,'C');
    }
}

/* ================= PDF ================= */

$pdf = new FPDF('P','mm','A4');
$pdf->SetAutoPageBreak(true,25);

/* ===== RESUMEN ===== */
$pdf->AddPage();
headerGeneral($pdf);

$pdf->Ln(25);
$pdf->SetFont('Arial','B',12);
$pdf->Cell(0,8,utf8_decode('CONTROL DE CONSUMO DE ADITIVOS'),0,1,'L');

drawChartMensual($pdf,$mensual);
$pdf->Ln(75);

section($pdf,'RESUMEN MENSUAL');
tablaMensual($pdf,$mensual);

/* ===== DETALLE ===== */
foreach($data as $r){
    $pdf->AddPage();
    headerGeneral($pdf);

    section($pdf,'DETALLE DE REGISTRO');
    $pdf->SetFont('Arial','',10);

    $pdf->Cell(60,8,'Fecha:',0);      $pdf->Cell(0,8,$r['fr'],0,1);
    $pdf->Cell(60,8,'Mes:',0);        $pdf->Cell(0,8,$r['mes'],0,1);
    $pdf->Cell(60,8,'Maquina:',0);    $pdf->Cell(0,8,$r['mq'],0,1);
    $pdf->Cell(60,8,'Pozo:',0);       $pdf->Cell(0,8,$r['pz'],0,1);
    $pdf->Cell(60,8,'Aditivo:',0);    $pdf->Cell(0,8,$r['ad'],0,1);
    $pdf->Cell(60,8,'Consumo KG:',0); $pdf->Cell(0,8,$r['kg'],0,1);
    $pdf->Cell(60,8,'Consumo LT:',0); $pdf->Cell(0,8,$r['lt'],0,1);
    $pdf->Cell(60,8,'Proyecto:',0);   $pdf->Cell(0,8,$r['pro'],0,1);
    $pdf->Cell(60,8,'Responsable:',0);$pdf->Cell(0,8,$r['rp'],0,1);
}

/* ===== SALIDA ===== */
header('Content-Type: application/pdf');
header('Content-Disposition: inline; filename="REPORTE_CONSUMO_ADITIVOS.pdf"');
$pdf->Output('I');
exit;
