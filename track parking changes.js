(function executeRule(current, previous /*null when async*/) {

	// Add your code here
  var gr = new GlideRecord('u_facilities_parking_changes');
  gr.initialize();
  gr.u_employee = current.u_employee;
  gr.u_new_access = current.u_bicycle_parking_lot;
  gr.u_old_access = previous.u_bicycle_parking_lot;
  gr.u_card_access_number = current.u_card_number;
  gr.insert();
  if (current.u_bicycle_parking_lot == 'AP Bicycle') {
    gs.eventQueue('parking.bicycle.acceptance.ap', current); 
  }
  if (current.u_bicycle_parking_lot == 'Cornwall') {
    gs.eventQueue('parking.bicycle.acceptance.cornwall', current);
  }
})(current, previous);