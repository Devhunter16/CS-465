/* Rendering the rooms page */
const rooms = (request, response) => {
    response.render('rooms', { title: 'Travlr Getaways' });
};

module.exports = {
    rooms
};