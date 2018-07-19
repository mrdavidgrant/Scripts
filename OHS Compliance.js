(function() {var task = {
  addNew: function (location, short_description, description) {
    var request = new GlideRecord ('facilities_request');
    request.initialize();
    request.location = location;
    request.template = 'f201dcf3db1a0300a89978a6ae96193f';
    request.short_description = short_description;
    request.description = description;
    request.state = 10;
    request.insert(); 
  }
  };
  var table = 'u_facilities_health_and_safety';
  var gr = new GlideAggregate (table);
  gr.addAggregate('count');
  gr.orderByAggregate('count');
  gr.groupBy('u_location');
  gr.query();
  while (gr.next()){
    var roles = {
      healthAndSafety: {
        name : 'Health & Safety Rep',
        valid : false
      },
      firstAid : {
        name : 'First Aid & CPR',
        valid : false,
      },
      primaryWarden : {
        name : 'Primary Safety Warden',
        valid : false,
      },
      backupWarden : {
        name : 'Backup Safety Warden',
        valid : false,
      }
    };
    if (gr.u_location.parent != '753a2f0713f5da00c005babed144b09f' || gr.u_location == 'a68fd10713f1da00c005babed144b0bd') {
      roles.primaryWarden.valid = true;
      roles.backupWarden.valid = true;
    }
    var loc = new GlideAggregate(table);
    loc.addQuery('u_location', gr.u_location);
    loc.addAggregate('count');
    loc.orderByAggregate('count');
    loc.groupBy('u_role');
    loc.query();
    while (loc.next()) {
      var roleCount = loc.getAggregate('count');
      if (loc.u_role == 'Health & Safety Rep') {
        roles.healthAndSafety.valid = true;
      } else if (loc.u_role == 'First Aid & CPR') {
        if (roleCount >= 2) {
          roles.firstAid.valid = true;
        }
      } else if (loc.u_role == 'Primary Safety Warden') {
        roles.primaryWarden.valid = true;
      } else if (loc.u_role == 'Backup Safety Warden') {
        roles.backupWarden.valid = true;
      }
    } 
    if (!(roles.primaryWarden.valid && roles.backupWarden.valid && roles.firstAid.valid && roles.healthAndSafety.valid)) {
      var location = gr.u_location;
      var short_description = location.full_name + ' missing OH&S Roles';
      var description = 'This location is missing people in the following roles: \n';
      if (!roles.primaryWarden.valid) description += roles.primaryWarden.name + '\n';
      if (!roles.backupWarden.valid) description += roles.backupWarden.name + '\n';
      if (!roles.firstAid.valid) description += roles.firstAid.name + '\n';
      if (!roles.healthAndSafety.valid) description += roles.healthAndSafety.name + '\n';
      task.addNew(location, short_description, description);
    }
  }  
  var marshals = new GlideAggregate(table);
  marshals.addQuery('u_role', 'Primary Safety Marshal');
  marshals.addAggregate('count');
  marshals.groupBy('u_role');
  marshals.query();
  while(marshals.next()){
    var marshalCount = marshals.getAggregate('count');
    if (marshalCount > 2) {
      var location = '753a2f0713f5da00c005babed144b09f';
      var short_description = 'Insufficient Safety Marshals for CCOHS';
      var description = 'The system did not find 2 Primary Safety Marshals at Corporate Offices'
      task.addNew(location, short_description, description);
    }
  }
})();