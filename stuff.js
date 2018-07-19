var rec = new GlideRecord('sys_number');
rec.get('973c8e8a9d022000da615b13b3a22f32');
//Push the record into the current update set   
var um = new GlideUpdateManager2();
um.saveRecord(rec);