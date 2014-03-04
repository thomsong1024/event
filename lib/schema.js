Events = new Meteor.SmartCollection("events");
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


EventTypes = new Meteor.Collection2("eventtypes", {
	smart: true,
	schema: EventTypeSchema
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




 




  


    