(function(){
	var application = new GlideRecord('u_facilities_bicycle_parking');
  application.initialize();
  application.u_employee = producer.opened_for;
  application.u_application_received = producer.date;
  application.u_bicycle_colour = producer.colour;
  application.u_bicycle_identifying_features = producer.identifying_features;
  application.u_bicycle_make_model = producer.make_model;
  application.u_card_number = producer.card_number;
  var service = new GlideRecord('u_facilities_parking');
  service.addQuery('u_employee', producer.opened_for);
  service.query();
  while (service.next()){
    application.u_service_date = service.u_service_date;
  }
  application.insert();
	
	
	
})();
