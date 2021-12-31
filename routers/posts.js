const express = require("express");
const router = express.Router();


router.get("/a", (req, res) => {

    res.status(200)

})

router.get("/new", (req, res) => {
    res.send("posts new");
})


module.exports = router;