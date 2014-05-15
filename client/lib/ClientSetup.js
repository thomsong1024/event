Handlebars.registerHelper("each_with_index", function(array, fn) {
    if (array != undefined){
      for (var i = 0, j = array.length; i < j; i++) {
        var item = array[i];
        item.index = i;
        buffer += fn(item);
      }
      return buffer;
    }
    return "";
});

Handlebars.registerHelper('isNormalUser',function(){
  if (Roles.userIsInRole(Meteor.user(), ['normal-user']))
    return true;
  return false;
});

// Handlebars.registerHelper('profileName',function(){
//   if (Roles.userIsInRole(Meteor.user(), ['admin-user']))
//     return "admin";
// });

Handlebars.registerHelper('userFullName',function(){

  Deps.autorun( function () {

    if (Meteor.user()) {

      // if (Roles.userIsInRole(Meteor.user(), ['normal-user']) || Roles.userIsInRole(Meteor.user(), ['admin-user'])){

        Deps.autorun( function () {

          var user = Meteor.user();
          Session.set("userFullname", user.profile.lastname + " " + user.profile.firstname);
        });
      // }

    }
  });

  if (Session.get("userFullname"))
    return Session.get("userFullname");
});

Handlebars.registerHelper('isVendorUser',function(){
  if (Roles.userIsInRole(Meteor.user(), ['vendor-user']))
    return true;
  return false;
});

Handlebars.registerHelper('newMessages',function(){

  if (Meteor.user()) {
    if (Roles.userIsInRole(Meteor.user(), ['normal-user'])) {
      var messages = Messages.find( {$and: [{userID: Meteor.userId()}, {userUnread: true}]} );
    }
    else if (Roles.userIsInRole(Meteor.user(), ['vendor-user'])) {
      // var vendorId = Meteor.users.find();
      var messages = Messages.find( {$and: [{vendorID: Meteor.users.findOne().profile.vendorID}, {vendorUnread: true}]} );
    }
    if(messages) {
      if (messages.count() > 0)
        $(".counter").show();
      return messages.count();    

    }
  }
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

Handlebars.registerHelper('serviceObject',function(){
  var servicecat=ServiceCategories.find().fetch();
      return servicecat ;
});

Handlebars.registerHelper('getDatesFromTimeStamp',function(timestamp){
  return moment(timestamp, "X").format("YYYY-MM-DD HH:mm A");
});

Handlebars.registerHelper('arrayify',function(obj){
  var i = 0;
    var result = [];
    for (var key in obj) {
        if (obj[key].parent == 0){
          i++;
          result.push({name:obj[key].name,parentItem:obj[key]._id, index: i});

        } // Eliminate the top most level of the category           
    }
    return result;
});

Handlebars.registerHelper('getSubs',function(services, parentItem){
  var result = [];
  for (var key in services) {
    if (services[key].parent == parentItem) {
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
  else if (select  == "priceRange") {
    var options = ["25-50", "50-100", "100-250", "250-500", "500-1000"];
    var optionsObjArry =[];
    for (var i = 0; i < options.length; i ++) {
     var optionsObj = new Object();
     optionsObj.label = options[i];
     optionsObj.value = options[i];
     optionsObjArry.push(optionsObj);
    }
  }
  else if(select  == "vendor") {
    var options = Vendors.find();
    var optionsObjArry =[];
    options.forEach(function (vendors) {
      var optionsObj = new Object();
      optionsObj.label = vendors.vendorName;
      optionsObj.value = vendors._id;
      optionsObjArry.push(optionsObj);
    });
  }
  return JSON.parse(JSON.stringify(optionsObjArry));
});


Handlebars.registerHelper('isCreated',function(){
	return isEventCreated();
});

Handlebars.registerHelper('getLocation',function(id){
  if (id) {
    var location = Locations.findOne({_id: id});
    return location.district+", "+location.city;
  }
});

Handlebars.registerHelper('checkCategory',function(id, categories){
	return isChecked(id, JSON.parse(categories));
});

Handlebars.registerHelper('eventLists',function(){
  var events = Events.find();
  if (events.count() > 0);
    return Events.find().fetch();
});
Handlebars.registerHelper('isUseLoggedIn',function(){
  return isUserLoggedIn();
});

Handlebars.registerHelper('getActiveIndex',function(index){
  if (index == "0")
    return true;
  else
    return false;
});

Handlebars.registerHelper('checkServiceCount',function(obj){
  console.log(obj.length)
  if (obj.length < 5)
    return false;
  else 
    return true;
});

Handlebars.registerHelper('isResponsed',function(requestID){
  var quote = QuotationDetail.find({requestQuoteID: requestID}).count();
  
  if (quote > 0)
   return true;
  else 
   return false;
});

Handlebars.registerHelper('getEventLists',function(obj){
  var request = RequestQuote.find({vendorID: Session.get("vendorID")});
  // console.log(Session.get("vendorID"));
  var objArray = [];
  request.forEach( function (item) {
    var eventData = Events.findOne({_id: item.eventID});
    var obj = {};
    obj.eventTitle = eventData.eventTitle;
    obj.date = eventData.date;
    obj.eventLocations = eventData.eventLocations;
    obj.eventPrice = eventData.eventPrice;
    obj._id = item._id;
    obj.activeService = item.activeService;
    objArray.push(obj);
  });
  return JSON.parse(JSON.stringify(objArray));
  // return Events.find({_id: {$in: objArray}}).fetch();
});

Handlebars.registerHelper('categoryList',function(){
  var servicecat=ServiceCategories.find({$and:[{parent:"0"}]}).fetch();
  return servicecat;
});

Handlebars.registerHelper('getEventType',function(id){

  if (id)
  {

    var events = EventTypes.findOne({_id: id});

    if (events)
    {

      return events.type;

    }

  }

});

Handlebars.registerHelper('getDateFormat',function(date){
  var obj = {};
  obj.date = moment(date).date();
  obj.month = moment.monthsShort('-MMM-', moment().month());
  obj.year = moment().year();
  return obj;
});

//Get Quotation Table From Message texts

Handlebars.registerHelper('getQuotationTableFromMessage',function(id){
  var quotation = Messages.findOne({_id: id}).texts;
  return JSON.parse(quotation);
});

Handlebars.registerHelper('getQuotationTable',function(id){

  if (id) 
  {

    var quotation = QuotationDetail.findOne({requestQuoteID: id}).detail;

    if (quotation)
      return JSON.parse(quotation);

  }

});

Handlebars.registerHelper('getMtype',function(value){
  if (value == "quotation")
    return true;
  return false;
});

