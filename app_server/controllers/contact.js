/* Rendering the contact page */
const contact = (request, response) => {
    response.render('contact', { title: 'Travlr Getaways' });
};

module.exports = {
    contact
};