Template.ListEvent.rendered = function () {
  var id = getIdfromHyperLink($(".active").children("a").attr("href"));
  Session.set("getActiveService", id);

  $(function () {
    $(".nav-tabs a").on("click", function (e) {
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
  console.log(Session.get("getActiveService"));
  if (Session.get("getActiveService")) {
    
  }
  // console.log($("#sidemenu").attr("class"));
  // console.log(ListEvent.find('.active')).attr('id'));

  // console.log($(".active").attr("id"));
}