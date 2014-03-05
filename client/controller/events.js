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

Template.ListEvent.categoryList = function () {
  var servicecat=ServiceCategories.find({$and:[{parent:"0"}]}).fetch();
  return servicecat;
};

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