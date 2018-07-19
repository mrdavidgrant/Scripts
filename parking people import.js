(function(){
  var gr = new GlideRecord ('sys_user');
  gr.addQuery('active', 'true');
  gr.addQuery('location.parent', '753a2f0713f5da00c005babed144b09f')
  gr.query();
  while (gr.next()) {

      parking = new GlideRecord('u_facilities_parking');
      parking.initialize();
      parking.u_employee = gr.sys_id;
      parking.u_location = gr.location;
      parking.u_service_date = gs.now();
      parking.insert();

  }
})()