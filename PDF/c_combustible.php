<?php
require('fpdf/fpdf.php');

/* =====================================================
   1. RECIBIR DATA
===================================================== */
$data = isset($_POST['cp'])
    ? json_decode($_POST['cp'], true)
    : [];

if (!is_array($data) || empty($data)) {
    die('Sin datos para generar el reporte');
}

/* =====================================================
   2. AGRUPAR CONSUMO POR MES (GALONES)
===================================================== */
$consumo_mes = [];

foreach ($data as $row) {
    $mes = $row['mes'];
    $gal = floatval($row['gl']);

    $consumo_mes[$mes] = ($consumo_mes[$mes] ?? 0) + $gal;
}

/* =====================================================
   3. CLASE PDF
===================================================== */
class PDF extends FPDF
{
    function Header()
    {
        // Logo
        $this->Image(
            'https://kluane.itdospuntocero.net/PTH/IMG/logoKDE.png',
            10,8,22
        );

        // Título
        $this->SetFont('Arial','B',14);
        $this->SetXY(35,10);
        $this->Cell(
            220,10,
            utf8_decode('BITÁCORA DE GESTIÓN AMBIENTAL'),
            1,0,'C'
        );

        // Código documento
        $this->SetFont('Arial','B',9);
        $this->SetXY(260,10);
        $this->MultiCell(
            30,5,
            "EC-HSE-F-53\nREV-4\nENE-2024",
            1,'C'
        );

        // Subtítulo
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',11);
        $this->SetXY(35,20);
        $this->Cell(
            220,8,
            utf8_decode('CONTROL DE CONSUMO DE COMBUSTIBLE'),
            1,1,'C',true
        );

        $this->Ln(3);
        $this->SetTextColor(0,0,0);
    }

    function TableHeader()
    {
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',8);

        $cols = [
            'N°'=>8,
            'FECHA'=>18,
            'MES'=>18,
            'VEHÍCULO'=>40,
            'SERIE'=>28,
            'COMBUSTIBLE'=>28,
            'GAL'=>18,
            'LITROS'=>20,
            'RHOMB'=>50,
            'PROYECTO'=>30
        ];

        foreach ($cols as $txt=>$w) {
            $this->Cell($w,7,utf8_decode($txt),1,0,'C',true);
        }
        $this->Ln();
        $this->SetTextColor(0,0,0);
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA (GALONES POR MES)
===================================================== */
function graficaBarras($pdf, $data)
{
    $x0 = 30;
    $y0 = 160;
    $alturaMax = 80;
    $anchoBarra = 18;
    $espacio = 12;

    if (empty($data)) return;

    $maxValor = max($data);
    if ($maxValor <= 0) return;

    // Ejes
    $pdf->Line($x0, $y0 - $alturaMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 230, $y0);

    $x = $x0 + 10;

    foreach ($data as $label => $valor) {
        $h = ($valor / $maxValor) * $alturaMax;

        $pdf->SetFillColor(0,32,96);
        $pdf->Rect($x, $y0 - $h, $anchoBarra, $h, 'F');

        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($x - 5, $y0 - $h - 6);
        $pdf->Cell($anchoBarra + 10,5,number_format($valor,2),0,0,'C');

        $pdf->SetXY($x - 10, $y0 + 2);
        $pdf->Cell($anchoBarra + 20,5,utf8_decode($label),0,0,'C');

        $x += $anchoBarra + $espacio;
    }
}

/* =====================================================
   5. GENERAR PDF
===================================================== */
$pdf = new PDF('L','mm','A4');
$pdf->AddPage();
$pdf->SetFont('Arial','',8);

$pdf->TableHeader();

$i = 1;
$total_gal = 0;
$total_lt  = 0;

foreach ($data as $r) {
    $total_gal += floatval($r['gl']);
    $total_lt  += floatval($r['li']);

    $pdf->Cell(8,7,$i++,1,0,'C');
    $pdf->Cell(18,7,$r['fc'],1,0,'C');
    $pdf->Cell(18,7,$r['mes'],1,0,'C');
    $pdf->Cell(40,7,utf8_decode($r['vehiculo']),1,0,'C');
    $pdf->Cell(28,7,$r['serie'],1,0,'C');
    $pdf->Cell(28,7,utf8_decode($r['com']),1,0,'C');
    $pdf->Cell(18,7,number_format($r['gl'],2),1,0,'R');
    $pdf->Cell(20,7,number_format($r['li'],2),1,0,'R');
    $pdf->Cell(50,7,utf8_decode($r['clf']),1,0,'C');
    $pdf->Cell(30,7,utf8_decode($r['ag']),1,1,'C');

    if ($pdf->GetY() > 180) {
        $pdf->AddPage();
        $pdf->TableHeader();
    }
}

/* ===== TOTALES ===== */
$pdf->SetFont('Arial','B',8);
$pdf->Cell(140,8,'TOTAL',1,0,'C');
$pdf->Cell(18,8,number_format($total_gal,2),1,0,'R');
$pdf->Cell(20,8,number_format($total_lt,2),1,1,'R');


/* =====================================================
   6. PÁGINA DE GRÁFICA
===================================================== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(
    0,10,
    utf8_decode('Gráfica de Consumo de Combustible por Mes (Galones)'),
    0,1,'C'
);

graficaBarras($pdf, $consumo_mes);

/* =====================================================
   7. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Combustible.pdf');
