<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title><?php echo $title;?></title>
		
		<?php $this->load->view('header.php');?>

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			
			<section class="content-header">
			  <!--<h1 id="cust_title">&nbsp;</h1>
			  <ol class="breadcrumb">
				<li><a href="#"><i class="fa fa-dashboard"></i>Home</a></li>
				<li class="active" id="cust_title1">View Details</li>
			  </ol>-->
			</section>
			
			<section class="content">
			<div class="row">
				<!--<div class="col-md-2 col-lg-2 col-xs-12 col-sm-12">
					<div class="box " style="position:relative;  margin-top: 65px; border-top:0px ">
						
							<div class="box-header with-border">
								<span style="line-height: 164px; font-size:31px;">Owner Details:</span>
							</div>
							</div>
					</div>-->
					
				<div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
					<div class="box box-no-border" >
					<div class="box-header with-border">
							<div class="col-md-6 col-lg-6 col-xs-12 col-sm-12"><h4>Owner Details:</h4></div>
							<div class="col-md-6 col-lg-6 col-xs-12 col-sm-12"><h4>Property Details:</h4></div>
						</div>
						
						<div class="box-body">
							<div class="row">
								<div class="col-md-2 col-lg-2 col-xs-6 col-sm-6">
									<div class="row">
									<img class="profile-img-photo" id="myImgzoom" src="../../assets/dist/img/sample.png" alt="owner photo">
									</div>
									<div class="row">
									 <span class="text-margin-right">absc dhh nanna</span><br>
									 <span class="text-margin-right">addjk.dsadsa21@gmail.com</span><br>
									 <span class="text-margin-right">+91989898998</span>
									</div>
								</div>
								<div class="col-md-4 col-lg-4 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom right-border">
									<tr>
										<td style="word-break: break-all;"><b>Permenant Address</b><br>350 sadashive peth, pune 411000. near swargate 411404, 411411</td>
									</tr>
									<tr>
										<td><b>Birthday</b><br>1st-january-2019</td>
									</tr>
									<tr>
										<td><b>Adhaar Number</b><br>524556451265 <button type="button" class="btn btn-default btn-xs"><i class="fa fa-download"></i></button></td>
									</tr>
									 
									</table>
								</div>
								<div class="col-md-3 col-lg-3 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom">
									<tr>
										<td style="word-break: break-all;"> <b>Police Station</b><br> abc police station wagholi pune</td>
									</tr>
									<tr>
										<td style="word-break: break-all;"><b>Property Address</b><br> 350 sadashive peth, pune 411000. near swargate, Maharashtra , Pune, 411000</td>
									</tr>
									<tr>
										<td><b>Possession</b><br>27-7-2019 </td>
									</tr>
									 
									</table>
								</div>
								
								<div class="col-md-3 col-lg-3 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom">
									<tr>
										<td><b>Propert Type</b><br>XYZ abc</td>
									</tr>
									<tr>
										<td>
										<b>Agreement</b><br>
										<b>From: </b>27-7-2019 <b>To: </b> 27-10-2019
										</td>
									</tr>
									
									<tr>
										<td><b>Property Rent Agreement/Light Bill/ Water Bill Photo</b><br>&nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs"><i class="fa fa-download"></i></button></td>
									</tr>
									<tr>
										<td><b>Society NOC photo</b> &nbsp;&nbsp;&nbsp;<button type="button" class="btn btn-default btn-xs"><i class="fa fa-download"></i></button></td>
									</tr>
									 
									</table>
								</div>
								
							</div>
						</div>
					</div>
				</div>
				</div>
				
				<div class="row"> 
					<div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
					<div class="box box-no-border">
					<div class="box-header with-border">
							<h4>Tenant Details:</h4>
						</div>
						<div class="box-body">
							<div class="row">
								<div class="col-md-2 col-lg-2 col-xs-6 col-sm-6">
									<div class="row">
									<img class="profile-img-photo" id="myImgzoom" src="../../assets/dist/img/sample.png" alt="owner photo">
									</div>
									<div class="row">
									 <span class="text-margin-right">Rohit Jadhav</span><br>
									 <span class="text-margin-right">tenant@ga.com</span><br>
									 <span class="text-margin-right">+919850505050</span>
									</div>
								</div>
								<div class="col-md-4 col-lg-4 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom">
									<tr>
										<td style="word-break: break-all;"><b>Permenant Address</b><br>350 sadashive peth, pune 411000. near swargate 411404., </td>
									</tr>
									<tr>
										<td><b>Date of birth</b><br>27-10-2019</td>
									</tr>
									<tr>
										<td><b>Adhaar Number</b><br>524556451265 <button type="button" class="btn btn-default btn-xs"><i class="fa fa-download"></i></button></td>
									</tr>
									<tr>
										<td><b>Vehicle Number</b><br>MH 12 AD 5555</td>
									</tr>
									 <tr>
										<td><b>Tenant Occupation</b><br>abcd abcd </td>
									</tr>
									 
									</table>
								</div>
								<div class="col-md-3 col-lg-3 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom">
									<tr>
										<td><b>Tenant Type</b><br>XYZ abc</td>
									</tr>
									
									<tr>
										<td>350 sadashive peth, pune 411000. near swargate.</td>
									</tr>
									<tr>
										<td><b>Reference Person 1 Name</b><br>ref1r ef1r ef1</td>
									</tr>
									<tr>
										<td><b>Reference Person 2 Name</b><br>ref1r ef1r ef1</td>
									</tr>
									 
									</table>
								</div>
								
								<div class="col-md-3 col-lg-3 col-xs-6 col-sm-6">
									<table class="table table-align-left profile-table-custom">
									<tr>
										<td><b>Tenant Occupation</b><br>abcd abcd vc abcd</td>
									</tr>
									<tr>
										<td><b>Work Contact Number</b><br>2356897415 5<br><br></td>
									</tr>
									<tr>
										<td><b>Reference Person 1 contact</b><br>1234589789</td>
									</tr>
									<tr>
										<td><b>Reference Person 2 contact</b><br>1234589789</td>
									</tr>
									</table>
								</div>
								
							</div>
						</div>
						</div>
					</div>
					
					</div>
					
					
					
				<div class="row"> 
					<div class="col-md-12 col-lg-12 col-xs-12 col-sm-12">
					<div class="box box-no-border">
					<div class="box-header with-border">
							<h4>Tenant child Details:</h4>
						</div>
						<div class="box-body">
						<table class="table table-align-left profile-table-custom">
							<tr>
								<th>Child Tenant Name</th>
								<th>Child Tenant Adhaar</th>
								<th>Relation With Head Tenant</th>
							</tr>
							<tr>
								<td>ssss ssss ss</td>
								<td>878787844545</td>
								<td>child</td>
							</tr>
							<tr>
								<td>ssss ssss ss</td>
								<td>878787844545</td>
								<td>child</td>
							</tr>
						</table>
						</div>
						</div>
					</div>
					
					</div>
					
					<div class="row">
					<div class="col-md-12 col-lg-12 col-xs-12 col-sm-12" style=""> 
						<div class="box box-no-border">
							<div class="box-header with-border">
								<h4>Broker Details:</h4>
							</div>
							<table class="table table-align-left">
							<tr>
								<td><b>Broker Name</b><br>Rohit Jadhav</td>
								<td style="word-break: break-all;"><b>Broker Contact Number</b><br>350 sadashive peth, pune 411000. near swargate.</td>
								<td><b>Broker Adhaar Number</b><br>985050505012</td>
							</tr>
							</table>
						</div>
					</div>
				</div>
				<!--<div class="row">
					<div class="col-md-6 col-lg-6 col-xs-12 col-sm-12">
						<div class="box " style="border-top:0px ">
							<div class="box-header with-border">
								<h3>Broker Details:</h3>
							</div>
							<table class="table" style="">
							<tr>
								<th>Broker Name</th>
								<td>Rohit Jadhav</td>
								<th> Broker Parmanent Address</th>
								<td style="word-break: break-all;">350 sadashive peth, pune 411000. near swargate.</td>
							</tr>
							<tr>
								<th>Broker Contact Number</th>
								<td>9850505050</td>
								<th>Broker Adhaar Number</th>
								<td>985050505012</td>
							</tr>
							</table>
						</div>
					</div>
				</div> -->
			</section>   
		</div>
		
	
	
	<?php $this->load->view('footer');?>
	
	<script>
		/*$( document ).ready(function() {
			$("#dashboard").removeClass('active');
			$("#ss").addClass('active');
		});
		
		// Get the modal
		var modal = document.getElementById("myModal_zoom");
		// Get the image and insert it inside the modal - use its "alt" text as a caption_zoom
		var img = document.getElementById("myImgzoom");
		var modalImg = document.getElementById("img01_zoom");
		var captionText = document.getElementById("caption_zoom");
		img.onclick = function(){
			modal.style.display = "block";
			modalImg.src = this.src;
			captionText.innerHTML = this.alt;
		}
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close_model")[0];
		// When the user clicks on <span> (x), close_model the modal
		span.onclick = function() { 
			var modal = document.getElementById("myModal_zoom");
			modal.style.display = "none";
		}
		*/
	</script>
	
</body>
</html>