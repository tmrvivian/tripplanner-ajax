
$(document).ready(function() {

    // Initialize Map
    if (navigator.geolocation) { 
        navigator.geolocation.getCurrentPosition(function (position) {
            initialize_gmaps(position.coords.latitude, position.coords.longitude);
        });
    } else {
        initialize_gmaps();
    }

  $.get( "/days/", function(days) {
  	days.forEach(function(day, index){
      templates.get('day-btn')
      .insertBefore($addDay)
      .attr('data-day-number', day.number)
      .addClass('switch-day')
      .text(day.number);
  	});
  	if(days.length){
  		$('.day-buttons  .day-btn').first().addClass('current-day');
  	}
  });
});
