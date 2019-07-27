<!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
      <!-- Sidebar user panel -->
      <div class="user-panel">
        <div class="pull-left image">
          <img src="<?php echo base_url().'assets/dist/img/user2-160x160.png';?>" class="img-circle" alt="User Image" onerror="this.src='<?php echo base_url().'assets/dist/img/user2-160x160.png';?>'">
        </div>
        <div class="pull-left info">
          <p><a class="text-white" href="#"><?php echo "admin"." "."admin";?></a></p>
          <a href="#"><i class="fa fa-circle text-success"></i> Online</a>
        </div>
      </div>
	   <!-- Sidebar Menu -->  
      <ul class="sidebar-menu" data-widget="tree">
        <!-- Optionally, you can add icons to the links -->
            <li class="active" id="dashboard"><a href="<?php echo base_url()?>Dashboard/"><i class="fa fa-dashboard"></i> <span>Dashboard</span></a></li>
           <li id="new-request"><a href="<?php echo base_url()?>Tenant/newRequest/"><i class="fa fa-fw fa-plus-square"></i> <span>New Request</span></a></li>
           <li id="viewed-request"><a href="<?php echo base_url()?>Tenant/viewed/"><i class="fa fa-fw fa-eye"></i> <span>Viewed</span></a></li>
           <li id="verified-request"><a href="<?php echo base_url()?>Tenant/verified/"><i class="fa fa-fw fa-check-square-o"></i> <span>Verified</span></a></li>
           <li id="unverified-request"><a href="<?php echo base_url()?>Tenant/unVerified/"><i class="fa fa-fw fa-minus-square-o"></i> <span>Un-Verified</span></a></li>
           <li id="report"><a href="<?php echo base_url()?>Tenant_report/"><i class="fa fa-fw fa-file-pdf-o"></i> <span>Report</span></a></li>
           <li id="change-password"><a href="<?php echo base_url()?>Login/ChangePassword/"><i class="fa fa-fw fa-lock"></i> <span>Change Password</span></a></li>
      </ul>
      <!-- /.sidebar-menu -->
    </section>
    <!-- /.sidebar -->
  </aside>