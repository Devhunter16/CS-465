/* Rendering the travel page */
const travel = (request, response) => {
    response.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    travel
};