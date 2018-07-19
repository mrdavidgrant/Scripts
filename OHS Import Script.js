(function (){
  stage1();
  stage2();
  stage3();
  stage4();

 function stage1 (){
  var gr = new GlideRecord('u_facilities_ccohs');
  gr.query();
  while (gr.next()) {
    if (gr.u_completed != ''){
      gr.u_status = 'Complete';
    }
    if (gr.u_completed == '' && gr.u_assigned != ''){
      gr.u_status = 'Assigned';
    }
    gr.u_location = gr.u_employee.location;
    gr.u_status = 'No Longer Required';
    gr.update();
  }
 }

 function stage2(){
  var health = new GlideRecord ('u_facilities_health_and_safety');
  health.addQuery('u_role', '!=', 'First Aid & CPR');
  health.query();
  while (health.next()){
    var ccohs = new GlideRecord ('u_facilities_ccohs');
    ccohs.addQuery('u_employee', health.u_employee);
    ccohs.query();
    if (!ccohs.next()) {
      insertNew(health);
    } else {
      if (ccohs.u_completed != '') {
        ccohs.u_status = 'Complete';
      }
      ccohs.u_role = 'Health and Safety';
      ccohs.u_location = health.u_employee.location;
      ccohs.update();
    }
  }
  
  function insertNew(record){
    newCcohs = new GlideRecord ('u_facilities_ccohs');
    newCcohs.initialize();
    newCcohs.u_employee = record.u_employee;
    newCcohs.u_location = record.u_location;
    newCcohs.u_role = 'Health and Safety Rep';
    newCcohs.u_status = 'New';
    newCcohs.insert();
  }
 }

 function stage3(){
  var gr = new GlideAggregate ('sys_user');
  gr.addQuery('active', 'true');
  gr.addQuery('manager', '!=', '');
  gr.addQuery('manager', '!=', '6ec4f19edbbc5f00cf1dfcfaae961998');
  gr.addQuery('location', '!=', '');
  gr.addAggregate('count');
  gr.orderByAggregate('count');
  gr.groupBy('manager');
  gr.query();
  while (gr.next()){
    var ccohs = new GlideRecord ('u_facilities_ccohs');
    ccohs.addQuery('u_employee', gr.manager);
    ccohs.query();
    if (ccohs.next()){
      var status = ccohs.u_status;
      ccohs.u_role = 'Manager/Supervisor';
      if (status != 'Complete' && ccohs.u_completed != ''){
        ccohs.u_status = 'Complete';
      } else if (status != 'Complete' && ccohs.u_completed == '' && ccohs.u_assigned) {
        ccohs.u_status = 'Assigned';
      } else if (status != 'Complete' && ccohs.u_completed == ''){
        ccohs.u_status = 'New';
      }
      ccohs.update();
    } else {
      ccohs.initialize();
      ccohs.u_employee = gr.manager;
      ccohs.u_location = gr.manager.location;
      ccohs.u_role = 'Manager/Supervisor';
      ccohs.u_status = 'New';
      ccohs.insert();
    }

  }
 }

 function stage4(){
  var gr = new GlideRecord ('u_facilities_ccohs');
  gr.addNullQuery('u_role');
  gr.query();
  while (gr.next()){
    gr.u_status = 'No Longer Required';
    gr.update();
  }
 }
})();