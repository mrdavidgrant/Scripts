(function(){
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
    var task = new GlideRecord ('u_facilities_request');
      task.initialize();
      task.template = 'f201dcf3db1a0300a89978a6ae96193f';
      task.location = record.u_location;
      task.short_description = 'New Health and Safety Rep needs CCOHS training assigned';
      task.description = 'Employee: ' + record.u_employee.name + ' newly has direct reports.  Please assign CCOHS training.';
      task.state = 10;
      task.insert();
  }
})()