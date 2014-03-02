
Meteor.subscribe("events");
EventCreationForm = new AutoForm(Events);

Events.allow({
  insert: function() {
  	return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
  	console.log('Remove called');
    return true;
  },
  fetch: []
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
    result = [];
    for (var key in obj) { 
        if (key!='top') // Eliminate the top most level of the category 
          result.push({name:key,value:obj[key]});
    } 
    return result;
});


Handlebars.registerHelper("each_with_index", function(array, fn) {
  var buffer = "";
  for (var i = 0, j = array.length; i < j; i++) {
    var item = array[i];
    item.index = i;
    buffer += fn(item);

  }
  return buffer;
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


  Template.CreateEvent.helpers({
   services: function() {
    var servicecat=ServiceCategories.find().fetch();

     var serviceCateogryGrouped =_.groupBy(servicecat,'category' );
        return serviceCateogryGrouped ;

  }

  });

  Template.CreateEvent.rendered = function() { 
        // Assuming you're using jQuery
        var i=0; 
        var res = $('#event1'); // ID of the <span></span> on the plugin zone.    
        var zone = $("input:text[name='basicDetails.title']");
        $(zone).on('keyup',function(e) {
              if(e.keyCode == 8){ 
                  i--;
              } 
              else {
                 i++;
              }  
              $(res).empty().append($(this).val());
        });
        $('.insert').on('click',function(e) {
           $(res).addClass('animated wobble');
        });
  }; 
    
          
