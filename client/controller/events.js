Template.ListEvent.rendered = function () {
  
  // var id = getIdfromHyperLink($(".active").children("a").attr("href"));
  // Session.set("getActiveService", id);
  // $(function () {
  //   $(".nav-tabs a").on("click", function (e) {
  //     $(".showmoreArea").show();
  //     Session.set("showmore", 0);
  //     e.preventDefault();
  //     var id = getIdfromHyperLink($(this).attr("href"));
  //     console.log(id);
  //     Session.set("getActiveService", id);
  //     // $(this).tab("show");
  //   })
  // });
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
  },
  "click .categoryTab" : function (e) {
      e.preventDefault();
      $(".showmoreArea").show();
      Session.set("showmore", 0);
      if (e.target.id)
        Session.set("getActiveService", e.target.id);
  }
});

Template.ListEvent.getSelectedCategories = function () {
  var events = Events.findOne({_id: Session.get("activeEvents")});
  if (events)
    return ServiceCategories.find({_id:{$in: JSON.parse(events.categories)}}).fetch();
}

Template.subCats.subcategories = function (parentItem) {
  if (Session.get("activeEvents")) {
    var events = Events.findOne({_id: Session.get("activeEvents")});
    var data = ServiceCategories.find({$and:[{parent: parentItem}]});

    if (data.count() > 0 && events) {
      var categoriesObjArray = [];
      data.forEach( function (item) {
        var obj = {};
          obj._id = item._id;
          obj.name = item.name;
          obj.categories = events.categories;
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
    var eventType = [eventObj.eventTypes];
    var eventLocations = [eventObj.eventLocations];
    var categories = [Session.get("getActiveService")];
    var vendorServices = VendorServices.find({$and:[{categories: {$in: categories}}, {locations: {$in: eventLocations}}, {eventType: {$in: eventType}}, {"nog": {$gt: parseFloat(max)}}]});
    var objArray = [];
    vendorServices.forEach( function (item) {
      var requestedQuotation = RequestQuote.findOne({$and: [{eventID: Session.get("activeEvents")}, {vendorServiceID: item._id}, {activeService: Session.get("getActiveService")}]});
      var obj = {};
      obj.serviceName = item.serviceName;
      obj.briefDescription = item.briefDescription;
      obj.vendorId = item.vendorId;
      obj.vendorServiceID = item._id;
      obj.requested = "";
      obj.disable = "";

      if (requestedQuotation) {
        obj.requested = "requested";
        obj.disable = "disabled";
      }
      objArray.push(obj);
      // if (_.contains(JSON.parse(item.categories), Session.get("getActiveService"))) {
      //   var obj = {};
      //   obj.serviceName = item.serviceName;
      //   obj.briefDescription = item.briefDescription;
      //   obj.vendorId = item.vendorId;
      //   objArray.push(obj);
      // }
    });
    Session.set("eventsData", JSON.parse(JSON.stringify(objArray.slice(Session.get("showmore"), Session.get("showmore") + 5))));


      return Session.get("eventsData");
  }
}

Template.getServices.events({
  "click .request" : function (ev, template) {
    BootstrapDialog.confirm('Are you sure?', function (result) {
      if (result == true) {
        var vendorID = ev.target.attributes.dataId.nodeValue;
        var vendorServiceID = ev.target.attributes.dataServiceID.nodeValue;
        var obj = {};
        obj.eventID = Session.get("activeEvents");
        obj.vendorID = vendorID;
        obj.vendorServiceID = vendorServiceID;
        obj.activeService = Session.get("getActiveService");
        obj.userID = Meteor.userId();

        RequestQuote.insert(obj);

        var vendor = Vendors.findOne({_id: vendorID});
        var to = vendor.companyEmail;
        var from = Meteor.user().emails[0].address;

        var subject = "Request Quote";

        var html = "<p> <a href='"+Session.get("serverHost")+"/login'>The event is created for your service! </a></p>";
        Meteor.call("sendEmail", to, from, subject, "", html, function (error, result) {
          if (error){
            // var messages = { "userID" : Meteor.userId(), "vendorID" : vendorID, "texts" : "text", "Request Quote" : "eventID", "categoryID" : "categoryID", "from" : "from", "attachment" : "attachment", "dates" : "dates", "parents" : "parent", "_id" : "gzoKZRXEkgJXimGCh" };
            // Messages.insert(messages); return false;
            var messages = {};
            messages.userID = Meteor.userId();
            messages.vendorID = vendorID;
            messages.texts = "Request Quote";
            messages.eventID = Session.get("activeEvents");
            messages.categoryID = Session.get("getActiveService");
            messages.from = "user";
            messages.dates = moment().unix();
            messages.parents = "0";
            messages.userUnread = false;
            messages.vendorUnread = true;
            messages.mtype = "text";
            Messages.insert(messages);
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

