/* MVC Architecture: 
* Model, View, Controller - A web server architecture that splits applications into
* different sections which all have their own purpose. 
* 
* Controller - Acts as a middleman between Model and Veiw. When the controller recieves 
* a request (usually from the user), it asks the Model for information based on the 
* request. The controller does not deal with any data logic, it handles user requests, 
* and what to do on failure or success.
* 
* Model - Responsible for handling all of the data logic of the request. The model will
* interact with the database and is responsible for all of the validation, saving,
* udating, deleting, etc. of the data. The model never worries about handling user
* requests, that is the Controller's job.
*
* View - The view is responsible for presenting information. It is a template file that
* renders html based on the data the controller sends it. The view sends it's
* presentation to the controller, and the controller sends that back to the user so
* that they can view it.

          model       view
          ^  \        ^ l
           \  \      | l 
            \  \    | l
             \  v  | V
    user ---> controller
         <--- 

* In this design, the Model and View never interact with one another directly, only
* through the controller. 
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const handlebars = require('hbs');
require('./app_api/database/db');

const indexRouter = require('./app_server/routes/index');
const usersRouter = require('./app_server/routes/users');
const travelRouter = require('./app_server/routes/travel');
const roomsRouter = require('./app_server/routes/rooms');
const mealsRouter = require('./app_server/routes/meals');
const newsRouter = require('./app_server/routes/news');
const aboutRouter = require('./app_server/routes/about');
const contactRouter = require('./app_server/routes/contact');
const apiRouter = require('./app_api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
// Registering our handlebars partials
handlebars.registerPartials(path.join(__dirname, 'app_server', 'views/partials'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Using our routes to render pages.
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/rooms', roomsRouter);
app.use('/meals', mealsRouter);
app.use('/news', newsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;