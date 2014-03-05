/* Schema */
EventTypeSchema = new SimpleSchema({
  _id: {
      type: String,
      autoValue: function() {
          if (this.isInsert) {
            return Random.id();
        } 
    }    
  },
  type: {
     type: String,
     label: "Type of Event"
  }
});

EventsSchema = new SimpleSchema({
  _id: {
    type: String,
    autoValue: function() {
      if (this.isInsert) {
        return Random.id();
      } 
    }
  },
  eventTitle: {
    type: String,
    label: "Title of Event"
  },
  eventDescription: {
    type: String,
    label: "Description of Event"
  },
  eventTypes: {
    type: String,
    label: "Type of Event"
  }, 
  date: {
    type: String,
    label: "Event Date"
  },
  categories: {
    type: String,
    label: "Categories"
  },
  nog: {
    type: String,
    label: "Number of Guests"
  },
  eventPrice: {
    type: String,
    label: "Price"
  },
  eventComments: {
    type: String,
    label: "Additional Comments"
  }
});

/* Events */
Events = new Meteor.Collection2("events", {
  smart: true,
  schema: EventsSchema
});

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

/* Event Types */
EventTypes = new Meteor.Collection2("eventtypes", {
	smart: true,
	schema: EventTypeSchema
});

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


LocationSchema = new SimpleSchema({
 _id: {
    type: String,
    autoValue: function() {
        if (this.isInsert) {
            return Random.id();
	    } 
	}
 },
	 district : {
  	type : String
  },
	 city : {
  	type : String
  },
  citycode : {
  	type : String,
  	max : 3
  },
  country : {
  	type : String
  }
});



Locations = new Meteor.Collection2("locations" , {
	smart: true,
	schema: LocationSchema
});

ServiceCategoriesSchema = new SimpleSchema({
  _id : {
   type: String,
   autoValue: function() {
         if (this.isInsert) {
            return Random.id();
	    } 
	}
  }, 	
  name : {
   	   type : String,
   	   label: "Sub-Category Name"  
   } ,
   parent : {
   	    type : String,
   	    label: "Parent Category"
   },
   file: {
   		type: String,
   		label: "Upload File",
   		optional: true
   }
});

ServiceCategories = new Meteor.Collection2("servicecategories" ,{
	smart: true,
	schema : ServiceCategoriesSchema

});




 




  


    