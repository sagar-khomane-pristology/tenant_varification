<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Tenant extends CI_Controller {

	public function __construct()
    {
        parent::__construct();
        $this->load->model("T_model");
    }
	
	public function index()
	{
           $data['title'] = "New Request | Tenant Verification"; 
           $data['main'] ="New Request";
           $this->load->view('vNewRequest',$data);
          
	}
	
	public function newRequest()
	{
           $data['title'] = "New Request | Tenant Verification"; 
           $data['main'] ="New Request";
           $this->load->view('vNewRequest',$data);
          
	}
	
	public function viewed()
	{
           $data['title'] = "Under Review | Tenant Verification"; 
           $data['main'] ="Under Review";
           $this->load->view('vViewed',$data);
          
	}
	
	public function verified()
	{
           $data['title'] = "Verified | Tenant Verification"; 
           $data['main'] ="Verified";
           $this->load->view('vVerified',$data);
          
	}
	
	public function unVerified()
	{
           $data['title'] = "UnVerified | Tenant Verification"; 
           $data['main'] ="UnVerified";
           $this->load->view('vUnverified',$data);
          
	}
	public function viewdetail()
	{
           $data['title'] = "View Details | Tenant Verification"; 
           $data['main'] ="View Details";
           $this->load->view('vIndetail',$data);
          
	}
	
	
}
