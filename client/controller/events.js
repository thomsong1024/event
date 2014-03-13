Template.ListEvent.rendered = function () {
  
  // var id = getIdfromHyperLink($(".active").children("a").attr("href"));
  // Session.set("getActiveService", id);

  $(function () {
    $(".nav-tabs a").on("click", function (e) {
      $(".showmoreArea").show();
      Session.set("showmore", 0);
      e.preventDefault();
      var id = getIdfromHyperLink($(this).attr("href"));
      Session.set("getActiveService", id);
      // $(this).tab("show");
    })
  });
}

Template.ListEvent.events({
  'submit' : function( e ) {
   e.preventDefault();
   var eventData = Session.get("eventData");
   eventData.eventPrice = eventPrice.value;
   eventData.eventComments = eventComments.value;
   Events.insert(eventData, function (error, result) {});
  },
  "click .showmore" : function () {
    var count = 0;
    count = Session.get("showmore");
    if (Session.get("eventsData").length == 5) {
      Session.set("showmore", count + 5);
    }    
  }
});

Template.ListEvent.getSelectedCategories = function () {
  var events=Events.findOne({_id: Session.get("activeEvents")});
  var data =ServiceCategories.find({_id:{$in: JSON.parse(events.categories)}}).fetch();
  return data;
}

Template.subCats.subcategories = function (parent) {
  if (Session.get("activeEvents")) {
    var checkedCategories = Events.findOne({_id: Session.get("activeEvents")}).categories;
    var data = ServiceCategories.find({$and:[{parent: parent}]});

    if (data.count() > 0) {
      var categoriesObjArray = [];
      data.forEach( function (item) {
        var obj = {};
          obj._id = item._id;
          obj.name = item.name;
          obj.categories = checkedCategories;
          categoriesObjArray.push(obj);
      });
      return JSON.parse(JSON.stringify(categoriesObjArray));
    }
  }
}

Template.getServices.getServiceLists = function () {
  
  if (Session.get("activeEvents")) {
    var eventObj = Events.findOne({_id: Session.get("activeEvents")});
    var max = eventObj.nog.split("-")[1];
    // console.log(eventObj);
    var vendors = VendorServices.find({$and:[{locations: eventObj.eventLocations}, {eventType: eventObj.eventTypes}, {"nog": {$gt: parseFloat(max)}}]});

    var objArray = [];
    vendors.forEach( function (item) {
      if (_.contains(JSON.parse(item.categories), Session.get("getActiveService"))) {
        var obj = {};
        obj.serviceName = item.serviceName;
        obj.briefDescription = item.briefDescription;
        obj.vendorId = item.vendorId;
        objArray.push(obj);
      }
    });
    Session.set("eventsData", JSON.parse(JSON.stringify(objArray.slice(Session.get("showmore"), Session.get("showmore") + 5))));
    return Session.get("eventsData");
    // var data = JSON.parse(JSON.stringify(objArray.slice(Session.get("showmore"), Session.get("showmore") + 5)));
    // return JSON.parse(JSON.stringify(objArray.slice(Session.get("showmore"), Session.get("showmore") + 5)));
  }
}

Template.getServices.events({
  "click .request" : function (ev, template) {
    BootstrapDialog.confirm('Are you sure?', function (result) {
      if (result == true) {
        var vendorID = ev.target.attributes.dataId.nodeValue;
        var obj = {};
        obj.eventID = Session.get("activeEvents");
        obj.vendorID = vendorID;
        obj.activeService = Session.get("getActiveService");
        RequestQuote.insert(obj);

        var vendor = Vendors.findOne({_id: vendorID});
        var to = vendor.companyEmail
        var from = Meteor.user().emails[0].address;
        var subject = "Request Quote";
        var html = "<p> <a href='"+Session.get("serverHost")+"/login'>The event is created for your service! </a></p>";
        Meteor.call("sendEmail", to, from, subject, "", html, function (error, result) {
          if (error){
            console.log(error);
          }
          else {
            console.log("success!");
          }
        })
      }
    }); 
    console.log(Session.get("activeEvents")); return false;
    // console.log(vendor);
  }
});
