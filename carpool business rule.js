(function executeRule(current, previous /*null when async*/) {

	// Add your code here
  var applicants = [current.u_applicant_1, current.u_applicant_2];
  if (current.u_applicant_3.nil() == false) applicants.push(current.u_applicant_3);
  if (current.u_applicant_4.nil() == false) applicants.push(current.u_applicant_4);

  var today = new GlideDate();
  gs.log('Today is ' + today);
  var service = 0;

  for (var i = 0; i < applicants.length; i++) {
    var gr = new GlideRecord ('u_facilities_parking');
    gr.addQuery('u_employee', applicants[i]);
    gr.query();
    while (gr.next()) {
    gs.info('Parking user found: ' + gr.u_employee.name);
    gs.info('Service Date: ' + gr.u_service_date);
      var serviceVar = 'u_applicant_' + (i + 1) + '_service_date';
      current[serviceVar] = gr.u_service_date;
      var year = gr.u_service_date.getGlideObject();
      var duration = GlideDate.subtract(year, today);
      var days = duration.getDayPart();
		  gs.info('DURATION : ' + duration.getDayPart());
      service += days;

    }
  }
  current.u_total_service = service /365;
	

})(current, previous);