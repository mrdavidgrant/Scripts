(function executeRule(current, previous /*null when async*/) {

  var today = new GlideDate();

  // set opening and closing dates for submission periods
  var opening1 = new GlideDate();
  opening1.setValue('2018-02-01');
  var closing1 = new GlideDate();
  closing1.setValue('2018-02-28');

  // future proofs by converting opening and closing periods to current year
  opening1.setYearLocalTime(today.getYearLocalTime());
  closing1.setYearLocalTime(today.getYearLocalTime());

  if (today.compareTo(opening1) == 1 && today.compareTo(closing1) == -1) {
    return;
  } else {
    gs.info('Outside Submission Period');
    // outside submission period
    var request = new GlideRecord('facilities_request');
    request.initialize();
    request.template = 'fb71090cdbc15300cf1dfcfaae9619e9';
    request.short_description = 'New Carpool Application outside submission period';
    request.description = '';
	  request.state = 10;
    request.insert();
	  gs.addErrorMessage('Carpool parking application period is now closed.<br/>Your application will be kept on file and you will be contacted directly should there be any changes to your eligibility this season.<br/>Thank you<br/>Facilities & Administration');
  }
})(current, previous);