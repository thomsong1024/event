BasicEventDetailsSchema = new SimpleSchema({
   title : {
	   	type : String,
	   	label: "Name your Event",
	   	max : 20

   },
   description : {
   	    type : String,
   	    label : "Describe your Event",
   	    max : 4000
   },
   eventType : {
   	    type : EventTypeSchema,
   	    label : "Event Types"

   },
   location :{
        type : LocationSchema,
        label : "Location"   
   },
   categories :{
   		type: String,
        label : "Categories"   
   },
   date :{
   		type: String,
        label : "Date",
        max: 100  
   },
   duration :{
   		type: String,
        label : "Duration"   
   },
   number :{
   		type: String,
        label : "Number of People"   
   }   

});


UserServiceCartSchema = new SimpleSchema({
	serviceCategory : {
	   type : [ServiceCategoriesSchema]
	},
	budget :{
	   type : Number ,
	   optional: true
	},
	specialRequest: {
	   type : String,
	   optional : true,
	   max : 4000,
	   label : "Special Request"
	}
 });


/* Comments that arises between User & Vendor 
   during the Request for Proposal Phase (RFP)   
*/
RFPCommentsSchema = new SimpleSchema({
	 comments : {
	 	  type : String
	 },
	 date : {
	 	  type : Date
	 },
	 vendorQuotedAmount : {
	 	  type : Number
	 },
	 userid : {
	 	  type : String
	 }
});


/*

*/
ProcessedServiceCartSchema = new SimpleSchema({
		serviceCategory : {
		    type : ServiceCategoriesSchema
		 },	
	     vendorServiceId :{
	     	type : String 
	     },
	     vendorServiceName : {
	     	type : String
	     },
	 	 rfp : {
	     	type : Boolean
	     },
	     vendorQuotedAmount: {
	     	type : Number
	     },
	     acceptedAmount : {
	     	type: Number
	     },
	     rfpComments: {
	     	type : [RFPCommentsSchema]
	     },
	     acceptance : {
	     	type : Boolean
	     }
});	     

/* 
 Once the User submits a ServiceCart Request containing the services 
 needed for the Event. The System finds the best match Vendor providing 
 that service , this document is used to capture the vendor services and 
 the process flow that may occur when the user requests a RFP.    

*/

ProcessedEventSchema = new SimpleSchema({
		 
		 basicDetails : {
		 	type : BasicEventDetailsSchema
		 },
		 processedEventCart : {
		 	type : [ProcessedServiceCartSchema]
		 },
		  processedDate: {
   		       type: Date,
	      	   autoValue: function() {
                 if (this.isInsert) {
                    return new Date;
        	    } else if (this.isUpsert) {
          		    return {$setOnInsert: new Date};
       		    } else {
          			this.unset();
       		    }
      		},
      		denyUpdate: true
           }	
});
