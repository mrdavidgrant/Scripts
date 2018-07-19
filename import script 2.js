(function(){
  var gr = new GlideRecord ('u_facilities_ccohs');
  gr.addNullQuery('u_role');
  gr.query();
  while (gr.next()){
    gr.u_status = 'No Longer Required';
    gr.update();
  }
})()