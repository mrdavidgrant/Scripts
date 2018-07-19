(function(){
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
      var task = new GlideRecord ('facilities_request');
      task.initialize();
      task.template = 'f201dcf3db1a0300a89978a6ae96193f';
      task.location = gr.manager.location;
      task.short_description = 'New Manager needs CCOHS training assigned';
      task.description = 'Employee: ' + gr.manager.name + ' newly has direct reports.  Please assign CCOHS training.';
      task.state = 10;
      task.insert();
    }

  }
})();