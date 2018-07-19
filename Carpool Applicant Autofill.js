function onChange(control, oldValue, newValue, isLoading) {
   if (isLoading || newValue == '') {
      return;
   }

   //Type appropriate comment here, and begin script below
   g_form.getReference('u_applicant_4', fillValues);

}

function fillValues(user){
  g_form.setValue('phone4', user.phone);
  g_form.setValue('department4', user.department);
}