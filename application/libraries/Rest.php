<?php defined('BASEPATH') or exit('No direct script access allowed');

class Rest{	
	function request($url, $method = "GET", $data = NULL,$api=0,$image=0){
		switch($method){
			case "GET" :
				$ch = curl_init($url);
				//die($url);
 				curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				if($api){
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				}else{
					curl_setopt($ch, CURLOPT_HEADER, 0);	
				}					
				curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
 				$data = curl_exec($ch);
 				curl_close($ch);
 				return $data;				
			break;
			
			case "PUT" :				
				 $fields_string = "";
				 if($data){
					 foreach($data as $key=>$value){ 
							$fields_string .= $key.'='.$value.'&'; 
					 }
				 }
				 rtrim($fields_string,'&');
				 //die($fields_string);
				 $ch = curl_init($url);
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
				 curl_setopt($ch,CURLOPT_CUSTOMREQUEST, "PUT");
				 if($api){
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				 }	
				 curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
				 $data = curl_exec($ch);
				 curl_close($ch);
				 return $data;							
			break;
			
			case "POST" :				
				$fields_string = "";
			    //die($url);
				//die(print_r($data));
				//die(print_r(sizeof($data)));

				 if (sizeof($data)>0) {
				 	foreach($data as $key=>$value){ 
						$fields_string .= $key.'='.$value.'&'; 
					}
					rtrim($fields_string,'&');
				 }
				 
				 $ch = curl_init($url);
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				 curl_setopt($ch,CURLOPT_POST, count($data));
				 curl_setopt($ch,CURLOPT_POSTFIELDS,$fields_string);
				 //die($fields_string);
				 if($api){
					 //die($api);
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				 }else{
				 	//die("Here");
					curl_setopt($ch, CURLOPT_HEADER, 0);	
				 }		
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
				 $data = curl_exec($ch);
				/* if($data = curl_exec($ch) === false)
				{
					echo 'Curl error: ' . curl_error($ch);
				}
				else
				{
					echo 'Operation completed without any errors';
				} */

				 curl_close($ch);
				 //die($data);
				 return $data;
						
			break;	
			
			case "DELETE" :
				 $ch = curl_init($url);
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				 curl_setopt($ch,CURLOPT_CUSTOMREQUEST, "DELETE");
				 if($api){
					curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				}else{
					curl_setopt($ch, CURLOPT_HEADER, 0);	
				}	
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
				 $data = curl_exec($ch);
				 curl_close($ch);
				 return $data;
			break;
			
			case "OTHER" :
				//$fields_string = "";
				
				$feilds = array();
				if($data){
					 foreach($data as $key=>$value){ 
						//$fields_string .= $key.'='.$value.'&'; 
						$feilds[$key] = $value;
					 }
				}
				
				$ch = curl_init($url);
				
				$boundary = " ---------------------" . md5(mt_rand() . microtime());
				$headers = array();
				if($image){	
				//die("image set");
							$filename = $_FILES[$image]['name'];
    						$filedata = $_FILES[$image]['tmp_name'];
    						$filesize = $_FILES[$image]['size'];
								
												
							//$fields_string .= 'image='.'@' . $_FILES['file']['tmp_name'][0]; 
							//die(print_r($_FILES));
                                                        $cfile = new CURLFile($_FILES[$image]['tmp_name'], $_FILES[$image]['type'], $_FILES[$image]['name']);
							$feilds[$image] = $cfile;// '@' . $_FILES[$image]['tmp_name'].";filename=" . $_FILES[$image]['name'];
							
				 }
				 unset($_FILES[$image]);
				//die(print_r($feilds));
                                 curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				 curl_setopt($ch,CURLOPT_POST, count($feilds));				
				
				 curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
				 //curl_setopt($ch, CURLOPT_HTTPHEADER , $headers);
				 curl_setopt($ch,CURLOPT_POSTFIELDS,$feilds);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
				 $data = curl_exec($ch);
				 curl_close($ch);
				 return $data;
				 
			break;
			
			case "MULTIIMAGE" :				
				 $feilds = array();				 
				 foreach($data as $key=>$value){ 
					//$fields_string .= $key.'='.$value.'&'; 
					$feilds[$key] = $value;
				 }				
				
				$ch = curl_init($url);
				
				$boundary = " ---------------------" . md5(mt_rand() . microtime());
				$headers = array();
				if(count($image)){
					//die(print_r($image));
					foreach($image as $img){
						if($img){                            
                            $cfile = new CURLFile($_FILES[$img]['tmp_name'], $_FILES[$img]['type'], $_FILES[$img]['name']);
							$feilds[$img] =$cfile; //'@' . $_FILES[$img]['tmp_name'].";filename=" . $_FILES[$img]['name'];
							unset($_FILES[$img]);
						}
					}		
				 }
				
				//die(print_r($feilds));
                //curl_setopt($ch, CURLOPT_URL, $url);
                //curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: $api"));
                 curl_setopt($ch, CURLOPT_HTTPHEADER, array("User-Auth: $api"));
				 curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
				 curl_setopt($ch,CURLOPT_POST, count($feilds));				
				
				 curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
				 //curl_setopt($ch, CURLOPT_HTTPHEADER , $headers);
				 curl_setopt($ch,CURLOPT_POSTFIELDS,$feilds);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
				 curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
				 $data = curl_exec($ch);
				 curl_close($ch);
                 //die($data);
				 return $data;
				 
			break;
		}	
	}	
}
?>