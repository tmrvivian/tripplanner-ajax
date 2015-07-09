
// Mode / State / Data Structure
  var days = [],
      currentDay = null;

// DOM variables
var $addDay = $('.add-day');
var $switchDay = $('.day-buttons');
var $removeDay = $('.remove-day');

// New day model
/*function getNewDay() {
  return {
    restaurants: [],
    thingsToDo: [],
    hotel: null,
    dayNumber: days.length + 1
  };
}*/

/*function switchDay (dayIndex) {

  if (dayIndex < 0) return;

  $('.switch-day').removeClass('current-day');
  $('[data-day-number=' + (dayIndex + 1) + ']').addClass('current-day');

  currentDay = days[dayIndex];

  $('.day-title').find('.current-day-label')
    .text('Day ' + (dayIndex + 1));

  $('.list-group').empty();

  clearMarkers();

  addActivity('hotels', currentDay.hotel);

  currentDay.restaurants.forEach(function (restaurant) {
      addActivity('restaurants', restaurant);
  });

  currentDay.thingsToDo.forEach(function (thing) {
      addActivity('thingsToDo', thing);
  });

}*/

// Assumes the first day exists
//days.push(getNewDay());
// Select the first day
currentDay = days[0];

// Add day event handler
$addDay.on('click', function () {

  // templates.get('day-btn')
  //   .insertBefore($(this))
  //   .attr('data-day-number', newDay.dayNumber)
  //   .text(newDay.dayNumber);
  $.post( "/days/", function(day) {
      templates.get('day-btn')
      .insertBefore($addDay)
      .attr('data-day-number', day.number)
      .text(day.number);;
      if(day.number ===1){
        $('.day-buttons  .day-btn').first().addClass('current-day');
      }
  });
});



$switchDay.on('click', '.switch-day', function () {

  var dayNumber = parseInt($(this).text());

  //switchDay(dayIndex);
  $.get('/days/'+dayNumber,function(day){
    if (day.number < 1) return;

    $('.switch-day').removeClass('current-day');
    $('[data-day-number=' + day.number + ']').addClass('current-day');

    $('.day-title').find('.current-day-label')
      .text('Day ' + dayNumber);

    $('.list-group').empty();

    clearMarkers();

    if(day.hotel){
      addActivity('hotels', day.hotel.name);
    }
    day.restaurants.forEach(function (restaurant) {
      addActivity('restaurants', restaurant.name);
    });
    day.thingsToDo.forEach(function (thing) {
      addActivity('thingsToDo', thing.name);
    });
  });

});

$removeDay.on('click', function () {

  var dayNumber = currentDay.dayNumber;

   if (days.length === 1) {
    return alert('You cannot remove the only day left!');
  } else if (dayNumber !== days[days.length - 1].dayNumber) {
    return alert('You can only remove starting from the last day added!');
  } 

  // Remove by day index from state
  days.splice(dayNumber - 1, 1);
  // Remove by day number from the DOM
  $('[data-day-number=' + dayNumber + ']').remove();
  
  // Switch to previous (existing) day
  switchDay(dayNumber - 2);

});


