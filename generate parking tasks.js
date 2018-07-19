(function(){
  var description = '';
  var short_description = 'Parking Access Card Changes';
  var gr = new GlideRecord ('u_facilities_parking_changes');
  gr.addQuery('sys_created_on', '>', 'javascript:gs.daysAgoEnd(1)');
  gr.query();
  while (gr.next()){
    description += 'Employee: ' + gr.u_employee.name;
    if (!gr.u_card_access_number.nil()){
      description += '     Access Card Number: ' + gr.u_card_access_number;
    }
    description += '\n';
    if (!gr.u_old_access.nil()){
      description += 'Old Parking Access: ' + gr.u_old_access.getDisplayValue() + '\n';
    }
    description += 'New Parking Access: ' + gr.u_new_access.getDisplayValue() + '\n';
    description += '----------\n'; 
  }
  if (description != '') {
    var request = new GlideRecord ('facilities_request');
    request.initialize();
    request.location = '753a2f0713f5da00c005babed144b09f';
    request.template = 'b9304559dbe41740a89978a6ae96192f';
    request.short_description = short_description;
    request.description = description;
    request.state = 10;
    request.insert(); 
  }
})();