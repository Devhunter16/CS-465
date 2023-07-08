/* Rendering the about page */
const about = (request, response) => {
    response.render('about', { title: 'Travlr Getaways' });
};

module.exports = {
    about
};