
Meteor.subscribe("events");
// EventCreationForms = new AutoForm(Events);
// Events.allow({
//   insert: function() {
//   	return true;
//   },
//   update: function() {
//     return true;
//   },
//   remove: function() {
//   	console.log('Remove called');
//     return true;
//   },
//   fetch: []
// });




Template.CreateEvent.helpers({
  services: function() {
  var servicecat=ServiceCategories.find().fetch();
      return servicecat ;
  }
});

Template.CreateEvent.rendered = function() { 
  $(".set-due-date").datetimepicker();
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

Template.CreateEvent.events({
  'submit' : function( e ) {
    e.preventDefault();
    var obj = {};
    obj.eventTitle        = eventTitle.value;
    obj.eventDescription  = eventDescription.value;
    obj.eventTypes        = eventTypes.value;
    obj.date              = datepicker.value;
    var checked = [];
    $("input[name='categories[]']:checked").each( function ( ){
      checked.push($(this).val());
    });
    obj.categories        = checked;
    Session.set("eventData", obj);
  }
});
Template.ListEvent.rendered = function () {}

Template.ListEvent.events({
  'submit' : function( e ) {
   e.preventDefault();
   var eventData = Session.get("eventData");
   eventData.eventPrice = eventPrice.value;
   eventData.eventComments = eventComments.value;
   Events.insert(eventData, function (error, result) {
    console.log(error);
   });
   // console.log(Events);
  }
});

Template.subCats.subcategories = function (parent) {
  if (Session.get("eventData")) {
    var checkedCategories = Session.get("eventData").categories;
    var data = ServiceCategories.find({$and:[{parent: parent}]}).fetch();
    return data;
    if (data.count() > 0) {
      
      var categoriesObjArray = [];
      data.forEach( function (item) {
        var obj = {};
        console.log(item._id);
        console.log(checkedCategories);
        if (checkedCategories.indexOf(item._id)) {
          obj.name = item.name;
          categoriesObjArray.push(obj);
        }
      });
      return JSON.parse(JSON.stringify(categoriesObjArray));
    }
  }
}

Template.ListEvent.categoryList = function () {
  var servicecat=ServiceCategories.find({$and:[{parent:"0"}]}).fetch();
  return servicecat;
}    
          
