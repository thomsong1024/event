  
Template.CreateEvent.rendered = function() { 
  $("#datearea").datetimepicker({
    pickTime: false
  });
  $('#timepicker').timepicker();
  // $('.datetimepicker').datetimepicker();
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
    obj.date              = datepicker.value + " " + timepicker.value;
    var checked = [];
    $("input[name='categories[]']:checked").each( function ( ){
      checked.push($(this).val());
    });
    obj.eventLocations    = eventLocations.value;
    obj.eventDuration     = eventDuration.value;
    obj.categories        = JSON.stringify(checked);
    obj.nog               = nog.value;
    obj.eventPrice        = eventPrice.value;
    var id = Events.insert(obj, function (error, result) {});
    if (id) {
      var message = "Your new event has been creatd.";
      FlashMessages.sendSuccess(message, { hideDelay: 3500 });

    }
  }
});
Template.header.events({
  "click .header" : function () {
    Router.go("/");
  }
})
