const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.options("*", cors());

// set view html file
app.set("view engine", "ejs");

app.use(express.json());

// ====================== root path
app.get("/", (req, res) => {
  console.log("root");
  res.render("index", { text: " blog project" });
});

// ====================== router
// =========== manage
const managePostsRouter = require("./routers/ControlPanel/post");
app.use("/manage/post", managePostsRouter);

const manageUsersRouter = require("./routers/ControlPanel/Users");
app.use("/manage/users", manageUsersRouter);

const manageLoginRouter = require("./routers/ControlPanel/Login");
app.use("/manage/login", manageLoginRouter);

const manageLogoutRouter = require("./routers/ControlPanel/Logout");
app.use("/manage/logout", manageLogoutRouter);

const manageCategoryRouter = require("./routers/ControlPanel/Category");
app.use("/manage/category", manageCategoryRouter);

const manageCommentRouter = require("./routers/ControlPanel/Comment");
app.use("/manage/comment", manageCommentRouter);

// ========== blog
const blogPostRouter = require("./routers/Blog/post");
app.use("/blog/post", blogPostRouter);

const blogCategoryRouter = require("./routers/Blog/Category");
app.use("/blog/category", blogCategoryRouter);

// ========== not found
app.use((req, res) => {
  res.status(404).send("404 notfound");
});
// ====================== port
app.listen(3000);
