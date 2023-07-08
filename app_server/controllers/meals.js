const meals = (request, response) => {
    response.render('meals', { title: 'Travlr Getaways' });
};

module.exports = {
    meals
};