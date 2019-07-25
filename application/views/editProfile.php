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
		if($this->session->flashdata('saveAttendanceMessage'))
		{
			echo "<script>alert('".$this->session->flashdata('saveAttendanceMessage')."');</script>"; 
		}	
	?>

   <!-- Main content -->
        <section class="content">
			  <div class="row">
				<div class="col-lg-12">
				<div class="box">
				  <form role="form" action="<?php echo base_url();?>/Login/updateProfile" method="POST" enctype="multipart/form-data">
					 <div class="box-body">
					  <div class="row">
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">First Name</label>
							  <input type="text" id="fname" name="fname" class="form-control" value="<?php  echo "admin";?>" placeholder="First name">
							</div>
						</div>
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">middle Name</label>
							  <input type="text" id="mname" name="mname" class="form-control" value="<?php  echo "admin";?>" placeholder="Middle name">
							</div>
						</div>
						
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">Last Name</label>
							  <input type="text" id="lname" name="lname" class="form-control" value="<?php  echo "admin";?>" placeholder="Last name">
							</div>
						</div>
						
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">Email</label>
							  <input type="text" id="v" name="email" class="form-control" value="<?php  echo "admin";?>" placeholder="Email">
							</div>
						</div>
						
						<div class="col-xm-12 col-sm-12 col-md-4 col-lg-4">
							<div class="form-group">
							  <label for="exampleInputtext1">Profile Picture</label>
							  <input type="file" id="photo" name="photo" class="form-control" placeholder="">
							</div>
						</div>
						
					  </div>
					  
					  <div class="row text-center">
						<button type="submit" class="btn btn-success text-center" id="btnSubmit" style="margin-top:0px">Submit</button>
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
    $("#parent-view-result").removeClass('active');
    $("#teacher-attendance").addClass('active');
});

 
</script>



</body>
</html>