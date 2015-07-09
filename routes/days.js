var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');

// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Day.find({}, function(err, data){
        if(err) return next(err);
        else res.json(data);
    });
    
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    models.Day.find(function(err, data){
        if(err) {return next(err);
        }else {
            var day = new models.Day({
            number:data.length+1,
            hotel:null,
            restaurants:[],
            thingsToDo:[]
            });
            day.save();
            res.json(day);
        }
    });
    
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
    models.Day.findOne({number:req.params.id}, function(err, data){
        if(err) return next(err);
        else res.json(data);
    });
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
    // models.Day.find({id:req.params.id}, function(err, data){
    //     if(err) return next(err);
    //     else res.json(data);
    // });

});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel


attractionRouter.post('/hotel', function (req, res, next) {
// creates a reference to the hotel
    models.Day.findOne({number:req.params.id},function(err, day){
        if(err) return next(err);
        models.Hotel.findOne({id:req.body},function(err,hotel){
            if(err) return next(err);
            //console.log(hotel)
            //console.log(day)
            //day.hotel._id=hotel._id;
            res.json(hotel);
        })
    })    
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = dayRouter;