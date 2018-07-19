var today = new GlideDate();

// set opening and closing dates for submission periods
var opening1 = new GlideDate('2018-03-01');
var closing1 = new GlideDate('2018-03-31');
var opening2 = new GlideDate('2018-07-01');
var closing2 = new GlideDate('2018-07-31');

// future proofs by converting opening and closing periods to current year
opening1.setYearLocalTime(today.getYearLocalTime());
closing1.setYearLocalTime(today.getYearLocalTime());
opening2.setYearLocalTime(today.getYearLocalTime());
closing2.setYearLocalTime(today.getYearLocalTime());

if ((today.compareTo(opening1) == 1 && today.compareTo(closing1) == -1) || (today.compareTo(opening2) == 1 && today.compareTo(closing2) == -1)) {
  // within submission period
  gs.addInfoMessage('The Facilities Management department has been contacted regarding your request<br/>The \'Self Service - My Requests\' module provides access to this, and all of your other open requests');
} else {
  // outside submission period
  gs.addErrorMessage('Submissions are currently closed. You will be added to the waiting list, and if a space becomes available the Facilities Team will contact you.');
  new global.SMTemplates().newFromCatalogItem(current, gs, 'e009c323ff031100a0a5ffffffffff37', 'The Facilities Management department has been contacted regarding your request<br/>The \'Self Service - My Requests\' module provides access to this, and all of your other open requests<br/>', producer);
}