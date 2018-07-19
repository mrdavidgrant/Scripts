function onSubmit() {

  //Type appropriate comment here, and begin script below
  var today = new Date();
	console.log('Today: ' + today.toString());
  var open1 = new Date ('2000-02-15');
  open1.setFullYear(today.getFullYear());
  var close1 = new Date ('2000-03-15');
  close1.setFullYear(today.getFullYear());
  var open2 = new Date ('2000-09-15');
  open2.setFullYear(today.getFullYear());
  var close2 = new Date ('2000-10-15');
  close2.setFullYear(today.getFullYear());

  if ((today < open1 || today > close1) && (today < open2 || today > close2)) {
    g_form.addErrorMessage('Bicycle parking application period is now closed.<br/>Your application will be kept on file and you will be contacted directly should there be any changes to your eligibility this season.<br/>Thank you<br/>Facilities & Administration');
  }
	return true;
}