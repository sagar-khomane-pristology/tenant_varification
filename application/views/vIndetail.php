<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<title><?php echo $title;?></title>
		
		<?php $this->load->view('header.php');?>

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<section class="content">
			<div class="row">
				<div class="col-md-2 col-lg-2 col-xs-12 col-sm-12">
					<div class="box " style="position:relative;  margin-top: 65px; border-top:0px ">
						
							<div class="box-header with-border">
								<span style="line-height: 164px; font-size:31px;">Owner Details:</span>
							</div>
							
							<!--<div class="box-body">
							
							sdfsdfs
							
							sdfsdfs
							sdfsd
							</div>-->
							</div>
					</div>
					
				<div class="col-md-10 col-lg-10 col-xs-12 col-sm-12">
					<div class="box " style="position:relative;  margin-top: 65px; border-top:0px ">
						<div class="box-body">
							<div class="col-md-2 col-lg-2 col-xs-12 col-sm-12">
								<img  style="width: 122px; height: auto;" id="myImgzoom" src="../../assets/dist/img/user2-160x160.png" alt="owner photo">
							</div>
							<div class="col-md-10 col-lg-10 col-xs-12 col-sm-12">
								<table class="table" style="">
								<tr>
									<th>Owner Name</th>
									<td>csdasda</td>
									<th>Contact Number</th>
									<td>csdasda</td>
								</tr>
								<tr>
									<th>Contact Number</th>
									<td>csdasda</td>
									<th>Email Address</th>
									<td>csdasda</td>
								</tr>
								<tr>
									<th>Permenant Address</th>
									<td style="word-break: break-all;">350 sadashive peth, pune 411000. near swargate.</td>
									<th>Pin Code</th>
									<td>csdasda</td>
								</tr>
								<tr>
									<th>Adhaar Number</th>
									<td>csdasda</td>
									<th>Owner Adhaar Photo</th>
									<td>csdasda</td>
								</tr>
								</table>
							</div>
						<!--	<div>
							<label> Owner Photo:</label>
							</div>
							<div>
							<label>Owner Name:</label>
							</div>
							<div>
							<label>Contact Number:</label>
							</div>
							<div>
							<label>Email Address:</label>
							</div>
							<div>
							<label>Permenant Address:</label>
							</div>
							<div>
							<label> Pin Code:</label>
							</div>
							<div>
							<label> Adhaar Number:</label>
							</div>
							<div>
							<label>Owner Adhaar Photo:</label>
							</div>-->
						</div>
					</div>
				</div>
				</div>
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