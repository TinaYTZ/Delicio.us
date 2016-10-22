var main = function () {
    'use strict';


  var socket= io.connect();
  
  var $userFormArea=$("#userFormArea");
  var $userForm=$("#userForm");
  var $users=$('#users');
  var $username=$('#username');
  var $mainArea=$("#mainArea");
  var $uploadForm=$('#uploadForm');
  var $upload=$('#upload');
  var $userList=$('#userList'); 
  
  socket.on('get users', function(data){
    var html='';
    for (var i = 0; i < data.length; i++) {
   // html+='<li  class="bg-info" >'+ data[i] +'</li>';
html+='<p class="btn-info btn-sm"> <span class="glyphicon glyphicon-user"></span>' + data[i]+ '</p>';
  }
  $userList.html(html);
  }); 


  $userForm.submit(function(e){
      e.preventDefault();
      socket.emit('new user', $username.val(),function(data){
        if(data){
          $userFormArea.hide();
          $mainArea.show();

        }
      });
      $username.val('');
  });


}
/*
  $uploadForm.submit(function() {
    e.preventDefault();
    $(this).ajaxSubmit({

        error: function(xhr) {
            console.log('Error: ' + xhr.status);
        },

        success: function(response) {
            console.log('Success: ' + response);
        }
    });

    return false;
});
  */

  /*
  $uploadForm.submit(file,function(e){
      e.preventDefault();
      var files = $('#upload').val();
      handlePOST('/upload', '.uploadresult', file);
      $upload.val('');
  });

      // Send POST request via ajax
    function handlePOST(url, obj, json) {
        $.ajax({
            type: 'POST',
            url: url,
            timeout: 15000,
            data: json,
            success: function(data) {
                // Get result data
                console.log('Result success');
                $(obj).text("Upload successfully");
            },
            error: function (result) {
                console.log('ajax error ' + result.status);
            }
        });
    }



};


*/










$(document).ready(main);

/*var main = function () {
    'use strict';
     var socket = io.connect();


    var $mainArea=$("#mainArea");
    var $userFormArea=$("#userFormArea");
    var $userForm=$("#userForm");
    var $username=$('#username');



    
    socket.on('get users', function(data){
    var html='';
    for (var i = 0; i < data.length; i++) {
    html+='<li class="list-group-item">'+ data[i] +'</li>'
    }
    $users.html(html);
    });

    $userForm.submit(function(e){
    e.preventDefault();
    socket.emit('new user', $username.val(),function(data){
    if(data){
      $userFormArea.hide();
      $mainArea.show();
        }
    });
      $username.val('');
});



 // Send POST request via ajax
    function handlePOST(url, obj, json) {
        $.ajax({
            type: 'POST',
            url: url,
            timeout: 15000,
            data: json,
            success: function(data) {
                // Get result data
                console.log('Result' + data);
                $(obj).text(data);
            },
            error: function (result) {
                console.log('ajax error ' + result.status);
            }
        });
    }

 

 /*function 
 handleGET(url) {
  $.ajax({
  	type:'GET',
  	url:url,
  	data:json,
  	error: function() {
         $('#info').html('<p>An error has occurred</p>');
      },
     success: function(data) {
         json.forEach(function (value){
         var img = $("<img />").attr('src', value.['path']);
         .on('load', function() {
        	if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
            	alert('broken image!');
            	$(".four.wide.column").append(img);
        	} else {
            $(".four.wide.column").append(img);
        	}
    	});
		});
	}         
  });
}

 
/*
function(){
    $.ajax({ url: '/'
         , type: 'GET'
        })
    .done(function(data) {
      console.log(data);
    });

};




}


$(document).ready(main);*/
