<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Login extends CI_Controller {
	//protected $generated_otp;
	public function __construct()
    {
        parent::__construct();
        $this->load->model("M_login");
    }
	
	public function index()
	{
		error_reporting(0);
		if ($this->session->userdata['user']['profile'][0]['sl_user_name'] && $this->session->userdata['user']['profile'][0]['sl_role'] && $this->session->userdata['user']['profile'][0]['sl_api_key'] && $this->session->userdata['user']['profile'][0]['sl_user_id'] && ($this->session->userdata('is_logged_in') == 1)) {
           if($this->session->userdata['user']['profile'][0]['sl_role'] == 1) //super admin
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 2) //system admin
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 3) //acadmic admin
				{
					redirect('AcademicAdmin/CreateStaff');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 4) //supervisor
				{
					redirect('Supervisor/SViewStudentMarks/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 5) //administrator
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 6) //Student
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 7) //Parent
				{
					redirect('Parents/PViewAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 8) //Teacher
				{
					redirect('Teacher/TAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 9) //Class Teacher
				{
					redirect('Teacher/TAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 10) //Libararian
				{
					redirect('Librarian/BookMaster/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 11) //Accountant
				{
					redirect('Teacher/TviewStudent/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 12) //Principle
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 13) //Management
				{
					redirect('Management/MSchool');
				}else if($this->session->userdata['user']['profile'][0]['sl_role'] == 14) //Agent
				{
					redirect('Management/MSchool');
				}
            
        } else {
            $this->load->view('login');
        }
    }
	
	public function getLoginOtp()
    {   
        if(isset($_POST['unumber']) && isset($_POST['sl_user_pwd']))
        {
            $result = $this->M_login->getLoginOtp();
			//print_r($result['response']['data']);
			//echo $result['response']['error'];
			//echo $result['response']['data']['user'][0]['sl_user_name'];
			//echo $result['response']['data']['otps']['otp'];
			//exit;
            if($result['response']["error"]=="false")
            {
                $data=$result['response']['data'];
                // die(print_r($data));
				$this->session->set_userdata($data);
				$this->session->set_userdata('is_logged_in',0);
				//echo $result =json_encode($result);	
				$this->checkOtpLogin($_POST['unumber'],$_POST['sl_user_pwd']);
            }
            else {
				//echo $result =json_encode($result);
				//$this->load->view('login');
                //echo "<script> alert('".$result['response']['message']."'); </script>" ;
				$this->session->set_flashdata('loginInvalidCredential',$result['response']['message']);
				redirect('Login/');
            }
        }
        else {	
			 //echo $result =json_encode($result);
			// $this->load->view('login');
             //echo "<script> alert('Enter All Fields.'); </script>" ;
			$this->session->set_flashdata('loginInvalidCredential','Enter All Fields.');
			redirect('Login/');
			 
        }   
    }
	
	
	
	public function checkOtpLogin($unumber, $sl_user_pwd)
    {   
		error_reporting(0);
		$entered_mobile_no = $this->session->userdata['user']['profile'][0]['sl_user_name'];
		$genearated_otp = $this->session->userdata['otps']['otp'];

        if(isset($unumber) && isset($sl_user_pwd))
        {
            $result = $this->M_login->FindLoginerDeatils();
			$login_data=$result['response']['data'];
			$this->session->set_userdata($login_data);
			//print_r($result['response']['data']['user']);echo"<br>";echo"<br>";exit;
			//die(print_r($result['response']['data']['user']['student']['child']));
			//print_r($this->session->all_userdata());exit;
			
            /* if($genearated_otp == $_POST['otp'] && $entered_mobile_no == $_POST['unumber'])
            { */
		
				$this->session->set_userdata('is_logged_in',1);
				if($this->session->userdata['user']['profile'][0]['sl_role'] == 1) //super admin
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 2) //system admin
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 3) //acadmic admin
				{
					redirect('AcademicAdmin/CreateStaff');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 4) //supervisor
				{
					redirect('Supervisor/SViewStudentMarks/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 5) //administrator
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 6) //Student
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 7) //Parent
				{
					$this->session->set_userdata('parentStudentLoginer_Id',$this->session->userdata['user']['student']['child'][0]['scst_student_id']);
					$this->session->set_userdata('parentStudentLoginer_Name',$this->session->userdata['user']['student']['child'][0]['student_name']);
					redirect('Parents/PViewAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 8) //Teacher
				{
					redirect('Teacher/TAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 9) //Class Teacher
				{
					redirect('Teacher/TAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 10) //Libararian
				{
					redirect('Librarian/BookMaster/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 11) //Accountant
				{
					redirect('Teacher/TAttendance/');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 12) //Principle
				{
					redirect('Login/dashboard');
				}
				else if($this->session->userdata['user']['profile'][0]['sl_role'] == 13) //Management
				{
					redirect('Management/MSchool');
				}else if($this->session->userdata['user']['profile'][0]['sl_role'] == 14) //Agent
				{
					redirect('Management/MSchool');
				}
				   
                redirect('Login/');
                // die($session->log_role);
				
            /* }
            else {
				$this->load->view('login');
				echo "<script> alert('Please Enter Valid OTP'); </script>" ;
            } */
        }
        else {
             //$this->load->view('login');
             //echo "<script> alert('Enter All Fields.'); </script>" ;
			 $this->session->set_flashdata('loginInvalidCredential','Enter All Fields.');
			 redirect('Login/');
        } 
    }
	 
	///////////////////////////////////////////////////////////////////////////////////////
	
	 
	public function profile()
	{
		if(@$_SESSION['is_logged_in']<1)
		{
			redirect('Login/','refresh');
		}else{
			$data['title'] = "Profile | Tenant Verification"; 
            $data['main'] ="profile";
			$this->load->view('profile',$data);
		}
    }
	
	public function editProfile()
	{
		$data['title'] = "Edit Profile | Tenant Verification"; 
        $data['main'] ="Edit Profile";
        $this->load->view('editProfile',$data);
    }
	
	public function updateProfile()
	{
        $fname = $this->input->post('fname');
		$lname = $this->input->post('lname');
			
		if(isset($_POST['fname']) && isset($_POST['lname']))
		{
		    $user_result = $this->M_login->updateProfile();
			//print_r($user_result);exit;
		    if($user_result['response']['error']== 'false')
		    {
				$this->session->set_flashdata('updateMessage',$user_result['response']["message"]);
				$this->session->sess_destroy();
				redirect('Login/profile/');
		    }else 
			{
				$this->session->set_flashdata('updateMessage',$user_result['response']["message"]);
				redirect('Login/profile/');
		    }
		}else
		{
			$this->session->set_flashdata('updateMessage','Enter All fields.');
			redirect('Login/profile/');
		}
    }
	
	public function logout()
	{
		$this->session->sess_destroy();
        $this->load->view('login');
    }
	
	//////////Common Function for get division from class id
	public function classChangeGetDivision()
	{
		$class_id = $_POST['class_id'];
		$division_result = $this->M_login->classChangeGetDivision();
		//print_r($newdivarray);
		echo json_encode($division_result);
		//print_r($division_result);
	}
	
	//////////Common Function for get Student List from div id
	public function divChangeGetStudentList()
	{
		$div_id = $_POST['div_id'];
		$student_result = $this->M_login->divChangeGetStudentList();
		echo json_encode($student_result);
		//print_r($division_result);
	}
	
	//////////Common Function for get exam type from div and class
	public function divChangeGetExamType()
	{
		$div_id = $_POST['div_id'];
		$class_id = $_POST['class_id'];
		$student_result = $this->M_login->divChangeGetExamType();
		echo json_encode($student_result);
		//print_r($division_result);
	}
	
	//////////Common Function for get exam type from div and class
	public function divChangeGetExamNameByClassDiv()
	{
		$div_id = $_POST['div_id'];
		$class_id = $_POST['class_id'];
		$student_result = $this->M_login->divChangeGetExamNameByClassDiv();
		echo json_encode($student_result);
		//print_r($division_result);
	}
	
	
	//////////Common Function for get Subject from class_div id
	public function divChangeGetSubject()
	{
		$division_id = $_POST['division_id'];
		$subject_result = $this->M_login->divChangeGetSubject();
		//print_r($division_result['response']['data']['div']);
		echo json_encode($subject_result);
	}
	
	//////////Common Function for get Timetablr from class_div id
	public function divChangeGetTimetableName()
	{
		$class_id = $_POST['class_id'];
		$division_id = $_POST['division_id'];
		$academic_year = $_POST['academic_year'];
		$timetable_term = $_POST['timetable_term'];
		$subject_result = $this->M_login->divChangeGetTimetableName();
		//print_r($subject_result);
		echo json_encode($subject_result);
	}
	
	
	//Any File Download in codeigniter
	public function checkExternalFileExist($url)
	{
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_NOBODY, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		curl_exec($ch);
		$retCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
		curl_close($ch);

		return $retCode;
	}

	//Any File Download in codeigniter
	public function getFileName () {
		$url = $this->input->post('url');
		$fileExists = $this->checkExternalFileExist($url);
		if($fileExists == '404'){
			echo '';
		}elseif($fileExists == '202'){
			echo '';
		} else {
			echo $url;
		}	
	}
	
	//Any File Download in codeigniter
	public function downloadFile () {
		error_reporting(0);
		$url = $this->input->get('id');
		set_time_limit(0);
		$file = basename($url);
		if(!is_dir("assets/download/")) {
			mkdir("assets/download/");
		}
		$fp = fopen('assets/download/'.$file, 'w');
		$ch = curl_init($url);
		curl_setopt($ch, CURLOPT_FILE, $fp);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
		$data = curl_exec($ch);
		curl_close($ch);
		fclose($fp);
		header('Content-Description: File Transfer');
		header('Content-Type: application/octet-stream');
		header('Content-Disposition: attachment; filename='.basename($file));
		header('Content-Transfer-Encoding: binary');
		header('Expires: 0');
		header('Cache-Control: must-revalidate');
		header('Pragma: public');
		header('Content-Length: ' . filesize('assets/download/'.$file));
		ob_clean();
		flush();
		readfile('assets/download/'.$file);
		exit;
		
	}
	
	public function getState()
	{
		 $result = $this->M_login->getState();
		 echo $result = json_encode($result);
	}
	public function classChangeGetStudent()
	{
		$result = $this->M_login->classChangeGetStudent();
		echo $result = json_encode($result);
	}
	
	
	public function changePassword()
	{
		 $data['title'] = "Change Password | Tenant Verification"; 
         $data['main'] ="Change Password";
        $this->load->view('vChangePassword',$data);
    }
	
	public function updatePassword()
	{
        $old_password = $this->input->post('old_password');
		$sl_user_pwd = $this->input->post('sl_user_pwd');
			
		if(isset($_POST['old_password']) && isset($_POST['sl_user_pwd']))
		{
		    $user_result = $this->M_login->updatePassword();
			//print_r($user_result);exit;
		    if($user_result['response']['error']== 'false')
		    {
				$this->session->set_flashdata('updateMessage',$user_result['response']["message"]);
				$this->session->sess_destroy();
				redirect('Login/changePassword/');
		    }else 
			{
				$this->session->set_flashdata('updateMessage',$user_result['response']["message"]);
				redirect('Login/changePassword/');
		    }
		}else
		{
			$this->session->set_flashdata('updateMessage','Enter All fields.');
			redirect('Login/changePassword/');
		}
    }
	
	
	public function ForgotPassword()
	{
       $unumber = $this->input->post('unumber');
	   
        if(isset($_POST['unumber']))
        {
            $result = $this->M_login->ForgotPassword();
            if($result['response']["error"]=="false")
            {
				echo $result =json_encode($result);	
            }
            else {
				echo $result =json_encode($result);
		
            }
        }
        else {	
			 echo $result =json_encode($result);
			 
        }   
    }
	
	 
	
}
