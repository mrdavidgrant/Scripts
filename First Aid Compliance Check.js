(function(){
  var date1 = new GlideDate();
  var date2 = new GlideDate();
  date2.addDaysUTC(30);
  
  function getRecords(date1, date2, num) {
    var today = new GlideDate();
    var gr = new GlideRecord ('u_facilities_first_aid_cpr');
    if (date1 > today) {
      gr.addQuery('u_expiration_date', '>' , date1);
    } 
    gr.addQuery('u_expiration_date', '<=', date2)
    gr.query();
    while (gr.next()) {
      fireEvent(gr, num)
    }
  }

  function fireEvent(gr, num){
    var notification = 'firstAid.' + num;
    if (gr.u_employee.location.parent == "753a2f0713f5da00c005babed144b09f") {
      notification += '.corp';
    } 
    if (gr.u_employee.preferred_language == 'fq') {
      notification += '.fr';
    }
    gs.eventQueue(notification, gr, gr.u_employee, gr.u_expiration_date);
  }
  
  for (i = 1; i <= 3; i++){
    var days = i * 30;
    getRecords(date1, date2, days);
    date1.setValue(date2);
    date2.addDaysUTC(30);
  }
})()