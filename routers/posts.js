const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Posts = require("../models/Posts");

router.get("/a", (req, res) => {
    Posts.findAll().then(posts => {
        res.status(200).json(posts)
    }).catch(error => {
        res.status(400).send(error)
    })
})

router.get("/new", (req, res) => {
    res.send("posts new");
})


module.exports = router;