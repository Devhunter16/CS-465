// Requiring the built-in Node.js file system so we can retrieve the JSON data in trips.json
const fileSystem = require('fs');

// Storing our parsed JSON data in the "trips" variable so that trips is an object
const trips = JSON.parse(fileSystem.readFileSync('./data/trips.json', 'utf8'));

/* 
* Rendering the travel page (Passing our "trips" variable through so that we can use
* the data stored within in our travel.hbs page
*/
const travel = (request, response) => {
    response.render('travel', { title: 'Travlr Getaways', trips });
};

module.exports = {
    travel
};