const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.options('*', cors());


// set view html file
app.set("view engine", "ejs");

app.use(express.json());


// ====================== root path
app.get("/", (req, res) => {
    console.log('root');
    res.render("index", { text: " blog project" })
})

// ====================== router
const postsRouter = require('./routers/posts');
app.use("/posts", postsRouter);

const usersRouter = require('./routers/Users');
app.use("/users", usersRouter);

const loginRouter = require('./routers/Login');
app.use("/login", loginRouter);


app.use((req, res) => {
    res.status(404).send("404 notfound");
})
// ====================== port
app.listen(3000);