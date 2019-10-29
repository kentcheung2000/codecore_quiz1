const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const cluckrRouter = require("./routes/cluckrs");



const knex = require("./db/client");

const app = express();

app.use(express.urlencoded({
    extended: true
}));

app.use(methodOverride((req, res) => {
    if (req.body && req.body._method) {
        const method = req.body._method
        return method;
    }
    // method override will set the HTTP verb to whatever is returned inside of this callback
    // We use this if we want to use the HTTP verbs DELETE, PATCH, PUT because HTML forms
    // Do not support these verbs
}))

// app.use: use this function to mount middleware

// custom middleware to get username
function getUsernameMiddleware(request, response, next) {
    // response.locals is an object that allows us to set global variables
    // variables that are accessable within any template

    response.locals.username = request.cookies.username;
    next();
}

app.use(cookieParser()); // cookie-parser middleware will look for cookies sent through the headers of
// a request and create a req.cookies object that houses the cookie data
app.use(getUsernameMiddleware);

// this will parse x-www-urlencoded data to something that is easy to work with
// it will also add this data to req.body

app.use(getUsernameMiddleware);


console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

//  -= MIDDLEWARE =-

// logger/morgan

// when using "morgan" middleware, call it with a string that describes
// the formatting of the logs.
// more can be found in the docs https://github.com/expressjs/morgan
app.use(logger('dev'));

app.set('view engine', 'ejs');

app.use(cluckrRouter);

const PORT = 4572;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
    console.log(`Express Server started on ${ADDRESS}:${PORT}`);
});