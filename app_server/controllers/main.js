/* Rendering the home page */
const index = (request, response) => {
    response.render('index', { title: 'Travlr Getaways' });
};

module.exports = {
    index
};