<!DOCTYPE html>
<html lang="">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Tenant Verification | Login</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport" />
  <link rel="shortcut icon" type="image/x-icon" href="<?php echo base_url()?>assets/img/favicon.png" />
  <!-- Bootstrap 3.3.7 -->
<link rel="stylesheet" href="<?php echo base_url();?>assets/bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="<?php echo base_url();?>assets/bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="<?php echo base_url();?>assets/bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="<?php echo base_url();?>assets/dist/css/AdminLTE.min.css">
  <!-- iCheck -->
  <link rel="stylesheet" href="<?php echo base_url();?>assets/plugins/iCheck/square/blue.css">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body class="hold-transition login-page" style="overflow-y: hidden;">
<div class="login-box">
<!--  <div class="login-logo">
    <a class="login-title"><b>SCHOOL MANAGEMENT SYSTEM</b></a>
  </div>-->
  <!-- /.login-logo -->
   <input type="hidden" id="login_url" value="<?php echo $this->config->item('login_url'); ?>" name ="login_url">
  <input type="hidden" id="service_url" value="<?php echo $this->config->item('service_url'); ?>" name ="service_url">
   
  
	<div class="login-box-body">
		<p><center>Sign in with </center></p>
		<h3 class="login-heading"><center><b>Tenant Verification</b></center></h3>
		<?php // Get Flash data on view 
			if($this->session->flashdata('loginInvalidCredential'))
			{?>
				<span class="text-danger" id="invalidPassUsername"><?php echo $this->session->flashdata('loginInvalidCredential');?></span> 
			<?php }	
			?>
		<form id="login_form" name="login_form" action="<?php echo base_url();?>Login/getLoginOtp" method="post">
		  <div class="form-group has-feedback">
			<input type="text" name="unumber" id="unumber" class="form-control" maxlength="10" placeholder="username" required >
			<span class="glyphicon glyphicon-user form-control-feedback"></span>
			<span id="newpassmsg"></span>
		  </div>
		  <div class="form-group has-feedback">
			<input type="password" name="sl_user_pwd" id="sl_user_pwd" class="form-control" placeholder="Password" required>
			<span class="glyphicon glyphicon-lock form-control-feedback"></span>
		  </div>
		  <div class="row">
			<div class="col-xs-12">
			 <!-- <button type="submit" onclick="validateLoginForm()" class="btn btn-primary btn-block btn-flat">Sign In</button>-->
			  <a href="<?php echo base_url();?>Dashboard" class="btn btn-primary btn-block btn-flat">Sign In</a>
			</div>
		  </div>
		  <div class="social-auth-links text-center">
		  <a href="javascript:void(0);" onclick="ForgotPassword()">Forgot Password? Request Now</a>
		  </div>
		</form>





    <!--<form action="<?php echo base_url();?>Login/checkOtpLogin" method="post">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
			  <div class="form-group has-feedback">
				  <input type="text" name="unumber" id="unumber" class="form-control" placeholder="Enter mobile number" value="" required="">
				<span class="glyphicon glyphicon-envelope form-control-feedback"></span>
				<span id="validUnumber" style="color:red"></span>
			  </div>
		    </div>
		  </div>
	    <div class="row">
           <div class="col-lg-8 col-md-8 col-sm-6 col-xs-6">
			  <div class="form-group has-feedback">
				<input type="text" name = "otp" id = "otp" class="form-control" placeholder="OTP" required>
				<span class="glyphicon glyphicon-lock form-control-feedback"></span>
			  </div>
			</div>
			<div class="col-lg-4 col-md-4 col-sm-6 col-xs-6">
				<button type="button" onclick="getLoginOtp()" class="btn btn-info otp-button">Get OTP</button>
			</div>
	    </div>
	  <div class="row">
		<div class="col-xs-12">
		  <button type="submit" class="btn btn-primary btn-block btn-flat">Sign In</button>
		</div>
	  </div>
    </form>-->

<!--    <div class="social-auth-links text-center">
      <p>- OR -</p>
      <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
        Facebook</a>
      <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
        Google+</a>
    </div>-->
    <!-- /.social-auth-links -->

<!--    <a href="#">I forgot my password</a><br>
    <a href="register.html" class="text-center">Register a new membership</a>-->

  </div>
  <!-- /.login-box-body -->
</div>
<!-- /.login-box -->

<!-- jQuery 3 -->
<script src="<?php echo base_url();?>assets/bower_components/jquery/dist/jquery.min.js"></script>
<!-- Bootstrap 3.3.7 -->
<script src="<?php echo base_url();?>assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

<script src="<?php echo base_url();?>assets/dist/js/bootstrapvalidator.js"></script>
<!-- iCheck -->
<script src="<?php echo base_url();?>assets/plugins/iCheck/icheck.min.js"></script>
<script src="<?php echo base_url();?>assets/js/script.js"></script>
<script>
  $(function () {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass: 'iradio_square-blue',
      increaseArea: '20%' /* optional */
    });
  });
  
  setTimeout(function(){ $('#invalidPassUsername').html(''); }, 1500);
</script>

 <?php
		if($this->session->flashdata('updateMessage'))
		{
			echo "<script>alert('".$this->session->flashdata('updateMessage')."');</script>"; 
		}	
	?>
</body>
</html>
