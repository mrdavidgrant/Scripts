(function(){
  current.u_wait_list = '';
  current.update();
  var i = 1;
  var gr = new GlideRecord ('u_facilities_parking');
  gr.addNullQuery('u_assigned_lot');
  gr.addQuery('u_declined', 'false');
  gr.orderBy('u_service_date');
  gr.query();
  while (gr.next()){
    if (gr.u_employee.getAttribute('active') == 'false') {
      gr.u_wait_list = '';
    }
    gr.u_wait_list = i;
    gr.update();
    i++;
  }
})();