<?php
defined('BASEPATH') OR exit('No direct script access allowed');
require_once dirname(__FILE__) . '/tcpdf/tcpdf.php';
class MYPDF extends TCPDF {

    //Page header
    public function Header() {
        /* // Logo
        $image_file = K_PATH_IMAGES.'header.jpg';
        $this->Image($image_file, 0, 5, 210, '', 'JPG', '', 'N', false, 300, '', false, false, 0, false, false, false);
        //Set font
        $this->MultiCell(0, 15, 'ORGNISATION SMART TMS', 0, false, 'C', 0, '', 0, true, 'M', 'M'); */
		
		$this->SetFont('times', '', 14);
		//$this->Cell(0, 15, 'Nice Interactive Solutions India Pvt Ltd, Hinjewadi, Pune', 0, false, 'C', 0, '', 0, false, 'M', 'M');
		//$this->Ln(15,$this->y,200,$this->y);
		//$this->Line(0, 15, 300, 15);
		//$this->SetMargins(PDF_MARGIN_LEFT, 18, PDF_MARGIN_RIGHT);
		
		$headerData = $this->getHeaderData();
        $this->SetFont('times', '', 8);
        $this->writeHTML($headerData['string']);
		$this->SetMargins(PDF_MARGIN_LEFT, 26, PDF_MARGIN_RIGHT);
    }

    // Page footer
    public function Footer() {

		$this->SetY(-15);
        // Set font
        $this->SetFont('times', 'I', 8);
        // Page number
        //$this->Cell(0, 10, 'Page '.$this->getAliasNumPage().'/'.$this->getAliasNbPages(), 0, false, 'R', 0, '', 0, false, 'T', 'M');
        $this->Cell(0, 10, 'Powered by Smart-TMS', 0, false, 'R', 0, '', 0, false, 'T', 'M');
   
    }
}
?>