<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $title;?></title>
  
  <?php $this->load->view('header.php');?>
  

<!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1 id="cust_title">
		 <?php echo $main;?>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
        <li class="active" id="cust_title1"><?php echo $main;?></li>
      </ol>
    </section>
	
	<section class="content">
	<!--<div class="row">
        <div class="col-md-12">
          <div class="box box-primary">
            <form role="form" method="post">
              <div class="box-body">
			  <div class="row">
				<div class="col-xm-12 col-sm-12 col-md-3 col-lg-3">
					<div class="form-group">
					  <label for="exampleInputtext1">Admission Status</label>
					  <select class="form-control" id="admission_status" name="admission_status" onchange="getAllStudentAdmissionStatusDeatils(this.value);">
						<option value="y">Confirm</option>
						<option value="n">Cancel</option>
					  </select>
					</div>
				</div>
			  </div>
            </form>
        </div>   
     </div>
	 </div>
	 </div>-->
	<div class="row">
	<div class="col-md-12">
	<div class="box box-warning">
            <div class="box-header">
              <h3 class="box-title">All Verified Request</h3>
            </div>
            <!-- /.box-header -->
            <div class="box-body table-responsive" id="student-admission-data">
            <div class="table-responsive">
             <table id="example1" class="table table-bordered table-striped  view-student">
                <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Date Of Birth</th>
                  <th>UID</th>
                  <th>Permanent Address</th>
                  <th>Email</th>
                  <th width="20px;">View</th>
                  <th width="20px">Action</th>
                </tr>
                </thead>
                <tbody>
				<?php
				if(2>1)
				{
				if(2 > 1)
				{
				//print_r($data_result);
				$i=1;
					for($i=0;$i<5;$i++)
					{
					?>
						
					<tr>
					  <td><?php echo $i++;?> </td>
					  <td><?php echo "admin"; ?></td>
					  <td><?php echo "admin"; ?></td>
					  <td><?php echo "admin"; ?></td>
					  <td><?php echo "admin"; ?></td>
					  <td><?php echo "admin"; ?></td>
					  <td><?php echo "admin"; ?></td>
					  <td>
					  <a href="javascript:void(0);" class="btn btn-default btn-xs" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Details" ><i class="fa fa-eye" aria-hidden="true"></i></a>
					  </td>                
					  <td>
					  <a href="" onclick= "showStudentDetails('<?php echo "admin"; ?>')" class="btn btn-success btn-xs"  data-toggle="modal" >Verified</i></a>&nbsp;&nbsp;
					  <a href="" onclick= "showStudentDetails('<?php echo "admin"; ?>')" class="btn btn-danger btn-xs"  data-toggle="modal" >Un-verified</i></a>
					  </td>                
					 </tr>
					<?php  
					}	
				}
				else
				{
				?> 
				<tr><td colspan="48" class="errorMessage">data not available</td></tr>
				<?php 
				}		
				}		
				?> 
                </tbody>
              </table>
			  </div>
            </div>
            <!-- /.box-body -->
          </div>
          <!-- /.box -->
   
    </div>
  	
	</section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
  
  <!-- Modal -->
  <div class="modal fade" id="myModal" role="dialog">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Student Information</h4>
        </div>
        <div class="modal-body">
         
			  <div class="row">
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Name</label>
    				<input type="text" class="form-control" id="studentName">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Gender</label>
    				<input type="text" class="form-control" id="gender">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Date Of Birth</label>
    				<input type="text" class="form-control" id="dob">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Birth Place</label>
    				<input type="text" class="form-control" id="birthPlace">
					</div>
				</div>
			  </div>
			  <div class="row">
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Height</label>
    				<input type="text" class="form-control" id="studHeight">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Weight</label>
    				<input type="text" class="form-control" id="studWeight">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Blood Group</label>
    				<input type="text" class="form-control" id="studBloodGroup">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Student Identity</label>
    				<input type="text" class="form-control" id="studIdentity">
					</div>
				</div>
			  </div>
			  <div class="row">
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">UID</label>
    				<input type="text" class="form-control" id="studUID">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Area Of Interest</label>
    				<input type="text" class="form-control" id="studAreaOfInterest">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Permanent Address</label>
    				<input type="text" class="form-control" id="studPermanentAddress">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Current Address</label>
    				<input type="text" class="form-control" id="studCurrentAddress">
					</div>
				</div>
			  </div>
			  <div class="row">
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Contact No 1</label>
    				<input type="text" class="form-control" id="studContactNo1">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Contact No 2</label>
    				<input type="text" class="form-control" id="studContactNo2">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Religion</label>
    				<input type="text" class="form-control" id="studReligion">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Cast</label>
    				<input type="text" class="form-control" id="studCast">
					</div>
				</div>
			  </div>
			  <div class="row">
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Mother Tounge</label>
    				<input type="text" class="form-control" id="studMotherTounge">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Father Name</label>
    				<input type="text" class="form-control" id="studFatherName">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Father Qualification</label>
    				<input type="text" class="form-control" id="studFatherQualification">
					</div>
				</div>
				<div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 ">
					<div class="form-group">
					<label for="email">Father Occupation</label>
    				<input type="text" class="form-control" id="studFatherOccupation">
					</div>
				</div>
			  </div>
			  
			  <div class="modal-footer">
          		<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
       		  </div>
		  </div>
        </div>
        
      </div>
    </div>
  </div>


 <?php $this->load->view('footer');?>
 
<script>
$( document ).ready(function() {
$("#dashboard").removeClass('active');
$("#verified-request").addClass('active');
});
	
function showStudentDetails(id)
{
	$('#myModal').modal('show');
	$("#studentName").val(id);
	$("#gender").val(id);
	$("#dob").val(id);
	$("#birthPlace").val(id);
}
</script>
 
</body>
</html>