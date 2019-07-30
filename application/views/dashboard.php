<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title><?php echo $title;?></title>
  <?php $this->load->view('header');?>
  
  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        <?php echo $main;?>
        <small>Control panel</small>
      </h1>
      <ol class="breadcrumb">
        <li><a href="#"><i class="fa fa-dashboard"></i> <?php echo $main;?></a></li>
        <li class="active"><?php echo $main;?></li>
      </ol>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-aqua">
            <div class="inner">
              <h3>101</h3>

              <p>New Request</p>
            </div>
            <div class="icon">
              <i class="icon ion-ios-stopwatch-outline"></i>
            </div>
            <a href="<?php echo base_url()?>Tenant/newRequest/" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-green">
            <div class="inner">
              <h3>53<sup style="font-size: 20px"></sup></h3>

              <p>Under Review</p>
            </div>
            <div class="icon">
              <i class="icon ion-eye"></i>
            </div>
            <a href="<?php echo base_url()?>Tenant/viewed/" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-yellow">
            <div class="inner">
              <h3>44</h3>

              <p>Verified</p>
            </div>
            <div class="icon">
              <i class="icon ion-android-checkbox-outline"></i>
            </div>
            <a href="<?php echo base_url()?>Tenant/verified/" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
        <div class="col-lg-3 col-xs-6">
          <!-- small box -->
          <div class="small-box bg-red">
            <div class="inner">
              <h3>65</h3>

              <p>Un-Verified</p>
            </div>
            <div class="icon">
              <i class="icon ion-eye-disabled"></i>
            </div>
            <a href="<?php echo base_url()?>Tenant/unVerified/" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
          </div>
        </div>
        <!-- ./col -->
      </div>
      <!-- /.row -->
      <!-- Main row -->
       
	
        <!-- Left col -->
        <section>
			<div class="row">
			  <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
				<h3> Application By Pincode</h3>
				<div class="box box-no-border box-height-change">
				<canvas id="bar-chart-grouped" width="800" height="450"></canvas>
				</div>
			  </div>
			  <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
				<h3> Pie Chart</h3>
				<div class="box box-no-border box-height-change">
				<canvas id="pie-chart" width="800" height="532"></canvas>
				</div>
			  </div>
			</div>
        </section>
        <!-- /.Left col -->
		
		 
       
      
      <!-- /.row (main row) -->

    </section>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->
 
 <?php $this->load->view('footer');?>
 <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!--<script src="<?php echo base_url();?>assets/dist/js/pages/dashboard.js"></script>-->
<script src="<?php echo base_url();?>assets/dist/js/Chart.min.js"></script>

<script>
new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: ["411041", "411042", "411043", "411044"],
      datasets: [
        {
          label: "New Request",
          backgroundColor: "#00C0EF",
          data: [133,221,783,978]
        }, {
          label: "Under Review",
          backgroundColor: "#00A65A",
          data: [408,647,775,134]
        }, {
          label: "Verified",
          backgroundColor: "#F39C12",
          data: [508,247,575,734]
        }, {
          label: "Un-Verified",
          backgroundColor: "#DD4B39",
          data: [708,847,475,664]
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: ''
      },
	  scales: {
		yAxes: [{
		  scaleLabel: {
			display: true,
			labelString: 'Numbers'
		  }
		}],
		xAxes: [{
		  scaleLabel: {
			display: true,
			labelString: 'Pincode'
		  }
		}]
	  },   
	  layout: {
            padding: {
                left: 10,
                right: 00,
                top: 0,
                bottom: 80,
            }
      },
	  legend: {
		 position:'bottom'
	  }
    }
});

new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: ["New Request", "Under Review", "Verified", "Un-Verified"],/*, "North America"*/
      datasets: [{
        label: "Number",
        backgroundColor: ["#00C0EF", "#00A65A","#F39C12","#DD4B39"],/*,"#c45850"*/
        data: [2478,5267,734,784]
      }]
    },
    options: {
      title: {
        display: true,
        text: ''
      },
	  layout: {
            padding: {
                left: 0,
                right: 00,
                top: 60,
                bottom: 80,
            }
      },
	  legend: {
		 position:'bottom'
	  }
    }
});
</script>
</body>
</html>
