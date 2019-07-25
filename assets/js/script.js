
/************************************** SCHOOL MANAGMENT SCRIPT *****************************************/

// function base_url() {
    // var pathparts = location.pathname.split('/');
    // if (location.host == 'localhost') {
        // var url = location.origin+'/'+pathparts[1].trim('/')+'/'; // http://localhost/myproject/
    // }else{
        // var url = location.origin; // http://stackoverflow.com
    // }
    // return url;
// }

var pathparts = location.pathname.split('/');
var baseUrl = location.origin+'/'+pathparts[1].trim('/')+'/'; // http://localhost/myproject/
var serviceUrl = $('#service_url').val();
var loginUrl = $('#login_url').val();
var newServiceUrl = serviceUrl.substring(0, serviceUrl.lastIndexOf("index.php/") + 0);


//Sent OTP to register mobile number	
function getLoginOtp()
{
	var unumber = $("#unumber").val();
	if((unumber == "") || (!validateMobile(unumber)))
	{
		$("#validUnumber").html("Please Enter Valid Mobile Number");
		setTimeout(function(){ $('#validUnumber').html(''); }, 2000);
	}
	else
	{
		$('.otp-button').prop('disabled', true);
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/getLoginOtp",
			type: 'post',
			data:{'unumber':unumber,'device_type':'web'},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['error'] == 'true')
				{
					$('.otp-button').prop('disabled', false);
					$("#validUnumber").html(response['response']['message']);
					setTimeout(function(){ $('#validUnumber').html(''); }, 3000);
				}
				else{
					$('.otp-button').prop('disabled', false);
					console.log(response['response']['data']['otps']['otp']);
					$("#validUnumber").html("<span style='color:green;'>OTP sent on your register mobile number<span>");
					setTimeout(function(){ $('#validUnumber').html(''); }, 10000);
				}
			}
			
		});
	}
}

//for validate All Indian mobile number
function validateMobile(mobile) {
    var re = /^[789]\d{9}$/;
    return re.test(mobile);
}


//Common Function for download file
function downloadFile(url)
{
	$.ajax({
		//dataType: 'json',
		url: baseUrl+"index.php/Login/getFileName",
		type: 'POST',
		data:{'url':url},
		//cache: false,
		success: function(response) 
		{
			//console.log(response);
			if(response!='')
			{
				window.location = baseUrl+'index.php/Login/downloadFile/?id='+url;
			}else{
				alert('file not found');
			}
		}
		
	});
	
}



//Get parent from division	
function getParentFromDivision(division)
{
	var data3;
	var class1 = $("#class").val();
	//var division = $("#division").val();
	if(class1 == "" || division == "")
	{
		//alert('Select Field');
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Teacher/TSendMessage/getParentFromDivision",
			type: 'post',
			data:{'class':class1,'division':division},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#parent').empty();
				$('#parent').append('<option></option>');
				$.each(response['response']['data']['parent'], function (i, elem2) {
					data3 = '<option value='+elem2.scst_parent_id+'>' +elem2.ssdm_stud_id+ '-' +elem2.scst_fname+ '(' +elem2.scpt_ftr_fname+ ' ' +elem2.scpt_ftr_fname+ ')' + '</option>';
					$('#parent').append(data3);
				});
				
			}
			
		});
	}
}


/****COMMON Function for get Division list from class id used for dropdown****/
function classChangeGetDivision(class_id)
{
	var data3;
	//var division = $("#division").val();
	if(class_id == "")
	{
		$('#div').empty();
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/classChangeGetDivision",
			type: 'post',
			data:{'class_id':class_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['data']['division'].length > 0)
				{
					$('#div').empty();
					data3 += '<option value="">Select Division</option>';
					$.each(response['response']['data']['division'], function (i, elem2) {
					data3 += "<option value="+"'"+elem2.id+"'"+">" +elem2.scdv_division_name + "</option>";
					});
				}
				else
				{
					$("#div").empty();
					data3 += '<option value="">Data not available</option>';
				}
				$('#div').append(data3);
			}
			
		});
	}
}

/****COMMON Function for get Subject list from class id and div id used for dropdown****/
function divChangeGetSubject(division_id)
{
	var data3;
	if(division_id == "")
	{
		$('#subject').empty();
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/divChangeGetSubject",
			type: 'post',
			data:{'division_id':division_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#subject').empty();
				$('#subject').append('<option></option>');
				$.each(response['response']['data']['subject'], function (i, elem2) {
					data3 = "<option value="+"'"+elem2.id+"'"+">" +elem2.scsb_subject_name + "</option>";
					$('#subject').append(data3);
				});
				
			}
			
		});
	}
}

/****COMMON Function for get Student list from class, division id used for dropdown****/
function divChangeGetStudentList(div_id)
{
	var data3;
	var division = $("#division").val();
	if(div_id == "")
	{
		$('#student_list').empty();
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/divChangeGetStudentList",
			type: 'post',
			data:{'div_id':div_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['data']['student'].length > 0)
				{
					$('#student_list').empty();
					data3 += '<option value="">Select Student</option>';
					$.each(response['response']['data']['student'], function (i, elem2) {
					data3 += "<option value="+"'"+elem2.ssdm_stud_id+"'"+">" +elem2.scst_fname +" "+elem2.scst_lname+"</option>";
					});
				}
				else
				{
					$("#student_list").empty();
					data3 += '<option value="">Data not available</option>';
				}
				$('#student_list').append(data3);
			}
			
		});
	}
}

/****COMMON Function for get exam type from class, division id used for dropdown****/
function divChangeGetExamType(div_id)
{
	var data3;
	var class_id = $("#class").val();
	if(div_id == "")
	{
		$('#exam_type').empty();
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/divChangeGetExamType",
			type: 'post',
			data:{'class_id':class_id,'div_id':div_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['data']['exam'].length > 0)
				{
					$('#exam_type').empty();
					data3 += '<option value="">Select Exam</option>';
					$.each(response['response']['data']['exam'], function (i, elem2) {
					data3 += "<option value="+"'"+elem2.sett_examaster_id+"'"+">" +elem2.scxt_exam_type+"</option>";
					});
				}
				else
				{
					$("#exam_type").empty();
					data3 += '<option value="">Data not available</option>';
				}
				$('#exam_type').append(data3);
			}
			
		});
	}
}


/****COMMON Function for get exam checdule list from class, division id used for dropdown****/
function divChangeGetExamNameByClassDiv(div_id)
{
	var data3;
	var class_id = $("#class").val();
	if(div_id == "")
	{
		$('#exam_type').empty();
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/divChangeGetExamNameByClassDiv",
			type: 'post',
			data:{'class_id':class_id,'div_id':div_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['data']['exam'].length > 0)
				{
					$('#exam_type').empty();
					data3 += '<option value="">Select Exam</option>';
					$.each(response['response']['data']['exam'], function (i, elem2) {
					data3 += "<option value="+"'"+elem2.sett_examaster_id+"'"+">" +elem2.scxt_exam_type+"</option>";
					});
				}
				else
				{
					$("#exam_type").empty();
					data3 += '<option value="">Data not available</option>';
				}
				$('#exam_type').append(data3);
			}
			
		});
	}
}


//Common get timetable in dropdown list
function divChangeGetTimetableName()
{
	var class_id = $("#class").val();
	var division_id = $("#div").val();
	var academic_year = $("#academic_year").val();
	var timetable_term = $("#timetable_term").val();
	if(division_id == "" || class_id == "" || academic_year == "" || timetable_term == "")
	{
		//alert('Select Field');
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/divChangeGetTimetableName",
			type: 'post',
			data:{'class_id':class_id, 'division_id':division_id, 'academic_year':academic_year, 'timetable_term':timetable_term},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#timetable_name').empty();
				$('#timetable_name').append('<option></option>');
				$.each(response['response']['data']['timetable_name'], function (i, elem2) {
					data3 = "<option value="+"'"+elem2.timetable_name+"'"+">" +elem2.timetable_name + "</option>";
					$('#timetable_name').append(data3);
				});
				
			}
			
		});
	}
}

//Get parent and student from division	
function getParentFromDivisionForMessageSent(division)
{
	var data3;
	var class1 = $("#class").val();
	//var division = $("#division").val();
	if(class1 == "" || division == "")
	{
		//alert('Select Field');
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Teacher/TSendMessage/getParentFromDivision",
			type: 'post',
			data:{'class':class1,'division':division},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#parent').empty();
				$('#parent').append('<option></option>');
				$.each(response['response']['data']['parent'], function (i, elem2) {
					data3 = '<option value='+elem2.scst_parent_id+'-'+elem2.scst_student_id+'>' +elem2.ssdm_stud_id+ '-' +elem2.scst_fname+ '(' +elem2.scpt_ftr_fname+ ' ' +elem2.scpt_ftr_lname+ ')' + '</option>';
					$('#parent').append(data3);
				});
				
			}
			
		});
	}
}

/******* showtimetable() function is available on that perticullar page **********/
function showtimetable() {
		var timetable_name = $('#timetable_name option:selected').val();
		if (timetable_name == "") {
			alert("Please Select Timetable");
			return;
		}

		var class_id = $('#class option:selected').val();
		if (class_id === "") {
			alert("Please Select class");
			return;
		}
		var div_id = $('#div option:selected').val();
		if (div_id === "") {
			alert("Please Select Division");
			return;
		}
		
		var academic_year = $('#academic_year option:selected').val();
		if (academic_year === "") {
			alert("Please Select Year");
			return;
		}
		
		var timetable_term = $('#timetable_term option:selected').val();
		if (timetable_term === "") {
			alert("Please Select Term");
			return;
		}
		$.ajax({
			type: "POST",
			url: baseUrl+"index.php/AcademicAdmin/ViewTimeTable/loadTimeTable",
			data: {'timetable_name': timetable_name, 'class_id': class_id, 'div_id': div_id, 'academic_year': academic_year, 'timetable_term': timetable_term},
			dataType: "html",
			success: function (response) {
				$("#timetable-data").empty();
				$("#timetable-data").html(response);
				
				/* console.log(data);
				$('#finish_table tbody').empty();
				$('#finish_table tbody').append(data);
				var countTD = $("#finish_table > tbody > tr:first > td").length;
				var hd = '<tr><th data-hide="phone,tablet"  data-sort-initial="descending" data-class="expand"><b>Weekdays</b></th>';
				for (i = 0; i < countTD - 1; i++) {
					hd = hd + "<th data-hide='phone,tablet' data-type='numeric'><b>Period-" + (i + 1) + "</b></th>";
				}
				hd = hd + "</tr>";
				$(hd).insertBefore('#finish_table > tbody > tr:first'); */

			}
		});
    }
	


/****COMMON Function for get caste list from religion id used for dropdown****/
function getCasteByReligion(scct_religion_id)
{
	//var division = $("#division").val();
	if(scct_religion_id == "")
	{
		//alert('Select Field');
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/AddReligion/getCasteByReligion",
			type: 'post',
			data:{'scct_religion_id':scct_religion_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#scsc_cast_id').empty();
				$('#scsc_cast_id').append('<option></option>');
				$.each(response['response']['data']['caste'], function (i, elem2) {
					data3 = "<option value="+"'"+elem2.id+"'"+">" +elem2.scct_cast_name + "</option>";
					$('#scsc_cast_id').append(data3);
				});
				
			}
			
		});
	}
}


//Get Student List from division and class for Attendance add
function getStudentListForAttendance(division)
{
	var class1 = $("#class").val();
	//var division = $("#division").val();
	if(class1 == "" || division == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Teacher/TAttendance/loadStudentAttendanceListData",
			type: 'post',
			data:{'class':class1,'division':division},
			cache: false,
			success: function(response) 
			{
				$("#studentAttendanceListData").empty();
				$("#studentAttendanceListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Student found</div>");
					$("#btnAttendance").hide();
				}
			}
			
		});
	}
}


//Show TEacher dashboard Student Attendance  List from division and class and date
function teacherShowStudentAttendanceListByDate()
{
	var class1 = $("#class").val();
	var division = $("#div").val();
	var attendance_date = $("#attendance_date").val();
	if(class1 == "" || division == "" || attendance_date == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Teacher/TViewAttendance/teacherShowStudentAttendanceListByDate",
			type: 'post',
			data:{'class':class1,'division':division,'attendance_date':attendance_date},
			cache: false,
			success: function(response) 
			{
				$("#studentAttendanceListData").empty();
				$("#studentAttendanceListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Attendance found</div>");
					$("#btnAttendance").hide();
				}
			}
			
		});
	}
	
}


//Show Parent can view Child Attendance List from month Year
function parentShowStudentAttendanceListByMonthYear()
{
	var year = $("#year").val();
	var month = $("#month").val();
	if(year == "" || month == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Parents/PViewAttendance/ParentShowStudentAttendanceListByDate",
			type: 'post',
			data:{'year':year,'month':month},
			cache: false,
			success: function(response) 
			{
				$("#studentAttendanceListData").empty();
				$("#studentAttendanceListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Attendance found</div>");
					$("#btnAttendance").hide();
				}
			}
			
		});
	}
}



//Show Parent dashborad by student name
function ParentDashboardChangeByChild(studentId)
{
	if(studentId == "")
	{
		//alert('Select Field');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Parents/PViewResult/ParentDashboardChangeByChild",
			type: 'POST',
			data:{'studentId':studentId},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				location.reload();
			}
			
		});
		//location.reload();
	}
}

//Show Student Marks Data By Exam Term Type
function showStudentMarksheetDataInTable(exam_type)
{
	var class1 = $("#class").val();
	var div = $("#div").val();
	if(class1 == "" || div == "" || exam_type == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Teacher/TViewMarks/loadStudentByClassMarksInTable",
			type: 'post',
			data:{'class':class1,'division':div,'exam_type':exam_type},
			cache: false,
			success: function(response) 
			{
				$("#studentMarksSheetListData").empty();
				$("#studentMarksSheetListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Marksheet found</div>");
					$("#btnMarksheet").hide();
				}
        
        }
			
		});
	}
}


//Get Student List for Mark Upload
function getStudentListForMarkUpload(examtype)
{
	var class1 = $("#class").val();
	var division = $("#div").val();
	if(class1 == "" || division == ""|| examtype == "")
	{  
	alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Teacher/TUploadMarks/getStudentListForMarkUpload",
			type: 'post',
			data:{'class':class1,'division':division,'examtype':examtype},
			cache: false,
			success: function(response) 
			{
				$("#studentListDataForMarkEnter").empty();
				$("#studentListDataForMarkEnter").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Student found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}


/*********IMPORTANT => saveStudentMarks Javascript code in view=> Teacher/loadStudentListMarkUpload.php ********/



//Show Student Marks Data By Exam Term Type By Supervisor
function showStudentMarksheetDataInTableBySupervisor(division)
{
	var class1 = $("#class").val();
	var exam_type = $("#exam_type").val();
	var term1 = $("#term").val();
	if(class1 == "" || division == "" || exam_type == "" || term1 == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Supervisor/SViewStudentMarks/loadStudentByClassMarksInTableBySupervisor",
			type: 'post',
			data:{'class':class1,'division':division,'exam_type':exam_type,'term':term1},
			cache: false,
			success: function(response) 
			{
				$("#studentMarksSheetListData").empty();
				$("#studentMarksSheetListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Marksheet found</div>");
					$("#btnMarksheet").hide();
				}
        
        }
			
		});
	}
}


//Show Student Marks Data By Exam Term Type By Supervisor
function showChildMarksheetDataInTableByParent(term1)
{
	var exam_type = $("#exam_type").val();
	var term1 = $("#term").val();
	if(exam_type == "" || term1 == "")
	{
		alert('Select All Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Parents/PViewResult/loadChildByClassMarksInTableByParent",
			type: 'post',
			data:{'exam_type':exam_type,'term':term1},
			cache: false,
			success: function(response) 
			{
				$("#studentMarksSheetListData").empty();
				$("#studentMarksSheetListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Marksheet found</div>");
					$("#btnMarksheet").hide();
				}
        
        }
			
		});
	}
}

//Show Staff List For for attendance By Supervisor
function getStaffAttendanceDataByDate(date)
{
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Supervisor/STeacherAttendance/getStaffAttendanceDataByDate",
			type: 'post',
			data:{'date':date},
			cache: false,
			success: function(response) 
			{
				$("#staffAttendanceListData").empty();
				$("#staffAttendanceListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No found</div>");
					$("#btnMarksheet").hide();
				}
        
        }
			
		});
	}
}

//Get Staff attendance History Records By Supervisor
function getStaffAttendanceListByDate(date)
{
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Supervisor/STeacherAttendanceView/ShowStaffAttendanceListByDate",
			type: 'post',
			data:{'date':date},
			cache: false,
			success: function(response) 
			{
				$("#staffAttendanceListData").empty();
				$("#staffAttendanceListData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No found</div>");
					$("#btnMarksheet").hide();
				}
        
        }
			
		});
	}
}

//When staff Punch In
function loadPunchIn(scem_emp_id, attendance_status)
{
	var attendance_date = $("#attendance_date").val();
	
	if(scem_emp_id == "")
	{
		alert('Select Emp id');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Supervisor/STeacherAttendance/punchInOutStaffAttedance",
			type: 'post',
			data:{'scem_emp_id':scem_emp_id,'attendance_status':attendance_status, 'attendance_date':attendance_date},
			cache: false,
			success: function(response) 
			{
				$('#modal-check-in-out').modal('show');
				$("#attendanceModelTitle").text('Check In Time');
				$("#StaffAttendanceEmployeeData").empty();
				$("#StaffAttendanceEmployeeData").html(response);
        
			}
		});
	}
}


//When staff Punch Out
function loadPunchOut(scem_emp_id, attendance_status)
{
	var attendance_date = $("#attendance_date").val();
	
	if(scem_emp_id == "")
	{
		alert('Select Emp id');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Supervisor/STeacherAttendance/punchInOutStaffAttedance",
			type: 'post',
			data:{'scem_emp_id':scem_emp_id,'attendance_status':attendance_status, 'attendance_date':attendance_date},
			cache: false,
			success: function(response) 
			{
				$('#modal-check-in-out').modal('show');
				$("#attendanceModelTitle").text('Check Out Time');
				$("#StaffAttendanceEmployeeData").empty();
				$("#StaffAttendanceEmployeeData").html(response);
        
			}
		});
	}
}


//When staff Save Staff Attendance in database
function saveStaffAttendanceBySupervisor()
{
	//var row = $(this).parents('.item-row');
	var attendance_time_bind = $("#attendance_time_bind").val();
	var employee_id_bind = $("#employee_id_bind").val();
	var attendance_status_bind = $("#attendance_status_bind").val();
	var attendance_date_bind = $("#attendance_date_bind").val();
	var attendance_acdemic_year_bind = $("#attendance_acdemic_year_bind").val();
	//console.log(attendance_time_bind);
	if(attendance_time_bind=="")
	{
		alert('Select in time');
	}
	else
	{
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Supervisor/STeacherAttendance/saveStaffAttendanceBySupervisor",
			type: 'post',
			data:{'employee_id_bind':employee_id_bind,'attendance_time_bind':attendance_time_bind, 'attendance_status_bind':attendance_status_bind, 'attendance_date_bind':attendance_date_bind, 'attendance_acdemic_year_bind':attendance_acdemic_year_bind},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#modal-check-in-out').modal('hide');
				if(attendance_status_bind=='in'){
				$('#punchInBtnBind-'+employee_id_bind).prop('disabled', true);
				}else{
					$('#punchInBtnBind-'+employee_id_bind).prop('disabled', true);
					$('#punchOutBtnBind-'+employee_id_bind).prop('disabled', true);
				}
				if(response['response']['error'] == 'false')
				{
					alert(response['response']['message']);
				}
				else{
					alert(response['response']['message']);
				}
			}
		});
	}
}


//Get Student attendance Pie Chart Report
function getStudentAttendanceListByDate_BarReport(date)
{
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Management/MSchool/getStudentAttendanceListByDate_BarReport",
			type: 'post',
			data:{'date':date},
			cache: false,
			success: function(response) 
			{
				$("#studentAttendanceListData_ReportData").empty();
				$("#studentAttendanceListData_ReportData").html(response);
        
        }
			
		});
	}
}


//Get Staff attendance Pie Chart Report
function getStaffAttendanceListByDate_PieReport(date)
{
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Management/MSchool/getStaffAttendanceListByDate_PieReport",
			type: 'post',
			data:{'date':date},
			cache: false,
			success: function(response) 
			{
				$("#staffAttendanceListData_ReportData").empty();
				$("#staffAttendanceListData_ReportData").html(response);
        }
			
		});
	}
}


//Get Student attendance in detail model
function loadStudentAttendanceListByDate_InDetailModel(class_id, div_id)
{
	var date = $("#student_attendance_date").val();
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Management/MSchool/loadStudentAttendanceListByDate_InDetailModel",
			type: 'post',
			data:{'class_id':class_id,'div_id':div_id,'date':date},
			cache: false,
			success: function(response) 
			{
				$('#modal-detail').modal('show');
				$("#StudentStaffModelTitle").text('Student Attedance In Detail '+date);
				$("#StudentStaffAttendanceDataInDetail").empty();
				$("#StudentStaffAttendanceDataInDetail").html(response);
			}
			
		});
	}
}


//Get Staff attendance in detail model
function loadStaffAttendanceListByDate_InDetailModel()
{
	var date = $("#staff_attendance_date").val();
	if(date == "")
	{
		alert('Select Date Fields');
	}
	else
	{
		$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Management/MSchool/loadStaffAttendanceListByDate_InDetailModel",
			type: 'post',
			data:{'date':date},
			cache: false,
			success: function(response) 
			{
				$('#modal-detail').modal('show');
				$("#StudentStaffModelTitle").text('Staff Attedance In Detail '+date);
				$("#StudentStaffAttendanceDataInDetail").empty();
				$("#StudentStaffAttendanceDataInDetail").html(response);
			}
			
		});
	}
}


//Get Book Issue details
function getIssueBookDetails(student_id)
{
	var class1 = $("#class_id").val();
	var division = $("#div").val();
	if(class1 == "" || division == ""|| student_id == "")
	{  
		alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/Librarian/BookReturn/getIssueBookDetails",
			type: 'post',
			data:{'scbs_class_id':class1,'scbs_div_id':division,'scbs_stud_id':student_id},
			cache: false,
			success: function(response) 
			{
				$("#studentBookIssueData").empty();
				$("#studentBookIssueData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No Record found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}


//At student regitration check contact number exist for staff 
function checkcontactnumberexistforstaff()
{
	var scpt_contact1 = $("#scpt_contact1").val();
	if(scpt_contact1 == "")
	{  	 
	}
	else
	{
        $.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentRegistration/checkcontactnumberexistforstaff",
			type: 'post',
			data:{'scpt_contact1':scpt_contact1},
			cache: false,
			success: function(response) 
			{
				if(response['response']['error'] == 'false')
				{
					$("#contactnumberexist").html(response['response']['message']);
					$('#register_btn').prop('disabled', true);
				}
				else{
					
					$("#contactnumberexist").html('');
					$('#register_btn').prop('disabled', false);
				}
			}
			
		});
	}
}






/*----------------------------------------------*/














$(document).ready(function(){
        $('.btnadd').change(function(){
            var checkValues = $('input[name=inlineRadioOptions]:checked').map(function()
            {
                //return $(this).val();
				//console.log($(this).val());
				var checkboxVal = $(this).val();
				if(checkboxVal == 'cash')
				{
					$('#refferance').hide();
				}else{
					$('#refferance').show();
				}
            }).get();
           
        });
    });



// Student registration form validation
function validateStudentRegistration()
{
	
	$('#studentRegistrationForm').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			student_fname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter first name'
					}
				}
			},
			student_mname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					}
				}
			},
			student_lname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter last name'
					}
				}
			},
			gender: {
				validators: {
					notEmpty: {
						message: 'Please select gender'
					}
				}
			},
			scst_dob: {
				validators: {
					notEmpty: {
						message: 'Please select date'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			birth_place: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					}
				}
			},
			stud_religion: {
				validators: {
					notEmpty: {
						message: 'Please select religion'
					}
				}
			},
			stud_caste: {
				validators: {
					notEmpty: {
						message: 'Please select caste'
					}
				}
			}, 
			
			student_height: {
				validators: {
					regexp: {
						regexp: /^[+-]?\d+(\.\d+)?$/,
						message: 'Please add only digit'
					}
				}
			},
			student_weight: {
				validators: {
					regexp: {
						regexp: /^[+-]?\d+(\.\d+)?$/,
						message: 'Please add only digit'
					}
				}
			},
			aadhar_number: {
				validators: {
					stringLength: {
						min: 12,
						max: 12,
						message:'Please add valid aadhar number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter aadhar number'
					}
				}
			},
			scst_identity:{
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter identity number'
					}
				}
			},
			scst_pblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},
			scst_pstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},
			scst_pcountry_id: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
			scst_pstate_id: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
			scst_pzipcode: {
				validators: {
					stringLength: {
						min: 6,
						max: 6,
						message:'Please add 6 digit zipcode'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter 6 digit zipcode'
					}
				}
			},
			scst_cblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},
			scst_cstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},
			scst_ccountry_id: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
			scst_cstate_id: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
			scst_czipcode: {
				validators: {
					stringLength: {
						min: 6,
						max: 6,
						message:'Please add 6 digit zipcode'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter 6 digit zipcode'
					}
				}
			},
			scst_contact1: {
				validators: {
					stringLength: {
						min: 10,
						max: 10,
						message:'Please add 10 digit contact number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					}
				}
			},
			scst_contact2: {
				validators: {
					stringLength: {
						min: 10,
						max: 10,
						message:'Please add 10 digit contact number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					}
				}
			},
			scst_phy_disable: {
				validators: {
					notEmpty: {
						message: 'Please select physically disabled'
					}
				}
			},
			scst_mother_tounge: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter mother tounge'
					}
				}
			},
			scpt_ftr_fname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter father first name'
					}
				}
			},
			scpt_ftr_mname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					}
				}
			},
			scpt_ftr_lname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter father last name'
					}
				}
			},
			scpt_ftr_quali: {
				validators: {
					notEmpty: {
						message: 'Please select qualification'
					}
				}
			},
			scpt_ftr_occupation_type: {
				validators: {
					notEmpty: {
						message: 'Please select occupation type'
					}
				}
			},
			scpt_ftr_occu: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter occupation '
					}
				}
			},
			scpt_ftr_employername: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					}
				}
			},
			scpt_ftr_income: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter annual income'
					}
				}
			},
			scpt_ftr_uid: {
				validators: {
					stringLength: {
						min: 12,
						max: 12,
						message:'Please add valid aadhaar number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter father aadhaar number'
					}
				}
			},
			scpt_femail: {
				validators: {
					// regexp: {
						// regexp: /^[a-zA-Z ]+$/,
						// message: 'Please add only characters'
					// },
					notEmpty: {
						message: 'Please enter father email id'
					}
				}
			}, 
			scpt_ftr_employer_add: {
				validators: {
					notEmpty: {
						message: 'Please enter father office address'
					}
				}
			}, 
			scpt_mtr_fname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter mother first name'
					}
				}
			},
			scpt_mtr_mname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					}
				}
			},
			scpt_mtr_lname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter mother last name'
					}
				}
			},
			scpt_mtr_quali: {
				validators: {
					notEmpty: {
						message: 'Please select qualification'
					}
				}
			},
			scpt_mtr_occupation_type: {
				validators: {
					notEmpty: {
						message: 'Please select occupation type'
					}
				}
			},
			scpt_mtr_occu: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter occupation '
					}
				}
			},
			scpt_mtr_employername: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					}
				}
			},
			scpt_mtr_income: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter annual income'
					}
				}
			},
			scpt_mtr_uid: {
				validators: {
					stringLength: {
						min: 12,
						max: 12,
						message:'Please add valid aadhaar number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter father aadhaar number'
					}
				}
			},
			scpt_memail: {
				validators: {
					// regexp: {
						// regexp: /^[a-zA-Z ]+$/,
						// message: 'Please add only characters'
					// },
					notEmpty: {
						message: 'Please enter father email id'
					}
				}
			}, 
			scpt_mtr_employer_add: {
				validators: {
					notEmpty: {
						message: 'Please enter father office address'
					}
				}
			}, 
			scpt_contact1: {
				validators: {
					stringLength: {
						min: 10,
						max: 10,
						message:'Please add 10 digit contact number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digit'
					},
					notEmpty: {
						message: 'Please enter parents contact number'
					}
				}
			},
			scpt_contact2: {
				validators: {
					stringLength: {
						min: 10,
						max: 10,
						message:'Please add 10 digit contact number'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digit'
					}
				}
			},
			scpt_pblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},
			scpt_pstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},
			scpt_pcountry: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
			scpt_pstate: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
			scpt_pzipcode: {
				validators: {
					stringLength: {
						min: 6,
						max: 6,
						message:'Please add 6 digit zipcode'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter 6 digit zipcode'
					}
				}
			},
			scpt_cblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},
			scpt_cstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},
			scpt_ccountry: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
			scpt_cstate: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
			scpt_czipcode: {
				validators: {
					stringLength: {
						min: 6,
						max: 6,
						message:'Please add 6 digit zipcode'
					},
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only digits'
					},
					notEmpty: {
						message: 'Please enter 6 digit zipcode'
					}
				}
			},
			 first_sibling_name: {
				 validators: {
					 regexp: {
						 regexp: /^[a-zA-Z ]+$/,
						 message: 'Please add only characters'
					 } 
				 }
			 },
			 first_sibling_age: {
				 validators: {
					 stringLength: {
						 max: 3,
						 max: 12,
						 message:'Please add valid age'
					 },
					 regexp: {
						 regexp: /^[0-9]+$/,
						 message: 'Please add only digit'
					 }
				 }
			 },
			 first_sibling_work: {
				 validators: {
					 regexp: {
						 regexp: /^[a-zA-Z ]+$/,
						 message: 'Please add only characters'
					 }
				 }
			 },
		    second_sibling_name: {
				 validators: {
					 regexp: {
						 regexp: /^[a-zA-Z ]+$/,
						 message: 'Please add only characters'
					 }
				 }
			 },
			 second_sibling_age: {
				 validators: {
					 stringLength: {
						 max: 3,
						 max: 12,
						 message:'Please add valid age'
					 },
					 regexp: {
						 regexp: /^[0-9]+$/,
						 message: 'Please add only digit'
					 }
				 }
			 },
			 second_sibling_work: {
				 validators: {
					 regexp: {
						 regexp: /^[a-zA-Z ]+$/,
						 message: 'Please add only characters'
					 }
				 }
			 },
			 scad_acdmic_yr: {
					notEmpty: {
						message: 'Please select year'
					}
			 },
			 scad_admission_date: {
					notEmpty: {
						message: 'Please select date'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
			 },
			 scad_class: {
					notEmpty: {
						message: 'Please select class'
					}
			 },
			 scad_course: {
					notEmpty: {
						message: 'Please select course'
					}
			 }
		}
	});
	 $('#scst_dob').on('changeDate show', function(e) {
	   $('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scst_dob');
	 });
	 $('#scad_admission_date').on('changeDate show', function(e) {
	   $('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scad_admission_date');
	 });

	/*  $("#scpt_ftr_fname").blur(function () {
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_fname');
	 });
	 $("#scpt_ftr_mname").blur(function () {
	  $('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_mname');
	 });
	 $("#scpt_ftr_lname").blur(function () {
		 $('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_lname');
	 }); */
		
}

// Add class form validation
function validateAddClass()
{
	$('#addClass').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class_name: {
				validators: {
					notEmpty: {
						message: 'Please enter class name'
					}
				}
			}
		}
	});
	
}

// Add division form validation
function validateAddDivision()
{
	$('#addDivision').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			division_name: {
				validators: {
					notEmpty: {
						message: 'Please enter division name'
					}
				}
			}
		}
	});
	
}


// Add subject form validation
function validateAddSubject()
{
	$('#addSubject').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			},
			subject_name: {
				validators: {
					notEmpty: {
						message: 'Please enter subject name'
					}
				}
			}
		}
	});
	
}

// Add time slot form validation
function validateAddTimeSlot()
{
	$('#timeSlot').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			slot_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter slot name'
					}
				}
			},
			working_days: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter working days'
					}
				}
			},
			timing: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter timing'
					}
				}
			}
		}
	});
	
}

// Create Department form validation
function validateCreateDepartment()
{
	$('#createDepartment').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scdp_dept_name: {
				validators: {
					notEmpty: {
						message: 'Please enter name'
					}
				}
			}
		}
	});
	
}

// Create Designation form validation
function validateCreateDesignation()
{
	$('#createDesignation').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scdg_designation: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter name'
					}
				}
			}
		}
	});
	
}

// Add Fees Category form validation
function validateFeesCategory()
{
	$('#addFeesCaterory').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scfc_fee_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter fees name'
					}
				}
			},
			scfc_fee_category: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please select category'
					}
				}
			}
		}
	});
	
}

// Add Fees class mapping form validation
function validateFeesClassMapping()
{
	$('#feesClassMapping').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			sfcc_fee_id: {
				validators: {
					notEmpty: {
						message: 'Please select fees id'
					}
				}
			},
			sfcc_class_id: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			sfcc_amount: {
				validators: {
					regexp: {
						regexp: /^[0-9.]+$/,
						message: 'Please add only digit'
					},
					notEmpty: {
						message: 'Please enter amount'
					}
				}
			}
		}
	});
	
}


// Add financial year form validation
function validateFinancialYear()
{
	$('#addFinancialYear').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			financial_year_name: {
				validators: {
					regexp: {
						regexp: /(\b19|\b20)\d\d-\d\d/,
						message: 'Please add valid academic year ex. 2019-20'
					},
					notEmpty: {
						message: 'Please enter financial year name'
					}
				}
			},
			term: {
				validators: {
					notEmpty: {
						message: 'Please select term'
					}
				}
			},
			fromdate: {
				validators: {
					notEmpty: {
						message: 'Please select from date'
					},
					 date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			todate: {
				validators: {
					notEmpty: {
						message: 'Please select to date'
					},
					 date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
		}
	});
	 $('#fromdate').on('changeDate show', function(e) {
	   $('#addFinancialYear').bootstrapValidator('revalidateField', 'fromdate');
	 }); 
	 $('#todate').on('changeDate show', function(e) {
	   $('#addFinancialYear').bootstrapValidator('revalidateField', 'todate');
	 });
}

// Add religion form validation
function validateReligion()
{
	$('#addReligion').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			religion_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters'
					},
					notEmpty: {
						message: 'Please enter religion name'
					}
				}
			}
		}
	});
	
}

function showState(countryId,valueString="")
{
	var options = "";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/getState",
			type: 'post',
			data:{'sstt_country_code':countryId},
			cache: false,
			success: function(response) 
			{
				if(valueString == "permanentState")
				{
					$(".state").empty(options);
					options += '<option value="" >Select State</option>';
					$.each(response['response']['data']['state'],function(key,val)
					{
						options += '<option value='+val['sstt_state']+'>'+val['sstt_name']+'</option>';
					});
					$(".state").append(options);
				}
				else if(valueString == "currentState")
				{
					$(".cstate").empty(options);
					options += '<option value="" >Select State</option>';
					$.each(response['response']['data']['state'],function(key,val)
					{
						options += '<option value='+val['sstt_state']+'>'+val['sstt_name']+'</option>';
					});
					$(".cstate").append(options);
				}
				else if(valueString == "parentPermanentState")
				{
					$(".parentPermanentState").empty(options);
					options += '<option value="" >Select State</option>';
					$.each(response['response']['data']['state'],function(key,val)
					{
						options += '<option value='+val['sstt_state']+'>'+val['sstt_name']+'</option>';
					});
					$(".parentPermanentState").append(options);
				}
				else if(valueString == "parentCurrentState")
				{
					$(".parentCurrentState").empty(options);
					options += '<option value="" >Select State</option>';
					$.each(response['response']['data']['state'],function(key,val)
					{
						options += '<option value='+val['sstt_state']+'>'+val['sstt_name']+'</option>';
					});
					$(".parentCurrentState").append(options);
				}
				else
				{
					$(".state").empty(options);
					options += '<option value="" >Select State</option>';
					$.each(response['response']['data']['state'],function(key,val)
					{
						options += '<option value='+val['sstt_state']+'>'+val['sstt_name']+'</option>';
					});
					$(".state").append(options);
				}
			}	
	});
}

function showStaffDetails()
{
	$.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/CreateStaff/getStaffDetails",
			type: 'post',
			cache: false,
			success: function(response) 
			{
				$("#staffDetails").html(response);
			}	
	});
}

function showCaste(religionId)
{
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentRegistration/getCasteByReligion",
			type: 'post',
			data:{'scct_religion_id':religionId},
			cache: false,
			success: function(response) 
			{
				if(response['response']['data']['caste'].length > 0)
				{
					$("#caste").empty();
					options += '<option value="">Select Caste</option>';
					$.each(response['response']['data']['caste'],function(key,val)
					{
						options += '<option value="'+val['id']+'">'+val["scct_cast_name"]+'</option>';
					});
				}
				else
				{
					$("#caste").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#caste").append(options);
			}	
	});
}

function showCasteCategory(casteId)
{
	
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentRegistration/showCasteCategory",
			type: 'post',
			data:{'casteId':casteId},
			cache: false,
			success: function(response) 
			{
				
				if(response['response']['data']['category'].length > 0)
				{
					$("#category").empty();
					options += '<option value="">Select Category</option>';
					$.each(response['response']['data']['category'],function(key,val)
					{
						options += '<option value="'+val['scsc_cast_category']+'">'+val["scsc_cast_category"]+'</option>';
					});
				}
				else
				{
					$("#category").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#category").append(options);
			}	
	});
}
function showSubCaste(categoryId)
{
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentRegistration/showSubCaste",
			type: 'post',
			data:{'categoryId':categoryId},
			cache: false,
			success: function(response) 
			{
				if(response['response']['data']['subcast'].length > 0)
				{
					$("#subCaste").empty();
					options += '<option value="">Select Sub-Caste</option>';
					$.each(response['response']['data']['subcast'],function(key,val)
					{
						options += '<option value="'+val['id']+'">'+val["scsc_subcast_name"]+'</option>';
					});
				}
				else
				{
					$("#subCaste").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#subCaste").append(options);
			}	
	});
}
function classChangeGetStudent(classId)
{
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/classChangeGetStudent",
			type: 'post',
			data:{'classId':classId},
			cache: false,
			success: function(response) 
			{
				if(response['response']['data']['student'].length > 0)
				{
					
					$("#student").empty();
					options += '<option value="">Select Student</option>';
					$.each(response['response']['data']['student'],function(key,val)
					{
						options += '<option value="'+val['scad_stud_id']+'">'+val["scst_fname"]+' '+val["scst_mname"]+' '+val["scst_lname"]+' ('+val['scad_stud_id']+')</option>';
					});
					
					showAcademicYear(classId);
				}
				else
				{
					$("#student").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#student").append(options);
			}	
	});
}
function showAcademicYear(classId)
{
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/classChangeGetStudent",
			type: 'post',
			data:{'classId':classId},
			cache: false,
			success: function(response) 
			{
				
				if(response['response']['data']['student'].length > 0)
				{
					$("#academicYear").empty();
					options += '<option value="">Select Academic Year</option>';
					$.each(response['response']['data']['student'],function(key,val)
					{
						options += '<option value="'+val['scad_acdmic_yr']+'">'+val["scad_acdmic_yr"]+'</option>';
					});
				}
				else
				{
					$("#academicYear").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#academicYear").append(options);
			}	
	});
}
function showGroups(classId)
{ 
		var options="";
		$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Login/classChangeGetStudent",
			type: 'post',
			data:{'classId':classId},
			cache: false,
			success: function(response) 
			{
				if(response['response']['data']['group'].length > 0)
				{
					
					$("#group").empty();
					options += '<option value="">Select Group</option>';
					$.each(response['response']['data']['group'],function(key,val)
					{
						options += '<option value="'+val['group_id']+'">'+val["group_id"]+'</option>';
					});
				}
				else
				{
					$("#group").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#group").append(options);
			}	
	});
}



function get_book_batch_id(bookid)
{
 
	var options="";
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/Librarian/BookIssue/getBookBatchIdFromBookID",
			type: 'post',
			data:{'scbi_book_id':bookid},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				if(response['response']['data']['books_by_id'].length > 0)
				{
					$("#scbs_batch_no").empty();
					options += '<option value="">Select Batch</option>';
					$.each(response['response']['data']['books_by_id'],function(key,val)
					{
						options += '<option value="'+val['scbi_batch_no']+'">'+val["scbi_batch_no"]+'('+val["scbi_available_books"]+')</option>';
					});
				}
				else
				{
					$("#scbs_batch_no").empty();
					options += '<option value="">Data Not Available</option>';
				}
				$("#scbs_batch_no").append(options);
			}	
	});
}

function checkBookAvailableQuantity(batchid)
{
	
	var batno = $("#scbs_batch_no option:selected").text()
	var regExp = /\(([^)]+)\)/;
	var matches = regExp.exec(batno);
	
	if(matches[1]>0)
	{
		$('#bookQtyWarningMsg').hide();
		$('#bookissuebtn').prop('disabled', false);
	}else{
		$('#bookQtyWarningMsg').show();
		$('#bookissuebtn').prop('disabled', true);
	}
	 
}

function getAutoFillParentContact(e)
{	
	$("#scpt_contact1").autocomplete({
		source:baseUrl+"index.php/AcademicAdmin/StudentRegistration/getAutoFillParentContact",
		//minLength: 3,
		select:function(event,ui){
			//event.preventDefault();
			//alert('hi'); 
			//alert(ui.item.value); 
					$.ajax({
					dataType: 'json',
					url: baseUrl+"index.php/AcademicAdmin/StudentRegistration/getParentDataFromContact",
					type: 'post',
					data:{'scpt_contact1':ui.item.value},
					cache: false,
					success: function(response) 
					{
						if(response['response']['data']['student'].length > 0)
						{
							$('#scpt_ftr_fname').val(response['response']['data']['student'][0]['scpt_ftr_fname']);
							$('#scpt_ftr_mname').val(response['response']['data']['student'][0]['scpt_ftr_mname']);
							$('#scpt_ftr_lname').val(response['response']['data']['student'][0]['scpt_ftr_lname']);
							
							
							
							if(response['response']['data']['student'][0]['scpt_ftr_quali'] !=='')
							{
								$("#scpt_ftr_quali option[value="+response['response']['data']['student'][0]['scpt_ftr_quali']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_ftr_occupation_type'] !=='')
							{
								$("#scpt_ftr_occupation_type option[value="+response['response']['data']['student'][0]['scpt_ftr_occupation_type']+"]").attr('selected', 'selected');
							}
							$('#scpt_ftr_occu').val(response['response']['data']['student'][0]['scpt_ftr_occu']);
							if(response['response']['data']['student'][0]['scpt_ftr_employername'] !=='')
							{
							$('#scpt_ftr_employername').val(response['response']['data']['student'][0]['scpt_ftr_employername']);
							}
							$('#scpt_ftr_income').val(response['response']['data']['student'][0]['scpt_ftr_income']);
							$('#scpt_ftr_uid').val(response['response']['data']['student'][0]['scpt_ftr_uid']);
							$('#scpt_femail').val(response['response']['data']['student'][0]['scpt_femail']);
							$('#scpt_ftr_employer_add').val(response['response']['data']['student'][0]['scpt_ftr_employer_add']);
							$('#scpt_mtr_fname').val(response['response']['data']['student'][0]['scpt_mtr_fname']);
							$('#scpt_mtr_mname').val(response['response']['data']['student'][0]['scpt_mtr_mname']);
							$('#scpt_mtr_lname').val(response['response']['data']['student'][0]['scpt_mtr_lname']);
							if(response['response']['data']['student'][0]['scpt_mtr_quali'] !=='')
							{
							$("#scpt_mtr_quali option[value="+response['response']['data']['student'][0]['scpt_mtr_quali']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_mtr_occupation_type'] !=='')
							{
							$("#scpt_mtr_occupation_type option[value="+response['response']['data']['student'][0]['scpt_mtr_occupation_type']+"]").attr('selected', 'selected');
							}
							$('#scpt_mtr_occu').val(response['response']['data']['student'][0]['scpt_mtr_occu']);
							$('#scpt_mtr_employername').val(response['response']['data']['student'][0]['scpt_mtr_employername']);
							$('#scpt_mtr_income').val(response['response']['data']['student'][0]['scpt_mtr_income']);
							$('#scpt_mtr_uid').val(response['response']['data']['student'][0]['scpt_mtr_uid']);
							$('#scpt_memail').val(response['response']['data']['student'][0]['scpt_memail']);
							$('#scpt_mtr_employer_add').val(response['response']['data']['student'][0]['scpt_mtr_employer_add']);
							$('#scpt_contact2').val(response['response']['data']['student'][0]['scpt_contact2']);
							$('#scpt_pblock').val(response['response']['data']['student'][0]['scpt_pblock']);
							$('#scpt_pstreet').val(response['response']['data']['student'][0]['scpt_pstreet']);
							if(response['response']['data']['student'][0]['scpt_pcountry'] !=='')
							{
							//$("#scpt_pcountry option[value="+response['response']['data']['student'][0]['scpt_pcountry']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_pstate'] !=='')
							{
							$("#scpt_pstate option[value="+response['response']['data']['student'][0]['scpt_pstate']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_pzipcode'] !=='')
							{
							$('#scpt_pzipcode').val(response['response']['data']['student'][0]['scpt_pzipcode']);
							}
							if(response['response']['data']['student'][0]['scpt_cblock'] !=='')
							{
							$('#scpt_cblock').val(response['response']['data']['student'][0]['scpt_cblock']);
							}
							if(response['response']['data']['student'][0]['scpt_cstreet'] !=='')
							{
							$('#scpt_cstreet').val(response['response']['data']['student'][0]['scpt_cstreet']);
							}
							if(response['response']['data']['student'][0]['scpt_ccountry'] !=='')
							{
							//$("#scpt_ccountry option[value="+response['response']['data']['student'][0]['scpt_ccountry']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_cstate'] !=='')
							{
							$("#scpt_cstate option[value="+response['response']['data']['student'][0]['scpt_cstate']+"]").attr('selected', 'selected');
							}
							if(response['response']['data']['student'][0]['scpt_czipcode'] !=='')
							{
							$('#scpt_czipcode').val(response['response']['data']['student'][0]['scpt_czipcode']);
							}
							
							//validate form fileds
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_contact1');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_fname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_mname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_lname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_quali');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_occupation_type');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_occu');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_employername');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_income');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_uid');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_femail');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ftr_employer_add');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_fname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_mname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_lname');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_quali');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_occupation_type');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_occu');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_employername');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_income');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_uid');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_memail');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_mtr_employer_add');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_contact2');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_pblock');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_pstreet');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_pcountry');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_pstate');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_pzipcode');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cblock');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cstreet');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ccountry');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cstate');
							$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_czipcode');
							 
							if(response['response']['data']['sibling'].length > 0)
							{
								if(response['response']['data']['sibling'][0]['scst_sibling_name1'] !=='')
								{
								$('#first_sibling_name').val(response['response']['data']['sibling'][0]['scst_sibling_name1']);
								}
								if(response['response']['data']['sibling'][0]['first_sibling_age1'] !=='')
								{
								$('#first_sibling_age').val(response['response']['data']['sibling'][0]['first_sibling_age1']);
								}
								if(response['response']['data']['sibling'][0]['first_sibling_work1'] !=='')
								{
								$('#first_sibling_work').val(response['response']['data']['sibling'][0]['first_sibling_work1']);
								}
								if(response['response']['data']['sibling'][0]['second_sibling_name2'] !=='')
								{
								$('#second_sibling_name').val(response['response']['data']['sibling'][0]['second_sibling_name2']);
								}
								if(response['response']['data']['sibling'][0]['second_sibling_age2'] !=='')
								{
								$('#second_sibling_age').val(response['response']['data']['sibling'][0]['second_sibling_age2']); 
								}
								if(response['response']['data']['sibling'][0]['second_sibling_work2'] !=='')
								{
								$('#second_sibling_work').val(response['response']['data']['sibling'][0]['second_sibling_work2']); 
								} 
								
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'first_sibling_name');
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'first_sibling_age');
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'first_sibling_work');
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'second_sibling_name');
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'second_sibling_age');
								$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'second_sibling_work');
							}
							
						}
						else
						{
							 
						}
						
					}	
			});
		}
	});	
	 
}


// Book Master form validation
function validateBookMasterForm()
{
	$('#bookMaster').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scbm_book_name: {
				validators: {
					/* regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters and number'
					}, */
					notEmpty: {
						message: 'Please enter book name'
					}
				}
			},
			scbm_auther: {
				validators: {
					/* regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters and number'
					}, */
					notEmpty: {
						message: 'Please enter auther name'
					}
				}
			},
			scbm_publication: {
				validators: {
					/* regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters and number'
					}, */
					notEmpty: {
						message: 'Please enter publication name'
					}
				}
			},
			scbm_category: {
				validators: {
					/* regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters and number'
					}, */
					notEmpty: {
						message: 'Please enter category name'
					}
				}
			},
			scbm_isbn_no: {
				validators: {
					/* regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please add only characters and number'
					}, */
					notEmpty: {
						message: 'Please enter ISBN no.'
					}
				}
			}
		}
	});
	
}

// Book Inward form validation
function validateBookInward()
{
	$('#bookInward').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scbi_book_id: {
				validators: {
					notEmpty: {
						message: 'Please enter book name'
					}
				}
			},
			scbi_quantity: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please add only number'
					},
					notEmpty: {
						message: 'Please enter quantity'
					}
				}
			}
		}
	});
	
}

// Create Department form validation
function validateCreateDepartment()
{
	$('#createDepartment').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scdp_dept_name: {
				validators: {
					notEmpty: {
						message: 'Please enter department name'
					}
				}
			}
		}
	});
	
}


// Add caste category form validation
function validateCasteCategory()
{
	$('#casteCategory').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			sccc_category: {
				validators: {
					notEmpty: {
						message: 'Please enter category'
					}
				}
			}
		}
	});
	
}

// Add Qalification form validation
function validateAddQualification()
{
	$('#addQualification').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scqa_qualification: {
				validators: {
					notEmpty: {
						message: 'Please enter name'
					}
				}
			},
			scqa_remark: {
				validators: {
					notEmpty: {
						message: 'Please enter something'
					}
				}
			}
		}
	});
}

function validateExamType()
{
	$('#examTypeForm').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			examType: {
				validators: {
					notEmpty: {
						message: 'Please enter exam type'
					}
				}
			},
			scxt_type: {
				validators: {
					notEmpty: {
						message: 'Please select type'
					}
				}
			}
		}
	});
}
function validateExamMaster()
{
	$('#examMasterForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			examType: {
				validators: {
					notEmpty: {
						message: 'Please select exam type'
					}
				}
			},
			fromDate: {
				validators: {
					notEmpty: {
						message: 'Please select from date'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			toDate: {
				validators: {
					notEmpty: {
						message: 'Please select to date'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			termYear: {
				validators: {
					notEmpty: {
						message: 'Please select term year'
					}
				}
			},
			academicYear: {
				validators: {
					notEmpty: {
						message: 'Please select academic year'
					}
				}
			},
		}
	});
	 $('#fromDate').on('changeDate show', function(e) {
	   $('#examMasterForm').bootstrapValidator('revalidateField', 'fromDate');
	 });
	  $('#toDate').on('changeDate show', function(e) {
	   $('#examMasterForm').bootstrapValidator('revalidateField', 'toDate');
	 });
}
function validateExamTimeTable()
{
	$('#examTimeTableForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			examMasterId: {
				validators: {
					notEmpty: {
						message: 'Please select exam type'
					}
				}
			},
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			},
			'subject[]': {
				validators: {
					notEmpty: {
						message: 'Please select subject'
					}
				}
			},
			'examDate[]': {
				validators: {
					notEmpty: {
						message: 'Please select exam date'
					}
				}
			},
			'paperType[]': {
				validators: {
					notEmpty: {
						message: 'Please select paper type'
					}
				}
			},
			'totalMarks[]': {
				validators: {
					notEmpty: {
						message: 'Please add total marks'
					}
				}
			},
			'numOfQuestion[]': {
				validators: {
					notEmpty: {
						message: 'Please add number of questions'
					}
				}
			},
			'examStartTime[]': {
				validators: {
					notEmpty: {
						message: 'Please select exam start time'
					}
				}
			},
			'examEndTime[]': {
				validators: {
					notEmpty: {
						message: 'Please select exam end time'
					}
				}
			}
		}
	});
	var dynamicDate = document.getElementsByClassName("datepicker");
	
	for(var k=0; k<dynamicDate.length; k++ )
	{
		$('#examDate_'+k).on('changeDate show', function(e) {
			$('#examTimeTableForm').bootstrapValidator('revalidateField', 'examDate[]');
		});
		$('#examStartTime_'+k).on('changeTime.timepicker show', function(e) {
			$('#examTimeTableForm').bootstrapValidator('revalidateField', 'examStartTime[]');
		});
		$('#examEndTime_'+k).on('changeTime.timepicker show', function(e) {
			$('#examTimeTableForm').bootstrapValidator('revalidateField', 'examEndTime[]');
		});
	}
}
function validateAddHall()
{
	$('#addHallForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			hall: {
				validators: {
					notEmpty: {
						message: 'Please enter hall name'
					}
				}
			},
			seatCapacity: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digits'
					},
					notEmpty: {
						message: 'Please enter hall capacity'
					}
				}
			},
			hallStatus: {
				validators: {
					notEmpty: {
						message: 'Please select hall status'
					}
				}
			}
		}
	});
}
function validateAddTax()
{
	$('#addTaxForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			taxName: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only characters'
					},
					notEmpty: {
						message: 'Please enter tax name'
					}
				}
			},
			taxRate: {
				validators: {
					regexp: {
						regexp: /^[0-9.]+$/,
						message: 'Please enter only digits'
					},
					notEmpty: {
						message: 'Please enter rate'
					}
				}
			}
		}
	});
}
function validateSubjectDivisionMapping()
{
	$('#subjectDivisionMappingForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			classId: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			divisionId: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			},
			'subject[]': {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z0-9 ]+$/,
						message: 'Please enter only character and digits'
					},
					notEmpty: {
						message: 'Please enter subject name'
					}
				}
			}
		}
	});
}
function validateSubjectEmployeeMapping()
{
	$('#subjectEmployeeMappingForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scse_emp_id: {
				validators: {
					notEmpty: {
						message: 'Please select employee'
					}
				}
			},
			scse_class_id: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			scse_div_id: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			},
			scse_sub_id: {
				validators: {
					notEmpty: {
						message: 'Please select subject'
					}
				}
			},
			scse_type: {
				validators: {
					notEmpty: {
						message: 'Please select type'
					}
				}
			}
		}
	});
}
function validateStudentDivisionMapping()
{
	$('#studentDivMapping').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			division: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			}
		}
	});
}
function validateCreateEvent()
{
	$('#createEventForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			schd_date: {
				validators: {
					notEmpty: {
						message: 'Please select date'
					},
					 date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			schd_event_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter event name'
					}
				}
			},
			schd_event_desc: {
				validators: {
					notEmpty: {
						message: 'Please enter event decription'
					}
				}
			}
		}
	});
	 $('#schd_date').on('changeDate show', function(e) {
	   $('#createEventForm').bootstrapValidator('revalidateField', 'schd_date');
	 });
}
function validateManageHoliday()
{
	$('#manageHolidayForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			holidayDate: {
				validators: {
					notEmpty: {
						message: 'Please select holiday date'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
			holidayName: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter event decription'
					}
				}
			},
			holidayDesc: {
				validators: {
					notEmpty: {
						message: 'Please enter holiday description'
					}
				}
			}
		}
	});
	 $('#holidayDate').on('changeDate show', function(e) {
	   $('#manageHolidayForm').bootstrapValidator('revalidateField', 'holidayDate');
	 });
}
function validatePaymentMethod()
{
	$('#paymentMethodForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			paymentType: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter payment type'
					}
				}
			}
		}
	});
}
function validateCaste()
{
	$('#addCaste').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scct_religion_id: {
				validators: {
					notEmpty: {
						message: 'Please select religion'
					}
				}
			},
			scct_cast_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter caste'
					}
				}
			}
		}
	});
}
function validateSubCaste()
{
	$('#addSubCaste').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scsc_cast_category: {
				validators: {
					notEmpty: {
						message: 'Please select religion'
					}
				}
			},
			scsc_cast_id: {
				validators: {
					notEmpty: {
						message: 'Please select caste'
					}
				}
			},
			scsc_subcast_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter sub-caste'
					}
				}
			}
		}
	});
}
function validateLabEquipments()
{
	$('#addLabEquipmentForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			equipmentName: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter equipment name'
					}
				}
			}
		}
	});
}
function validateCreateStaff()
{
	$('#staffForm').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scem_fname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter first name'
					}
				}
			},
			scem_mname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please enter only character'
					}
				}
			},
			scem_lname: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter last name'
					}
				}
			},scem_gender: {
				validators: {
					notEmpty: {
						message: 'Please select gender'
					}
				}
			},scem_dob: {
				validators: {
					notEmpty: {
						message: 'Please select date of birth'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},scem_uid: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digit'
					},
					stringLength: {
                        max: 12,
						min: 12,
                        message: 'Enter valid aadhaar number'
                    },
					notEmpty: {
						message: 'Please enter aadhaar number'
					}
				}
			},scem_email: {
				validators: {
					notEmpty: {
						message: 'Please enter email id'
					}
				}
			},
			scem_contact1: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digit'
					},
					stringLength: {
                        max: 10,
						min: 10,
                        message: 'Enter valid contact number'
                    },
					notEmpty: {
						message: 'Please enter contact'
					}
				}
			},
			scem_contact2: {
				validators: {
					stringLength: {
                        max: 10,
						min: 10,
                        message: 'Enter valid contact number'
                    },
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digit'
					}
				}
			},
			scem_pblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},scem_pstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},scem_pcountry: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
		scem_pstate: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
		scem_pzipcode: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digit'
					},
					stringLength: {
                        max: 6,
						min: 6,
                        message: 'Enter valid zipcode'
                    },
					notEmpty: {
						message: 'Please enter zipcode'
					}
				}
			},
		scem_cblock: {
				validators: {
					notEmpty: {
						message: 'Please enter house no/name'
					}
				}
			},
		scem_cstreet: {
				validators: {
					notEmpty: {
						message: 'Please enter street name'
					}
				}
			},
		scem_ccountry: {
				validators: {
					notEmpty: {
						message: 'Please select country'
					}
				}
			},
		scem_cstate: {
				validators: {
					notEmpty: {
						message: 'Please select state'
					}
				}
			},
		scem_czipcode: {
				validators: {
					regexp: {
						regexp: /^[0-9]+$/,
						message: 'Please enter only digit'
					},
					stringLength: {
                        max: 6,
						min: 6,
                        message: 'Enter valid zipcode'
                    },
					notEmpty: {
						message: 'Please enter zipcode'
					}
				}
			},
		scem_role_id: {
				validators: {
					notEmpty: {
						message: 'Please select role'
					}
				}
			},
		scem_doj: {
				validators: {
					notEmpty: {
						message: 'Please enter date of joining'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			},
		scem_qualifi: {
				validators: {
					notEmpty: {
						message: 'Please select qualification'
					}
				}
			},
		scem_post: {
				validators: {
					notEmpty: {
						message: 'Please select post'
					}
				}
			},
		scem_department: {
				validators: {
					notEmpty: {
						message: 'Please select department'
					}
				}
			},
		scem_experience: {
				validators: {
					notEmpty: {
						message: 'Please select experience'
					}
				}
			}
		}
	});
	 $('#scem_dob').on('changeDate show', function(e) {
	   $('#staffForm').bootstrapValidator('revalidateField', 'scem_dob');
	 });
	  $('#scem_doj').on('changeDate show', function(e) {
	   $('#staffForm').bootstrapValidator('revalidateField', 'scem_doj');
	 });
}


// Add Country form validation
function validateAddCountry()
{
	
	$('#addCountry').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			sccy_country: {
				validators: {
					notEmpty: {
						message: 'Please enter country code'
					}
				}
			},
			sccy_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter country name'
					}
				}
			}
		}
	});
	
}

// Add State form validation
function validateAddState()
{
	
	$('#addState').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			sstt_country_code: {
				validators: {
					notEmpty: {
						message: 'Please select country name'
					}
				}
			},
			sstt_state: {
				validators: {
					notEmpty: {
						message: 'Please enter country name'
					}
				}
			},
			sstt_name: {
				validators: {
					regexp: {
						regexp: /^[a-zA-Z ]+$/,
						message: 'Please enter only character'
					},
					notEmpty: {
						message: 'Please enter country name'
					}
				}
			}
		}
	});
	
}

// Book Issue form validation
function validateBookIssueForm()
{
	
	$('#issueBookForm').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scbs_book_id: {
				validators: {
					notEmpty: {
						message: 'Please select book'
					}
				}
			},
			scbs_batch_no: {
				validators: {
					notEmpty: {
						message: 'Please select book batch'
					}
				}
			},
			scbs_due_date: {
				validators: {
					notEmpty: {
						message: 'Please select due date'
					}
				}
			},
			scbs_class_id: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			},
			student_list: {
				validators: {
					notEmpty: {
						message: 'Please select student'
					}
				}
			},
			scbs_issue_book_status: {
				validators: {
					notEmpty: {
						message: 'Please enter book status'
					}
				}
			}
		}
	});
	$('#scbs_due_date').on('changeDate show', function(e) {
	   $('#issueBookForm').bootstrapValidator('revalidateField', 'scbs_due_date');
	 });
}

// Student admission form validation
function studentAddmissionValidate()
{
	
	$('#student_addmission_form').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			scad_stud_id: {
				validators: {
					notEmpty: {
						message: 'Please select student'
					}
				}
			},
			scad_acdmic_yr: {
				validators: {
					notEmpty: {
						message: 'Please enter year'
					}
				}
			},
			scad_admission_date: {
				validators: {
					notEmpty: {
						message: 'Please select addmission date'
					}
				}
			},
			scad_class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			scad_course: {
				validators: {
					notEmpty: {
						message: 'Please select course'
					}
				}
			},
			'scrc_paid_amt[]': {
				validators: {
					regexp: {
						regexp: /^[0-9.]+$/,
						message: 'Please add only number'
					},
					notEmpty: {
						message: 'Please enter paid amt or set 0'
					}
				}
			},
			'scrc_taxId[]': {
				validators: {
					notEmpty: {
						message: 'Please select tax or select 0 tax'
					}
				}
			},
			scrh_payment_mode: {
				validators: {
					notEmpty: {
						message: 'Please select payment mode'
					}
				}
			}
		}
	});
	$('#scad_admission_date').on('changeDate show', function(e) {
	   $('#student_addmission_form').bootstrapValidator('revalidateField', 'scad_admission_date');
	 });
}


// Class  form validation
function validateClassTeacherMapping()
{
	
	$('#classTeacherMappingForm').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			sctm_emp_id: {
				validators: {
					notEmpty: {
						message: 'Please select employee'
					}
				}
			},
			sctm_class_id: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			sctm_div_id: {
				validators: {
					notEmpty: {
						message: 'Please select division'
					}
				}
			}
		}
	});
}

//  validation for student attendance by teacher
function validateStudentAttedanceFormByTeacher()
{
	
	$('#studentAttedanceFormByTeacher').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					}
				}
			}
		}
	});
}

//  validation for View student attendance by teacher
function validateStudentAttendanceViewFormByTeacher()
{
	
	$('#studentAttendanceViewFormByTeacher').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					}
				}
			},
			attendance_date: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					},
					date: {
					   format: 'YYYY-MM-DD',
					   message: 'The format is YYYY-MM-DD'
					 }
				}
			}
		}
	});
	$('#attendance_date').on('changeDate show', function(e) {
	   $('#studentAttendanceViewFormByTeacher').bootstrapValidator('revalidateField', 'attendance_date');
	 });
}

//  validation for send message by teacher
function validate_send_message_form_teacher()
{
	$('#send_message_form_teacher').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					}
				}
			},
			parent: {
				validators: {
					notEmpty: {
						message: 'Please select parent'
					}
				}
			},
			teacher_message: {
				validators: {
					notEmpty: {
						message: 'Please enter message'
					}
				}
			}
		}
	});
}

//  validation for assign homework by teacher
function validateAssignHomeworkFormByteacher()
{
	$('#assignHomeworkFormByteacher').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					}
				}
			},
			subject: {
				validators: {
					notEmpty: {
						message: 'Please select subject'
					}
				}
			},
			description: {
				validators: {
					notEmpty: {
						message: 'Please enter description'
					}
				}
			}
		}
	});
}

//  validation for send notice by teacher
function validateSendNoticeFormByTeacher()
{
	$('#sendNoticeFormByTeacher').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			class: {
				validators: {
					notEmpty: {
						message: 'Please select class'
					}
				}
			},
			div: {
				validators: {
					notEmpty: {
						message: 'Please select div'
					}
				}
			},
			notice_title: {
				validators: {
					notEmpty: {
						message: 'Please enter title'
					}
				}
			},
			notice_description: {
				validators: {
					notEmpty: {
						message: 'Please enter decription'
					}
				}
			}
		}
	});
}


//  validation for send message by parent
function validate_send_message_form_parent()
{
	$('#send_message_form_parent').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			teacher: {
				validators: {
					notEmpty: {
						message: 'Please select teacher'
					}
				}
			},
			parent_message: {
				validators: {
					notEmpty: {
						message: 'Please enter message'
					}
				}
			}
		}
	});
}


//  validation for login form
function validateLoginForm()
{
	$('#login_form').bootstrapValidator({
		// To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
			unumber: {
				validators: {
					notEmpty: {
						message: 'Please enter username'
					}
				}
			},
			sl_user_pwd: {
				validators: {
					notEmpty: {
						message: 'Please enter password'
					}
				}
			}
		}
	});
}


	
function showReferenceField(paymentMode)
{
	var bootstrapValidator;
	if(paymentMode == "cheque")
	{
		$("#referanceNo").html('<div id="ref_no_div"><div class="form-group pmd-textfield pmd-textfield-floating-label"><label class="control-label">Cheque No. *</label><input class="form-control" id="ref_no" onkeypress="showRefBtn();" name="ref_no" placeholder="cheque no"></input> </div></div><span id="errorMsg"></span>');
	}
	else if (paymentMode == "dd")
	{
		$("#referanceNo").html('<div id="ref_no_div"><div class="form-group pmd-textfield pmd-textfield-floating-label"><label class="control-label">DD No. *</label><input class="form-control" id="ref_no" onkeypress="showRefBtn();" name="ref_no" placeholder="dd no"></input> </div></div><span id="errorMsg"></span>');
	}
	else if (paymentMode == "etransfer")
	{
		$("#referanceNo").html('<div id="ref_no_div"><div class="form-group pmd-textfield pmd-textfield-floating-label"><label class="control-label">Transaction ID *</label><input class="form-control" id="ref_no" onkeypress="showRefBtn();" name="ref_no" placeholder="transaction id"></input> </div></div><span id="errorMsg"></span>');
	}
	else
	{
		$("#submitData").attr('disabled', false); 
		$("#errorMsg").empty();
		$("#ref_no_div").empty();
		bootstrapValidator = $('#invoiceForm').data('bootstrapValidator');
		
		if(typeof bootstrapValidator === "undefined")
		{	
			$('#ref_no').val('');
		}
		else
		{
			$('#ref_no').val('');
			bootstrapValidator.enableFieldValidators('ref_no', false);
			
		}
	}	

}

function getAllStudentDeatils(student_id)
{
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentAdmission/getStudentDetails",
			type: 'post',
			data:{'scst_student_id':student_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#scem_fname').val(response['response']['data']['student'][0]['scst_fname']);
				$('#scem_mname').val(response['response']['data']['student'][0]['scst_mname']);
				$('#scem_lname').val(response['response']['data']['student'][0]['scst_lname']);
			}	
	});
}

//get student details for cancel addmision
function getAllStudentDeatilForCancelAddmission(student_id)
{
	$.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/CancelAdmission/getStudentDeatilForCancelAddmission",
			type: 'post',
			data:{'scst_student_id':student_id},
			cache: false,
			success: function(response) 
			{
				//console.log(response);
				$('#scad_acdmic_yr').val(response['response']['data']['student'][0]['scad_acdmic_yr']);
				$('#scad_course').val(response['response']['data']['student'][0]['scad_course']);
				$('#scls_class_name').val(response['response']['data']['student'][0]['scls_class_name']);
				$('#scdv_division_name').val(response['response']['data']['student'][0]['scdv_division_name']);
				$('#ssdm_roll_no').val(response['response']['data']['student'][0]['ssdm_roll_no']);
				$('#scst_gender').val(response['response']['data']['student'][0]['scst_gender']);
				$('#scst_fname').val(response['response']['data']['student'][0]['scst_fname']);
				$('#scst_mname').val(response['response']['data']['student'][0]['scst_mname']);
				$('#scst_lname').val(response['response']['data']['student'][0]['scst_lname']);
				$('#scpt_ftr_fname').val(response['response']['data']['student'][0]['scpt_ftr_fname']+' '+response['response']['data']['student'][0]['scpt_ftr_lname']);
				$('#scpt_mtr_fname').val(response['response']['data']['student'][0]['scpt_mtr_fname']+' '+response['response']['data']['student'][0]['scpt_mtr_lname']);
				$('#student_address').val(response['response']['data']['student'][0]['scpt_pblock']+', '+response['response']['data']['student'][0]['scpt_pstreet']+', '+response['response']['data']['student'][0]['scpt_pstate']+', '+response['response']['data']['student'][0]['scpt_pcountry']+', '+response['response']['data']['student'][0]['scpt_pzipcode']);
				$('#scad_admission_date').val(response['response']['data']['student'][0]['scad_admission_date']);
			}	
	});
}

//Get Student admission Amount details
function getStudentAdmissionAmountDetails(class1)
{
	if(class1 == "")
	{  
		alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentAdmission/getStudentAdmissionAmountDetails",
			type: 'post',
			data:{'sfcc_class_id':class1,'scfc_fee_category':'Fee'},
			cache: false,
			success: function(response) 
			{
				$("#getStudentAmountDetailsForAdmission").empty();
				$("#getStudentAmountDetailsForAdmission").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No fees structure found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}

//Get Subject list for subject group mapping
function getSubjectForGroupMapping(division_id)
{
	if(division_id == "")
	{  
		alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/SubjectGroupMapping/getSubjectForGroupMapping",
			type: 'post',
			data:{'division_id':division_id},
			cache: false,
			success: function(response) 
			{
				$("#DataForSubjectGroup").empty();
				$("#DataForSubjectGroup").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No fees structure found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}

//Get Student list for subject group mapping
function getStudentForStudentDivisionMapping(div_id)
{
	var class_id = $('#class').val();
	if(div_id == "")
	{  
		alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/StudentDivisionMapping/getStudentForStudentDivisionMapping",
			type: 'post',
			data:{'class_id':class_id,'div_id':div_id},
			cache: false,
			success: function(response) 
			{
				$("#studentListDataForSubjectDivisionMapping").empty();
				$("#studentListDataForSubjectDivisionMapping").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No student found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}

//From subject group id get all subject in group
function getSubjectFromGroupId(group_id)
{
	if(group_id == "")
	{  
		//alert('Select All Fields');
	}
	else
	{
        $.ajax({
			//dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/SubjectGroupMapping/getSubjectFromGroupId",
			type: 'post',
			data:{'group_id':group_id},
			cache: false,
			success: function(response) 
			{
				$("#AllSubjectGroupData").empty();
				$("#AllSubjectGroupData").html(response);
				if( !$.trim( $('#all_data').html() ).length) 
				{
					$("#all_data").html("<div class='errorMsg'>No data found</div>");
					//$("#btnAttendance").hide();
				}
			}
			
		});
	}
}

//From subject group id get all subject in group
function examMasterStatusChange(exam_master_id,status_id)
{
	if(exam_master_id == "" && status_id == "")
	{  
		//alert('Select All Fields');
	}
	else
	{
        $.ajax({
			dataType: 'json',
			url: baseUrl+"index.php/AcademicAdmin/ExamMaster/ExamMasterStatusChange",
			type: 'post',
			data:{'id':exam_master_id,'setm_status':status_id},
			cache: false,
			success: function(response) 
			{
				if(response['response']['error'] == 'false')
				{
					alert(response['response']['message']);
				}
				else{
					alert(response['response']['message']);
				}
			}
			
		});
	}
}

function showexamtimetablebyteacher(exam_master_id) {
		var class_id = $('#class option:selected').val();
		if (class_id === "") {
			alert("Please Select class");
			return;
		}
		var div_id = $('#div option:selected').val();
		if (div_id === "") {
			alert("Please Select Division");
			return;
		}
		$.ajax({
			type: "POST",
			url: baseUrl+"index.php/Teacher/TeacherViewExamTimeTable/loadExamTimeTableByTeacher",
			data: {'class': class_id, 'div': div_id, 'exam_type': exam_master_id},
			dataType: "html",
			success: function (response) {
				$("#exam-timetable-data").empty();
				$("#exam-timetable-data").html(response);
			}
		});
    }
		
function showexamtimetablebyparent(exam_master_id) {
		var class_id = $('#class option:selected').val();
		if (class_id === "") {
			alert("Please Select class");
			return;
		}
		var div_id = $('#div option:selected').val();
		if (div_id === "") {
			alert("Please Select Division");
			return;
		}
		$.ajax({
			type: "POST",
			url: baseUrl+"index.php/Parents/ParentViewExamTimeTable/loadExamTimeTableByParent",
			data: {'class': class_id, 'div': div_id, 'exam_type': exam_master_id},
			dataType: "html",
			success: function (response) {
				$("#exam-timetable-data").empty();
				$("#exam-timetable-data").html(response);
			}
		});
    }
		
function showexamtimetablebyacademicadmin(exam_master_id) {
		var class_id = $('#class option:selected').val();
		if (class_id === "") {
			alert("Please Select class");
			return;
		}
		var div_id = $('#div option:selected').val();
		if (div_id === "") {
			alert("Please Select Division");
			return;
		}
		$.ajax({
			type: "POST",
			url: baseUrl+"index.php/AcademicAdmin/ViewExamTimeTable/loadExamTimeTableByAcademicAdmin",
			data: {'class': class_id, 'div': div_id, 'exam_type': exam_master_id},
			dataType: "html",
			success: function (response) {
				$("#exam-timetable-data").empty();
				$("#exam-timetable-data").html(response);
			}
		});
    }
	

function resetDivisionAndCLass(div,subject)
{
	// alert(div+subject);
	$('#'+div).val('');
	$('#'+subject).val('');
}

function resetDivisionAndParent(div,parent1)
{ 
	 //alert(div+parent1);
	$('#'+div).val('');
	$('#'+parent1).val('');
}

function getAllStudentAdmissionStatusDeatils(admission_status) {
	//alert(admission_status);
		if (admission_status === "") {
			alert("Please Select status");
			return;
		}
		else{
		$.ajax({
			type: "POST",
			url: baseUrl+"index.php/AcademicAdmin/ViewStudent/loadAllStudentAdmissionStatusDeatils",
			data: {'admission_status': admission_status},
			dataType: "html",
			success: function (response) {
				$("#student-admission-data").empty();
				$("#student-admission-data").html(response);
			}
		});
    }
}	

function CopyAdd(cb) {
	
		if (cb.checked) 
		{
			$('#scpt_cblock').val($('#scpt_pblock').val());
			$('#scpt_cstreet').val($('#scpt_pstreet').val());
			//$('#scpt_ccountry').val($('#scpt_pcountry').val());
			//$('#scpt_cstate').val($('#scpt_pstate').val());
			$('#scpt_czipcode').val($('#scpt_pzipcode').val());
		}else 
		{
			$('#scpt_cblock').val('');
			$('#scpt_cstreet').val('');
			//$('#scpt_ccountry').val('');
			//$('#scpt_cstate').val('');
			$('#scpt_czipcode').val('');
		}
		
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cblock');
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cstreet');
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_ccountry');
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_cstate');
		$('#studentRegistrationForm').bootstrapValidator('revalidateField', 'scpt_czipcode');
		
	}
	
	function CopyAddStaff(cb) {
	
		if (cb.checked) 
		{
			$('#scem_cblock').val($('#scem_pblock').val());
			$('#scem_cstreet').val($('#scem_pstreet').val());
			//$('#scem_ccountry').val($('#scpt_pcountry').val());
			//$('#scem_cstate').val($('#scpt_pstate').val());
			$('#scem_czipcode').val($('#scem_pzipcode').val());
		}else 
		{
			$('#scem_cblock').val('');
			$('#scem_cstreet').val('');
			//$('#scpt_ccountry').val('');
			//$('#scpt_cstate').val('');
			$('#scem_czipcode').val('');
		}
		
		$('#staffForm').bootstrapValidator('revalidateField', 'scem_cblock');
		$('#staffForm').bootstrapValidator('revalidateField', 'scem_cstreet');
		$('#staffForm').bootstrapValidator('revalidateField', 'scem_ccountry');
		$('#staffForm').bootstrapValidator('revalidateField', 'scem_cstate');
		$('#staffForm').bootstrapValidator('revalidateField', 'scem_czipcode');
		
	}
	
	function CopyStudentRegistration(cb) {
	
		if (cb.checked) 
		{
			$('#scst_cblock').val($('#scst_pblock').val());
			$('#scst_cstreet').val($('#scst_pstreet').val());
			//$('#scst_ccountry_id').val($('#scst_pcountry_id').val());
			//$('#scst_cstate_id').val($('#scst_pstate_id').val());
			$('#scst_czipcode').val($('#scst_pzipcode').val());
		}else 
		{
			$('#scst_cblock').val('');
			$('#scst_cstreet').val('');
			//$('#scst_ccountry_id').val('');
			//$('#scst_cstate_id').val('');
			$('#scst_czipcode').val('');
		}
		
		$('#staffForm').bootstrapValidator('revalidateField', 'scst_cblock');
		$('#staffForm').bootstrapValidator('revalidateField', 'scst_cstreet');
		$('#staffForm').bootstrapValidator('revalidateField', 'scst_ccountry_id');
		$('#staffForm').bootstrapValidator('revalidateField', 'scst_cstate_id');
		$('#staffForm').bootstrapValidator('revalidateField', 'scst_czipcode');
		
	}
	
	
	function ForgotPassword() {
	var unumber = $('#unumber').val();
		if (unumber === "") {
			alert("Please enter username");
			return;
		}
		else{
			$.ajax({
			type: "POST",
			url: baseUrl+"index.php/Login/ForgotPassword",
			data: {'unumber': unumber},
			dataType: "json",
			success: function (response) {
				if(response['response']['error'] == 'false')
				{
					//alert(response['response']['message']);
					$("#newpassmsg").html(response['response']['message']).css("color", "green");
					setTimeout(function(){ $('#newpassmsg').html(''); }, 3000);
				}
				else{
					//alert(response['response']['message']);
					$("#newpassmsg").html(response['response']['message']).css("color", "red");
					setTimeout(function(){ $('#newpassmsg').html(''); }, 3000);
				}
			}
		});
		}
		
	}
	
// Change Password Validation
function validateChangePass()
{
	$('#changePass').bootstrapValidator({
		feedbackIcons: {
			valid: 'glyphicon glyphicon-ok',
			invalid: 'glyphicon glyphicon-remove',
			validating: 'glyphicon glyphicon-refresh'
		},
		excluded: [':disabled'],
		fields: {
            sl_user_pwd: {
                validators: {
                    identical: {
                        field: 'confirmPass',
                        message: 'The password and its confirm are not the same'
                    }
                }
            },
            confirmPass: {
                validators: {
                    identical: {
                        field: 'sl_user_pwd',
                        message: 'The password and its confirm are not the same'
                    }
                }
            }
        }
	});
	
}