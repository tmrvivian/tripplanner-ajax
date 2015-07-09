$(document).ready(function(){
	$.post( "ajax/test.html", function( data ) {
  	$( ".result" ).html( data );
	});
})