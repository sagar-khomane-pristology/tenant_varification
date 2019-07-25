<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Dashboard extends CI_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model("T_model");
    }
	
	function index()
	{
           $data['title'] = "Dashboard | Tenant Verification"; 
           $data['main'] ="Dashboard";
           $this->load->view('dashboard',$data);
          
	}
}
