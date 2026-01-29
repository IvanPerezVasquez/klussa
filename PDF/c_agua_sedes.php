<?php
require('fpdf/fpdf.php');

/* =====================================================
   1. RECIBIR DATA (cp = llenar_tabla)
===================================================== */
$data = isset($_POST['cp'])
    ? json_decode($_POST['cp'], true)
    : [];

if (!is_array($data) || empty($data)) {
    die('Sin datos para generar el reporte');
}

/* =====================================================
   2. AGRUPAR CONSUMO POR MES (m³)
===================================================== */
$consumo_mes = [];

foreach ($data as $row) {
    $mes = $row['mes'];
    $m3  = floatval($row['m_cubicos']);

    $consumo_mes[$mes] = ($consumo_mes[$mes] ?? 0) + $m3;
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
            utf8_decode('CONTROL DE CONSUMO DE AGUA SEDE'),
            1,1,'C',true
        );

        $this->Ln(3);
        $this->SetTextColor(0,0,0);
    }

    function TableHeader()
    {
        $this->SetFillColor(0,32,96);
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',9);

        $cols = [
            'N°'=>10,'MES'=>30,'m³'=>20,'LITROS'=>25,
            'F. INICIO'=>32,'F. CORTE'=>32,
            'SEDE'=>45,'RESPONSABLE'=>40
        ];

        foreach ($cols as $txt=>$w) {
            $this->Cell($w,7,utf8_decode($txt),1,0,'C',true);
        }
        $this->Ln();
        $this->SetTextColor(0,0,0);
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA (FPDF PURO)
===================================================== */
function graficaBarras($pdf, $data)
{
    $x0 = 30;      // eje X
    $y0 = 160;     // base eje Y
    $alturaMax = 80;
    $anchoBarra = 20;
    $espacio = 15;

    if (empty($data)) return;

    $maxValor = max($data);
    if ($maxValor <= 0) return;

    // Ejes
    $pdf->Line($x0, $y0 - $alturaMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 230, $y0);

    $x = $x0 + 10;

    foreach ($data as $label => $valor) {
        $h = ($valor / $maxValor) * $alturaMax;

        // Barra
        $pdf->SetFillColor(0,32,96);
        $pdf->Rect($x, $y0 - $h, $anchoBarra, $h, 'F');

        // Valor
        $pdf->SetFont('Arial','',8);
        $pdf->SetXY($x - 5, $y0 - $h - 6);
        $pdf->Cell(
            $anchoBarra + 10,
            5,
            number_format($valor,2),
            0,0,'C'
        );

        // Mes
        $pdf->SetXY($x - 10, $y0 + 2);
        $pdf->Cell(
            $anchoBarra + 20,
            5,
            utf8_decode($label),
            0,0,'C'
        );

        $x += $anchoBarra + $espacio;
    }
}

/* =====================================================
   5. GENERAR PDF
===================================================== */
$pdf = new PDF('L','mm','A4');
$pdf->AddPage();
$pdf->SetFont('Arial','',9);

$pdf->TableHeader();

$i = 1;
$total_m3 = 0;
$total_lt = 0;

foreach ($data as $r) {
    $total_m3 += floatval($r['m_cubicos']);
    $total_lt += floatval($r['litros']);

    $pdf->Cell(10,7,$i++,1,0,'C');
    $pdf->Cell(30,7,$r['mes'],1,0,'C');
    $pdf->Cell(20,7,$r['m_cubicos'],1,0,'R');
    $pdf->Cell(25,7,$r['litros'],1,0,'R');
    $pdf->Cell(32,7,$r['fc_inicio'],1,0,'C');
    $pdf->Cell(32,7,$r['fc_corte'],1,0,'C');
    $pdf->Cell(45,7,utf8_decode($r['sede']),1,0,'C');
    $pdf->Cell(40,7,utf8_decode($r['usuario']),1,1,'C');

    if ($pdf->GetY() > 180) {
        $pdf->AddPage();
        $pdf->TableHeader();
    }
}

// Totales
$pdf->SetFont('Arial','B',9);
$pdf->Cell(40,8,'TOTAL',1,0,'C');
$pdf->Cell(20,8,number_format($total_m3,2),1,0,'R');
$pdf->Cell(25,8,number_format($total_lt,2),1,0,'R');
$pdf->Cell(149,8,'',1,1);

/* =====================================================
   6. PÁGINA DE GRÁFICA
===================================================== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(
    0,10,
    utf8_decode('Gráfica de Consumo de Agua por Mes (m³)'),
    0,1,'C'
);

graficaBarras($pdf, $consumo_mes);

/* =====================================================
   7. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Agua_Sede.pdf');
