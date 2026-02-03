<?php
require('fpdf/fpdf.php');

/* =====================================================
   1. RECIBIR DATA (cp)
===================================================== */
$data = isset($_POST['cp'])
    ? json_decode($_POST['cp'], true)
    : [];

if (!is_array($data) || empty($data)) {
    die('Sin datos para generar el reporte');
}

/* =====================================================
   2. AGRUPAR CONSUMO DE AGUA (GALONES)
===================================================== */
$consumo_mes = [];
$consumo_maquina = [];
$consumo_pozo = [];

foreach ($data as $row) {

    $gal = floatval($row['gal']);

    // POR MES
    $consumo_mes[$row['mes']] =
        ($consumo_mes[$row['mes']] ?? 0) + $gal;

    // POR MAQUINA
    $consumo_maquina[$row['maquina']] =
        ($consumo_maquina[$row['maquina']] ?? 0) + $gal;

    // POR POZO
    $consumo_pozo[$row['pozo']] =
        ($consumo_pozo[$row['pozo']] ?? 0) + $gal;
}

/* =====================================================
   3. CLASE PDF (HEADER INSTITUCIONAL)
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

        // Título principal
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
        $this->SetFillColor(0,112,192); // Azul agua
        $this->SetTextColor(255,255,255);
        $this->SetFont('Arial','B',11);
        $this->SetXY(35,22);
        $this->Cell(
            220,8,
            utf8_decode('CONTROL DE CONSUMO DE AGUA'),
            1,1,'C',
            true
        );

        $this->Ln(6);
        $this->SetTextColor(0,0,0);
    }
}

/* =====================================================
   4. FUNCIÓN GRÁFICA DE BARRAS
===================================================== */
function graficaBarras($pdf, $data)
{
    if (empty($data)) return;

    $x0 = 30;
    $y0 = 170;
    $alturaMax = 80;
    $anchoBarra = 14;
    $espacio = 10;

    $maxValor = max($data);
    if ($maxValor <= 0) return;

    // Ejes
    $pdf->Line($x0, $y0 - $alturaMax, $x0, $y0);
    $pdf->Line($x0, $y0, $x0 + 230, $y0);

    $x = $x0 + 10;

    foreach ($data as $label => $valor) {

        $h = ($valor / $maxValor) * $alturaMax;

        // Barra
        $pdf->SetFillColor(0,112,192);
        $pdf->Rect($x, $y0 - $h, $anchoBarra, $h, 'F');

        // Valor
        $pdf->SetFont('Arial','',7);
        $pdf->SetXY($x - 6, $y0 - $h - 6);
        $pdf->Cell(
            $anchoBarra + 12,
            4,
            number_format($valor,2).' gl',
            0,0,'C'
        );

        // Etiqueta
        $pdf->SetXY($x - 12, $y0 + 2);
        $pdf->MultiCell(
            $anchoBarra + 24,
            4,
            utf8_decode($label),
            0,'C'
        );

        $x += $anchoBarra + $espacio;
    }
}

/* =====================================================
   5. GENERAR PDF
===================================================== */
$pdf = new PDF('L','mm','A4');

/* ====== GRÁFICA POR MES ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(
    0,10,
    utf8_decode('Consumo de Agua por Mes (Galones)'),
    0,1,'C'
);
graficaBarras($pdf, $consumo_mes);

/* ====== GRÁFICA POR MAQUINA ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(
    0,10,
    utf8_decode('Consumo de Agua por Máquina (Galones)'),
    0,1,'C'
);
graficaBarras($pdf, $consumo_maquina);

/* ====== GRÁFICA POR POZO ====== */
$pdf->AddPage();
$pdf->SetFont('Arial','B',12);
$pdf->Cell(
    0,10,
    utf8_decode('Consumo de Agua por Pozo (Galones)'),
    0,1,'C'
);
graficaBarras($pdf, $consumo_pozo);

/* =====================================================
   6. SALIDA
===================================================== */
$pdf->Output('I','Reporte_Consumo_Agua.pdf');
