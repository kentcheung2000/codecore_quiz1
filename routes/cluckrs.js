const express = require("express");

const knex = require("../db/client");

const router = express.Router();

// let CluckrModel = require('../models/cluckr');

// router.use('/cluckr', cluckr);

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

router.post("/new", (req, res) => {
    const cluckrsParams = {
        content: req.body.content,
        image_url: req.body.image_url,
    };

    // save a article to database
    knex("cluckr")
        .insert(cluckrsParams)
        .returning("*")
        .then((data) => {
            res.send(data);
        });
});


router.get("/cluckrs", (req, res) => {

    knex.select('*').from('cluckr')
        .then(data => {
            res.render("cluckrs", {
                cluckr: data
            });
        })

})




module.exports = router;