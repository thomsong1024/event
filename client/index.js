Meteor.subscribe("eventtypes");
Meteor.subscribe("locations");
Meteor.subscribe("servicecategories");

EventTypeForm = new AutoForm(EventTypes);
LocationsForm = new AutoForm(Locations);
ServiceCategoriesForm = new AutoForm(ServiceCategories);

EventTypes.allow({
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


var cb = {
  insert: function(error, result) {
    if (error) {
      console.log("Insert Error:", error);
    } else {
     $('#event1').attr('onclick',"location.href='/id/"+result+"'");
      //onclick="location.href='http://www.example.com';" style="cursor:pointer;"
      console.log("Insert Result:", result);
    }
  },
  update: function(error) {
    if (error) {
      console.log("Update Error:", error);
    } else {
      console.log("Updated!");
    }
  },
  remove: function(error) {
    console.log("Remove Error:", error);
  }
};

var uploadCategoryBefore = {
  insert: function (doc) {
    if (Session.get("cat_img") && Session.get("cat_thumbnail")) {
      // var obj = {};
      var tags = [];
      _.each(doc, function (val, key) {
        tags.push(val);
      });
      doc.tags = tags.join(", ");
      var data = {};
      data.name = doc.name;
      data.parent = doc.parent;
      data.file = Session.get("cat_img");
      data.thumbnail = Session.get("cat_thumbnail");
      return data;
    }   
  }
}
var uploadCategoryAfter = {}

Locations.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  fetch: []
});

ServiceCategories.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  },
  fetch: []
});

Meteor.startup(function() {
  EventTypeForm.hooks({
    after: cb,
    before: {
      insert: function (doc) {
        return doc;
      }
    }
  });

  LocationsForm.hooks({
    before: {
      remove: function(id) {
        var name = Locations.findOne(id);
        return confirm("Remove " + district + "?");
      },
      insert: function (doc) {
        console.log(doc);
        return doc;
      }      
     },
     after: {
      insert: function (error, result) {
        console.log(error);
      }
     }
  });
  ServiceCategoriesForm.hooks({
    after: uploadCategoryAfter,
    before: uploadCategoryBefore
  });
  // EventCreationForms.hooks({
  //   after: cb,
  //   before: {
  //     insert: function (doc) {
  //      console.log(doc);
  //       doc.basicDetails.eventType = EventTypes.findOne({_id:doc.basicDetails.eventType._id});
  //       doc.basicDetails.location = Locations.findOne({_id:doc.basicDetails.location._id});

  //       var serviceCartObjArray = new Array();
  //          var serviceCateObject = _.map(doc.serviceCart,function(s){
  //             sCategoryItems =_.each(s.serviceCategory,function(sCategoryItem) {
  //             s.serviceCategory.unshift(ServiceCategories.findOne({_id:sCategoryItem}));    
  //             s.serviceCategory.pop(); 
  //           });
  //           serviceCartObjArray.push(s);
  //       });
  //       doc.serviceCart=serviceCartObjArray;
  //       return doc;
  //     }
  //   }
  // });
}); 

 Template.eventTypes.schema = function() {
    return EventTypeForm;
  };


 Template.eventTypeTable.eventtypes = function() {
    var eventtypes = EventTypes.find();
    return eventtypes;
  };

  Template.eventTypes.selectedEventTypes = function() {
    return EventTypes.findOne(Session.get("selectedEventType"));
  };

  Template.buttons.newEventTypeMode = function() {
    return !Session.get("selectedEventType");
  };

  Template.eventTypeTable.events({
    'click  .eventTypeSelect': function(e, t) {
      e.preventDefault();
      AutoForm.resetForm("EventTypeForm", EventTypes.simpleSchema());
      Session.set("selectedEventType", this._id);
    },
    'click .eventTypeClear': function(e, t) {
      e.preventDefault();
      AutoForm.resetForm("EventTypeForm", EventTypes.simpleSchema());
      Session.set("selectedEventType", null);
    }
  });


  Template.LocationsTable.locations = function() {
    return Locations.find();
  };

  Handlebars.registerHelper("categoryOptions", function(options) {
    var serviceCat = ServiceCategories.find({parent:"0"});
    var serviceCount = serviceCat.count();
    var categoriesObjArray = new Array({label:'Main Category',value:'0'});
    serviceCat.forEach(function (category) {
 		  var categoryObj = new Object();
		    categoryObj.label = category.name;
    		categoryObj.value = category._id;	
    	  categoriesObjArray.push(categoryObj);
		   });
        return JSON.parse(JSON.stringify(categoriesObjArray));
   
  });



 



  
