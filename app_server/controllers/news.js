const news = (request, response) => {
    response.render('news', { title: 'Travlr Getaways' });
};

module.exports = {
    news
};