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
    obj.eventLocations    = eventLocations.value;
    obj.eventDuration     = eventDuration.value;
    obj.categories        = JSON.stringify(checked);
    obj.nog               = nog.value;
    obj.eventPrice        = eventPrice.value;
    obj.eventComments     = eventComments.value;
    console.log(eventDuration.value);
    Events.insert(obj, function (error, result) {
      // console.log(error);
    });
    // Session.set("eventData", obj);
  }
});
Template.header.events({
  "click .header" : function () {
    Router.go("/");
  }
})
