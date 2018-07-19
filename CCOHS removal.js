(function() {
  var table = '';
  var gr = new GlideRecord('u_facilities_ccohs');
  gr.addNotNullQuery('u_role');
  gr.query();
  while (gr.next()){
    var role = gr.u_role;
    if (role == 'Manager/Supervisor') {
      table = 'sys_user';
      var search = new GlideRecord(table);
      search.addQuery('manager', gr.u_employee);
    } else if (role == 'Health and Safety') {
      table = 'u_facilities_health_and_safety'
      var search = new GlideRecord(table);
      search.addQuery('u_role', '!=', 'First Aid & CPR');
      search.addQuery('u_employee', gr.u_employee);
    }
    search.query();
    if (!search.next()){
      gr.u_role = '';
      gr.u_status = 'No Longer Required';
      gr.update();
    }
  }
})();