
var model = {
    hotels: {},
    restaurants: {},
    thingsToDo: {}
};

data.hotels.forEach(function (hotel) {
    model.hotels[hotel._id] = hotel;
});

data.restaurants.forEach(function (restaurant) {
    model.restaurants[restaurant._id] = restaurant;
});

data.thingsToDo.forEach(function (thing) {
    model.thingsToDo[thing._id] = thing;
});