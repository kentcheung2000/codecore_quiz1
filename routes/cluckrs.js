const express = require("express");

const knex = require("../db/client");

const router = express.Router();


router.get("/", (req, res) => {
    res.render('index');
})

const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;
router.post("/sign_in", (req, res) => {
    // res.cookie is used to set the SET-COOKIE header telling a browser to store a cookie with information
    res.cookie('username', req.body.username, {
        maxAge: new Date(COOKIE_MAX_AGE)
    })
    res.redirect('/');
})

router.post("/sign_out", (req, res) => {
    res.clearCookie("username"); // will remove the cookie
    res.redirect("/");
})

router.get("/new", (req, res) => {
    res.render("new");
});




module.exports = router;