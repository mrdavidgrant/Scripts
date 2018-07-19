function onSubmit() {
  //Type appropriate comment here, and begin script below
  var tax1 = g_form.getBooleanValue('taxable1');
  var tax2 = g_form.getBooleanValue('taxable2');
  var tax3 = g_form.getBooleanValue('taxable3');
  var tax4 = g_form.getBooleanValue('taxable4');

  if (tax1 + tax2 + tax3 + tax4 != 1) {
    g_form.addErrorMsg('Please select a single Taxable Benefit Recipient for your Carpool');
    return false;
  }
}