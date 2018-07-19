(function executeRule(current, previous /*null when async*/) {

	// Add your code here
  var applicants = [current.u_applicant_1, current.u_applicant_2];
  if (current.u_applicant_3.nil() == false) applicants.push(current.u_applicant_3);
  if (current.u_applicant_4.nil() == false) applicants.push(current.u_applicant_4);

  if (!current.u_assigned_parking_lot.nil()) {
    gs.eventQueue('carpool.acceptance', current);
  }

  for (var i = 0; i < applicants.length; i++) {
    var gr = new GlideRecord ('u_facilities_parking');
    gr.addQuery('u_employee', applicants[i]);
    gr.query();
    while (gr.next()) {
      if (current.u_assigned_parking_lot.nil()){
        gr.u_assigned_lot = '';
        gr.u_granted_date = '';
        gr.u_grant_type = '';
      } else {
        gr.u_assigned_lot = current.u_assigned_parking_lot;
        gr.u_granted_date = new GlideDate();
        gr.u_grant_type = 'W';
      }
      gr.update();
    }
  }
  
})(current, previous);