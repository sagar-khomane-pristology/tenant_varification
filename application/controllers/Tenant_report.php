<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Tenant_report extends CI_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model("T_model");
    }
	
	public function index()
	{
           $data['title'] = "Report | Tenant Verification"; 
           $data['main'] ="Report";
           $this->load->view('vReport',$data);
          
	}
	
	public function report()
	{
           $data['title'] = "Report | Tenant Verification"; 
           $data['main'] ="Report";
           $this->load->view('vReport',$data);  
	}
	
	
	
	
}
