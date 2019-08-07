<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $title;?></title>
  <?php 
  $this->load->view('header');
  
  ?>
<!--content area start--> 
 

<div class="content-wrapper">
    <section class="content-header">
      <h1>
      <?php echo $main;?>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
        <li class="active"><?php echo $main;?></li>
      </ol>
    </section>
	
	<?php // Get Flash data on view 
		if($this->session->flashdata('updateMessage'))
		{
			echo "<script>alert('".$this->session->flashdata('updateMessage')."');</script>"; 
		}	
	?>

   <!-- Main content -->
        <section class="content">
			  <div class="row">
				<div class="col-lg-12">
				<div class="box box-warning">
				  <form role="form" id="changePass" action="<?php echo base_url();?>/Login/updatePassword" method="POST" enctype="multipart/form-data">
					 <div class="box-body">
					  <div class="row">
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">Old Password</label>
							  <input type="password" id="old_password" name="old_password" class="form-control" placeholder="Old password">
							</div>
						</div>
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">New Password</label>
							  <input type="password" id="sl_user_pwd" name="sl_user_pwd" class="form-control" placeholder="New password">
							</div>
						</div>
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">Confirm Password</label>
							  <input type="password" id="confirmPass" name="confirmPass" class="form-control" placeholder="Confirm password">
							</div>
						</div>
					  </div>
					  <div class="row text-center">
						<button type="submit" class="btn btn-success text-center" style="margin-top:0px" onclick="validateChangePass()">Submit</button>
						<a href="<?php echo base_url();?>/Login/profile" class="btn btn-danger text-center" id="btncancel">Cancel</a>
					  </div>
					</div>
			  <!-- /.row -->
			  </form>
			  </div>
			  </div>
			  </div>
		</section>
		 
</div>
            
            
 <?php $this->load->view('footer');?>
 
 <script>
$( document ).ready(function() {
//$("#dashboard").removeClass('active');
$("#change-password").addClass('active');
});

 
</script>



</body>
</html>