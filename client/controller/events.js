Template.ListEvent.rendered = function () {
  
  // var id = getIdfromHyperLink($(".active").children("a").attr("href"));
  // Session.set("getActiveService", id);

  $(function () {
    $(".nav-tabs a").on("click", function (e) {
      Session.set("showmore", 0);
      e.preventDefault();
      var id = getIdfromHyperLink($(this).attr("href"));
      Session.set("getActiveService", id);
      $(this).tab("show");
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
    Session.set("showmore", count + 5);
  }
});

Template.ListEvent.categoryList = function () {
  var servicecat=ServiceCategories.find({$and:[{parent:"0"}]}).fetch();
  return servicecat;
};

Template.ListEvent.getLocation = function (id) {
  var location = Locations.findOne({_id: id});
  return location.district+", "+location.city;
};

Template.ListEvent.getEventType = function (id){
  var events = EventTypes.findOne({_id: id});
  return events.type;
};

Template.ListEvent.getDateFormat = function (date) {
  var obj = {};
  obj.date = moment().date();
  obj.month = moment.monthsShort('-MMM-', moment().month());
  obj.year = moment().year();
  return obj;
};

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
    var vendors = VendorServices.find({$and:[{locations: eventObj.eventLocations}, {eventType: eventObj.eventTypes}, {nog: eventObj.nog}]});
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
    return JSON.parse(JSON.stringify(objArray.slice(Session.get("showmore"), Session.get("showmore") + 5)));
  }
}

Template.getServices.events({
  "click .request" : function (ev, template) {
    var vendorID = ev.currentTarget.attributes.dataId.nodeValue;
    var vendor = Vendors.findOne({_id: vendorID});
    // console.log(vendor);
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
    // console.log(vendor);
  }
});
