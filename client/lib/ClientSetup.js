Handlebars.registerHelper("each_with_index", function(array, fn) {
	// console.log(array);
  var buffer = "";
  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];
    item.index = i;
    buffer += fn(item);
  }
  return buffer;
});

Handlebars.registerHelper("eventTypesOptions", function(options) {
  var eventTypesOptions = EventTypes.find();
  var eventTypesObjArray =[];
  eventTypesOptions.forEach(function (eventTypes) {
 	   var eventTypesObj = new Object();
	   eventTypesObj.label = eventTypes.type;
	   eventTypesObj.value = eventTypes._id;
	   eventTypesObjArray.push(eventTypesObj);
  });
  return JSON.parse(JSON.stringify(eventTypesObjArray));
});

Handlebars.registerHelper('arrayify',function(obj){
  var result = [];
  for (var key in obj) {
      if (obj[key].parent == 0) // Eliminate the top most level of the category 
        result.push({name:obj[key].name,parent:obj[key]._id});
  }
  return result;
});

Handlebars.registerHelper('getSubs',function(services, parent){
  // console.log(obj);
  var result = [];
  for (var key in services) {
    if (services[key].parent == parent) {
      result.push({name:services[key].name,_id:services[key]._id});
    }
  }
  return result;
});

Handlebars.registerHelper("locationOptions", function(options) {
  var locationOptions = Locations.find({citycode:'DXB'});
  var locationCount = locationOptions.count();

  var locationObjArray =[];
  locationOptions.forEach(function (location) {
		var locationObj = new Object();
    	locationObj.label = location.district;
  		locationObj.value = location._id;
  		locationObjArray.push(locationObj);
	});
  return JSON.parse(JSON.stringify(locationObjArray));
});

Handlebars.registerHelper("durationOptions", function() {
	var initials = [5, 10, 15, 20];
	var duration = [];
	for (var i = 0; i < initials.length; i ++) {
		var detail = {};
		detail.value = initials[i];
		detail.label = initials[i];
		duration.push(detail);
	}
	return JSON.parse(JSON.stringify(duration));
});

Handlebars.registerHelper("getSelect", function(select) {
  if (select == "eventTypes") {
	var options = EventTypes.find();
  	var optionsObjArry =[];
  	options.forEach(function (eventTypes) {
 	var optionsObj = new Object();
		optionsObj.label = eventTypes.type;
	  	optionsObj.value = eventTypes._id;
	  	optionsObjArry.push(optionsObj);
	});	
  }
  else if(select == "eventLocations") {
	var options = Locations.find();
  	var optionsObjArry =[];
  	options.forEach(function (eventTypes) {
 	var optionsObj = new Object();
		optionsObj.label = eventTypes.city;
	  	optionsObj.value = eventTypes._id;
	  	optionsObjArry.push(optionsObj);
	});	
  }
  else if(select == "eventDuration") {
  	var options = [2, 4, 8];
  	var optionsObjArry =[];
  	for (var i = 0; i < options.length; i ++) {
	 	 var optionsObj = new Object();
		 optionsObj.label = options[i];
	   optionsObj.value = options[i];
	   optionsObjArry.push(optionsObj);
  	}
  }
  else if(select == "numberOfGuests"){
    var options = ["25-50", "50-100", "100-250", "250-500", "500-1000"];
    var optionsObjArry =[];
    for (var i = 0; i < options.length; i ++) {
     var optionsObj = new Object();
     optionsObj.label = options[i];
     optionsObj.value = options[i];
     optionsObjArry.push(optionsObj);
    }

  }
  return JSON.parse(JSON.stringify(optionsObjArry));
});

Handlebars.registerHelper('isCreated',function(){
	return isEventCreated();
});

Handlebars.registerHelper('checkCategory',function(id, categories){
	return isChecked(id, JSON.parse(categories));
});

Handlebars.registerHelper('eventLists',function(){
  return Events.find().fetch();
});