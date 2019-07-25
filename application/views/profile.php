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
        <li class="active"> <?php echo $main;?></li>
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
        <div class="col-md-12">

          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile" >
				<a href="<?php echo base_url();?>Login/changePassword" class="btn btn-primary pull-right" data-toggle="tooltip" data-placement="top" title="Change Password" ><b>Change Password</b></a>
				<a href="<?php echo base_url();?>Login/editProfile" class="btn btn-primary pull-left" data-toggle="tooltip" data-placement="top" title="Edit" ><b>Edit</b></a>
				
              <img class="profile-user-img img-responsive img-circle" src="<?php echo base_url().'assets/dist/img/user2-160x160.png';?>" alt="User profile picture" onerror="this.src='<?php echo base_url().'assets/dist/img/user2-160x160.png';?>'">

              <h3 class="profile-username text-center text-center-manually"><?php echo "admin"." "."admin";?></h3>

              <!--<p class="text-muted text-center">Pqr tyy</p>-->

			<div class="col-md-4">
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>First Name</b> <span class="pull-right"><?php echo "admin";?></span>
                </li>
                <li class="list-group-item">
                  <b>Email</b> <span class="pull-right"><?php echo "admin@gmail.com";?></span>
                </li>
                
              </ul>
              </div>
			  
			  <div class="col-md-4">
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Middle Name</b> <span class="pull-right"><?php echo "admin";?></span>
                </li>
                 <li class="list-group-item">
                  <b>&nbsp;</b>  
                </li>
                
              </ul>
              </div>
			  
			  <div class="col-md-4">
              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Last Name</b> <span class="pull-right"><?php echo "admin";?></span>
                </li>
                <li class="list-group-item">
                  <b>&nbsp;</b>  
                </li>
                
              </ul>
              </div>

              <!--<a href="#" class="btn btn-primary btn-block"><b>Follow</b></a>-->
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->

          <!-- About Me Box -->
          <!--<div class="box box-primary">
            <div class="box-header with-border">
              <h3 class="box-title">About Me</h3>
            </div>
             
            <div class="box-body">
              <strong><i class="fa fa-book margin-r-5"></i> Education</strong>

              <p class="text-muted">
                B.S. in Computer Science from the University of Tennessee at Knoxville
              </p>

              <hr>

              <strong><i class="fa fa-map-marker margin-r-5"></i> Location</strong>

              <p class="text-muted">Malibu, California</p>

              <hr>

              <strong><i class="fa fa-pencil margin-r-5"></i> Skills</strong>

              <p>
                <span class="label label-danger">UI Design</span>
                <span class="label label-success">Coding</span>
                <span class="label label-info">Javascript</span>
                <span class="label label-warning">PHP</span>
                <span class="label label-primary">Node.js</span>
              </p>

              <hr>

              <strong><i class="fa fa-file-text-o margin-r-5"></i> Notes</strong>

              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
            </div>
            
          </div>-->
          <!-- /.box -->
        </div>
        <!-- /.col -->
          
      </div>
      <!-- /.row -->

    </section>
    <!-- /.content -->
		 
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