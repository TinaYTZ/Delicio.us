/* jslint maxlen: 500 */
/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */
var main = function () {
    'use strict';
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

 /*function handleGET(url) {
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

 
*/
function(){
    $.ajax({ url: '/'
         , type: 'GET'
        })
    .done(function(data) {
      console.log(data);
    });

};

$(document).ready(main);