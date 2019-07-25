<?php
class M_login extends CI_Model{
	
	var $ch;
	var $url = "";
	var $loginurl = "";
	function M_login()
	{			
		$this->loginurl = $this->config->item('login_url');	
		//$this->url = $this->config->item('service_url');
	}
	
	function getLoginOtp(){
		$newurl = $this->loginurl."login";	
        //die($newurl);
		$data = array();			
		$data['sl_user_name'] = $_POST['unumber'];
		$data['sl_user_pwd'] = $_POST['sl_user_pwd'];	
		$data['sl_imei_no'] = '1234567890';	
		$data['device_type'] = 'web';	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data);
		//die(print_r($result));
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	}
	
	function FindLoginerDeatils(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."home";	
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
	
	
	function updateProfile(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."update_loginer_profile_details";	
        //die($newurl);
		$data = array();			
		$data['fname'] = $_POST['fname'];
		$data['mname'] = $_POST['mname'];	
		$data['lname'] = $_POST['lname'];	
		$data['email'] = $_POST['email'];	
		//$data['photo'] = $_POST['photo'];	
        //die(print_r($data));
		$temp = $_FILES['photo']['tmp_name'];

        if($temp == ""){
            $data['photo'] = '';
            $result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
        }else{
            $result = $this->rest->request($newurl,"OTHER",$data, $this->session->userdata['user']['profile'][0]['sl_api_key'], "photo");  
        }
		
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	}
	
	function updatePassword(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."change_password";	
        //die($newurl);
		$data = array();			
		$data['old_password'] = $_POST['old_password'];
		$data['sl_user_pwd'] = $_POST['sl_user_pwd'];
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	}
	
	//////////////Common Function for Get division from Class/////////////////////
	function classChangeGetDivision(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_division";	
        //die($newurl);
		$data = array();
		$data['scdv_clas_id'] = $_POST['class_id'];
		//$data['log_password'] = $_POST['log_password'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	//////////////Common Function for Get Student LIst from Div/////////////////////
	function divChangeGetStudentList(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_stud_from_division";	
        //die($newurl);
		$data = array();
		$data['ssdm_div_id'] = $_POST['div_id'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	//////////////Common Function for Get Exam Type list from class and Div/////////////////////
	function divChangeGetExamType(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_exam_for_upload_marks";	
        //die($newurl);
		$data = array();
		$data['sett_class_id'] = $_POST['class_id'];	
		$data['sett_div_id'] = $_POST['div_id'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	function divChangeGetExamNameByClassDiv(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_exam_name_for_exam_timetable_classdiv";	
        //die($newurl);
		$data = array();
		$data['sett_class_id'] = $_POST['class_id'];	
		$data['sett_div_id'] = $_POST['div_id'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	//////////////Common Function for Get Subject from Class Div Id/////////////////////
	function divChangeGetSubject(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_subject";	
        //die($newurl);
		$data = array();
		$data['scsb_class_div_id'] = $_POST['division_id'];
		//$data['log_password'] = $_POST['log_password'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	//////////////Common Function for Get Timetable name from Class Div Id/////////////////////
	function divChangeGetTimetableName(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_timetable_name_from_class_div";	
        //die($newurl);
		$data = array();
		$data['sctd_class_id'] = $_POST['class_id'];
		$data['sctd_division_id'] = $_POST['division_id'];
		$data['sctd_acdemic_year'] = $_POST['academic_year'];
		$data['sctd_term'] = $_POST['timetable_term'];
		//$data['log_password'] = $_POST['log_password'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}
	
	
	
	
	
	
	
	/////////////////////////////////////////////////////////////
	
	function checkLogin(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";		
		$newurl = $this->url."do_login";	
                //die($newurl);
		$data = array();			
		$data['log_username'] = $_POST['log_username'];
		$data['log_password'] = $_POST['log_password'];	
        //die(print_r($data));
		$result = $this->rest->request($newurl,"POST",$data);
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	}
        
    function changePassword(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";		
		$newurl = $this->url."change_password";	
		$data = array();			
		$data['password'] = $_POST['new_pass'];		
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
        // die(print_r($result));
		return $result;
	} 
	
	function ForgotPassword(){	
		$newurl = $this->loginurl."forgot_password";	
		$data = array();			
		$data['sl_user_name'] = $_POST['unumber'];		
		$result = $this->rest->request($newurl,"POST",$data, '');
		$result = json_decode($result, true);		
         //die(print_r($result));
		return $result;
	}

	function getCountryStateCity(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";		
		$newurl = $this->url."get_country_state_city";
		//$data[]=array();
		$result = $this->rest->request($newurl, "POST", array(), $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);
		// die(print_r($result));
		// die(print_r($this->session->userdata("log_api_key")));
		return $result;
	    }
		
	function getState(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";		
		$newurl = $this->url."get_state";
		$data = array();
		$data['sstt_country_code']= $this->input->post('sstt_country_code');
		$result = $this->rest->request($newurl, "POST", $data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);
		return $result;
	    }
		
	function classChangeGetStudent(){
		$this->url = $this->session->userdata['user']['profile'][0]['sl_project_url']."index.php/";	
		$newurl = $this->url."get_student_from_class_div";	
		$data = array();
		$data['scad_class'] = $_POST['classId'];
		$result = $this->rest->request($newurl,"POST",$data, $this->session->userdata['user']['profile'][0]['sl_api_key']);
		$result = json_decode($result, true);		
		return $result;
	}
}
