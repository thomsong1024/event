Template.ServiceCateogiesTp.events( {
    'change input[type="file"]': function(ev, template) {
    	ev.preventDefault();
    	var file = document.getElementById('file').files[0];
        if (file != undefined ) {
            fileType = file.type;
            reader = new FileReader();
            reader.onload = function(e) {
                var image = new Image();
                    image.src = reader.result;
                image.onload = function() {
                    var maxWidth = 100,
                        maxHeight = 100,
                        imageWidth = image.width,
                        imageHeight = image.height;

                    if (imageWidth > imageHeight) {
                        if (imageWidth > maxWidth) {
                          imageHeight *= maxWidth / imageWidth;
                          imageWidth = maxWidth;
                        }
                    }
                    else {
                        if (imageHeight > maxHeight) {
                          imageWidth *= maxHeight / imageHeight;
                          imageHeight = maxHeight;
                        }
                    }

                    var canvas = document.createElement('canvas');
                    canvas.width = imageWidth;
                    canvas.height = imageHeight;

                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, imageWidth, imageHeight);
                    var finalFile = canvas.toDataURL(fileType);

                    Session.set("cat_img", e.target.result);
                    Session.set("cat_thumbnail", finalFile);
                    
                    // Quick test to verify upload: Update an image on the page with the data
                    $(template.find('img')).attr('src', finalFile);
                }           
            
            }
            reader.readAsDataURL(file);
        }
    }
});

Template.CreateVendorUser.events({
    "submit": function (e) {
        e.preventDefault();
        e.preventDefault();
        var obj = {};
        obj.profile = {};

        obj.username = username.value;
        obj.email = email.value;
        obj.password = password.value;
        
        obj.profile.firstname = firstname.value;
        obj.profile.lastname = lastname.value;
        obj.profile.telno = telno.value;
        var roles = ["vendor-user"];
        // console.log(Accounts); return false;
        Meteor.call("createUserWithRole", obj, roles, function ( error, result ){
            if (error) {
                console.log(error);
            }
            else {
                Router.go('/login'); 
            }
        });        
    }
});

Template.createVendorService.events({
    "submit" : function (e) {
        e.preventDefault();
        var obj = {};
        obj.serviceName = serviceName.value;
        obj.briefDescription = briefDescription.value;
        obj.nog = nog.value;
        var checked = [];
        $("input[name='categories[]']:checked").each( function ( ){
          checked.push($(this).val());
        });
        obj.categories = JSON.stringify(checked);
        obj.priceRange = priceRange.value;
        obj.eventType = eventType.value;
        console.log(obj);
    }
});