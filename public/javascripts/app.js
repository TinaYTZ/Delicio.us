/* jslint maxlen: 500 */

/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */
/*global console:true , io:true */
var main = function () {
    'use strict';
  
  
var socket= io.connect();  
var $userForm=$('#userForm');
var $username=$('#username');
var $mainArea=$('#mainArea');
var $userList=$('#userList');
var $pictureArea=$('#pictureArea') ;
var $indexbanner=$('#index-banner');

$('#allPic').click(function(e) {
        e.preventDefault();        
        $.getJSON('/allPic',function (Response) {
  // simply print the response to the console 
  // for the time being console.log(flickrResponse);  
        var html='';
    //console.log(array[]['path']);
    for (var i = 0; i < Response.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+Response[i].path+'"alt="" >';
    }
    $pictureArea.html(html);
  }); 
});

$('#ChinesePic').click(function(e) {
        e.preventDefault();        
        $.getJSON('/ChinesePic',function (Response) {
        // simply print the response to the console 
        // for the time being console.log(flickrResponse);  
        var html='';
        //console.log(array[]['path']);
    for (var i = 0; i < Response.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+Response[i].path+'"alt="" >';
    }
    $pictureArea.html(html);
  }); 
});

$('#koreanPic').click(function(e) {
        e.preventDefault();        
        $.getJSON('/koreanPic',function (Response) {
  // simply print the response to the console 
  // for the time being console.log(flickrResponse);  
        var html='';
    //console.log(array[]['path']);
    for (var i = 0; i < Response.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+Response[i].path+'"alt="" >';
    }
    $pictureArea.html(html);
  }); 
});

$('#JapanesePic').click(function(e) {
        e.preventDefault();        
        $.getJSON('/JapanesePic',function (Response) {
        var html='';
    for (var i = 0; i < Response.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+Response[i].path+'"alt="" >';
    }
    $pictureArea.html(html);
  }); 
});


$('#newUpload').click(function(e) {
        e.preventDefault();        
        $.getJSON('/newUpload',function (Response) {
        var html='';
    for (var i = 0; i < Response.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+Response[i].path+'"alt="" >';
    }
    $pictureArea.html(html);
  }); 
});




  socket.on('get users', function(data){
    var html='';
    for (var i = 0; i < data.length; i++) {
   // html+='<li  class='bg-info' >'+ data[i] +'</li>';
   html+='<p class="btn-info btn-sm"> <span class="glyphicon glyphicon-user"></span>' + data[i]+ '</p>';
  }
  $userList.html(html);
  });


  socket.on('images', function(data){
    //console.log(data); 
    //console.log(data[0]['path']);
    var html='';
    //console.log(array[]['path']);
    for (var i = 0; i < data.length; i++) {
      html+='<img class="img-responsive col-md-4" id="kfood" src="'+data[i].path+'"alt="" >';
    }
    $pictureArea.html(html);

  });

  socket.on('new image', function(path){
    console.log('new path:', path);
    $('#kfood0').attr('src', '/' + path);
  });



 $userForm.submit(function(e){
      e.preventDefault();
      socket.emit('new user', $username.val(),function(data){
        if(data){
          $indexbanner.hide();
          $mainArea.show();

        }
      });
      $username.val('');
  });
};

$(document).ready(main);
