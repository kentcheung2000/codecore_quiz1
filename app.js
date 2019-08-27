const express = require('express');
const logger = require('morgan');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

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
app.use(express.urlencoded({
    extended: true
}));

console.log(__dirname);
app.use(express.static(path.join(__dirname, 'public')));

//  -= MIDDLEWARE =-

// logger/morgan

// when using "morgan" middleware, call it with a string that describes
// the formatting of the logs.
// more can be found in the docs https://github.com/expressjs/morgan
app.use(logger('dev'));

app.set('view engine', 'ejs');

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
app.post("/sign_in", (req, res) => {
    // res.cookie is used to set the SET-COOKIE header telling a browser to store a cookie with information
    res.cookie('username', req.body.username, {
        maxAge: new Date(COOKIE_MAX_AGE)
    })
    res.redirect('/');
})

app.post("/sign_out", (req, res) => {
    res.clearCookie("username"); // will remove the cookie
    res.redirect("/");
})


const PORT = 4572;
const ADDRESS = 'localhost';

app.listen(PORT, ADDRESS, () => {
    console.log(`Express Server started on ${ADDRESS}:${PORT}`);
});