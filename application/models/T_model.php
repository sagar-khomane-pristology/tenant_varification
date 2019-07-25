<?php
class T_model extends CI_Model {

    var $ch;
    var $url = "";

    public function __construct()
    {
        parent::__construct();
        //$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
    }


	function getMasterData(){
		$newurl = $this->url."get_master";
        //die($newurl);
		$data = array();			
		//$data['log_username'] = $_POST['log_username'];
		//$data['log_password'] = $_POST['log_password'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",array(), $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	}
	

	
}
