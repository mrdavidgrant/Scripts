(function(){
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
})()