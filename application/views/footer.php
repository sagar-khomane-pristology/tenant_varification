 <div class="backdrop1"></div>
 <!--<footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.4.0
    </div>
    <strong>Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>.</strong> All rights
    reserved.
  </footer>-->
  

   
  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
  
</div>
<!-- ./wrapper -->

<link rel="stylesheet" href="<?php echo base_url();?>assets/dist/css/jquery.ui.css">
<!-- jQuery 3 -->
<script src="<?php echo base_url();?>assets/bower_components/jquery/dist/jquery.min.js"></script>
<script src="<?php echo base_url();?>assets/dist/js/jquery-ui.js"></script>
<!-- jQuery UI 1.11.4 -->
<!--<script src="<?php echo base_url();?>assets/bower_components/jquery-ui/jquery-ui.min.js"></script>-->
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script src="<?php echo base_url();?>assets/dist/js/jquery-migrate-3.0.0.min.js">
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="<?php echo base_url();?>assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<script src="<?php echo base_url();?>assets/dist/js/bootstrapvalidator.js"></script>
<!-- DataTables -->
<script src="<?php echo base_url();?>assets/bower_components/datatables.net/js/jquery.dataTables.min.js"></script>
<script src="<?php echo base_url();?>assets/bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="<?php echo base_url();?>assets/bower_components/raphael/raphael.min.js"></script>
<script src="<?php echo base_url();?>assets/bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="<?php echo base_url();?>assets/bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="<?php echo base_url();?>assets/plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="<?php echo base_url();?>assets/plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="<?php echo base_url();?>assets/bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="<?php echo base_url();?>assets/bower_components/moment/min/moment.min.js"></script>
<script src="<?php echo base_url();?>assets/bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="<?php echo base_url();?>assets/bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- bootstrap time picker -->
<script src="<?php echo base_url();?>assets/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="<?php echo base_url();?>assets/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="<?php echo base_url();?>assets/bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="<?php echo base_url();?>assets/bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="<?php echo base_url();?>assets/dist/js/adminlte.min.js"></script>

<!-- AdminLTE for demo purposes -->
<script src="<?php echo base_url();?>assets/dist/js/demo.js"></script>
<script src="<?php echo base_url();?>assets/js/script.js"></script>


<script>

$(document).ready(function(){
    $(".dropdown").on('shown.bs.dropdown', function () {
        $(".backdrop1").show();
    });
	$(".dropdown").on('hidden.bs.dropdown', function () {
        $(".backdrop1").hide();
    });
});

  $(function () {
    $('#example1').DataTable()
    $('#example2').DataTable({
      'paging'      : true,
      'lengthChange': false,
      'searching'   : false,
      'ordering'    : true,
      'info'        : true,
      'autoWidth'   : false
    })
  })
  
  
</script>