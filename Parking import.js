var employee = 'Van de Velde,Janita';
employee.split('');
var lastName = employee.slice(0, employee.indexOf(','));
employee = employee.slice(employee.indexOf(',') + 1)
if (employee.indexOf(' ') >= 0 && employee.indexOf(',') >= 0) {
  var firstName = employee.slice(employee.indexOf(',') + 1, employee.lastIndexOf(' '));
} else {
  var firstName = employee.slice(employee.indexOf(',') + 1);
}
return firstName.toString('') + ' ' + lastName.toString('');