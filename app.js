const express = require("express");
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const app = express();

const router_index = require("./router/index");
const router_theme = require("./router/theme");
const router_post = require("./router/post");
const router_login = require("./router/login");
const router_write = require("./router/write");
const router_upload = require("./router/upload");
const router_comment = require("./router/comment");
const router_delete = require("./router/delete");

const config = require("./config/secret.json");

app.use(passport.initialize());
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(session({
 secret: config.session_key,
 resave: false,
 saveUninitialized: true
}));

app.get("/", router_index);
app.get("/theme", router_theme);
app.get("/post/:idx", router_post);
app.get("/write", router_write);
app.post("/write", router_write);
app.get('/login', router_login);
app.get("/logout", router_login);
app.get('/auth/google/callback', router_login);
app.post("/upload", router_upload);
app.post("/comment", router_comment);
app.post("/reply", router_comment);
app.delete("/post/:idx", router_delete);

app.listen(8080, () => {
    console.log("running");
})