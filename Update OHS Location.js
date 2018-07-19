(function() {
  var table = ['u_facilities_health_and_safety', 'u_facilities_first_aid_cpr', 'u_facilities_ccohs'];
  for (i = 0; i < table.length; i++){
    var record = new GlideRecord (table[i]);
    record.query();
    while (record.next()){
      var user = new GlideRecord ('sys_user');
      user.get(record.u_employee);
      if (record.u_location != user.location){
        record.u_location = user.location;
        record.update();
        if (i <= 1) {
          var task = new GlideRecord('u_facilities_request');
          task.initialize();
          task.location = record.u_location;
          task.short_description = 'OHS Employee changed Location';
          task.template = 'f201dcf3db1a0300a89978a6ae96193f';
          task.description += 'Employee: ' + record.u_employee + '\n';
          task.description += 'Old Location: ' + record.u_location + '\n';
          task.description += 'New Location: ' + user.location + '\n';
          task.insert();
        }
      }
    }
  }
  
})();