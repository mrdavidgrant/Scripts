(function executeRule(current, previous /*null when async*/) {

  //check if in submission period, assign task if not
  var today = new GlideDate();

  // set opening and closing dates for submission periods
  var opening1 = new GlideDate();
  opening1.setValue('2018-03-01');
  var closing1 = new GlideDate();
  closing1.setValue('2018-03-31');
  var opening2 = new GlideDate();
  opening2.setValue('2018-08-01');
  var closing2 = new GlideDate();
  closing2.setValue('2018-08-31');

  // future proofs by converting opening and closing periods to current year
  opening1.setYearLocalTime(today.getYearLocalTime());
  closing1.setYearLocalTime(today.getYearLocalTime());
  opening2.setYearLocalTime(today.getYearLocalTime());
  closing2.setYearLocalTime(today.getYearLocalTime());

  if ((today.compareTo(opening1) == 1 && today.compareTo(closing1) == -1) || (today.compareTo(opening2) == 1 && today.compareTo(closing2) == -1)) {
    gs.info('Within Submission Period');
  } else {
    gs.info('Outside Submission Period');
    // outside submission period
    var request = new GlideRecord('facilities_request');
    request.initialize();
    request.template = '9c6f7015dbe41740a89978a6ae961930';
    request.short_description = 'New Bicycle Parking Application outside submission period';
    request.insert();
  }
})(current, previous);