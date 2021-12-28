const express = require("express");
const app = express();

// connect to database
const db = require("./config/database");
db.sync()
//db.sync({ force: true });

// set view html file
app.set("view engine", "ejs");




// ====================== root path
app.get("/", (req, res) => {
    console.log('root');
    res.render("index", { text: " blog project" })
})

// ====================== router
const postsRouter = require('./routers/posts');
app.use("/posts", postsRouter);

// ====================== port
app.listen(3000);