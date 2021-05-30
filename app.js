const express = require("express");
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const app = express();

const router_index = require("./router/index");
const router_post = require("./router/post");
const router_login = require("./router/login");
const router_write = require("./router/write");
const router_profile = require("./router/profile");
const router_feed = require("./router/feed/feed");
const router_api_index = require("./router/api/index");
const router_api_auth = require("./router/api/auth");
const router_api_delete = require("./router/api/delete");
const router_api_comment = require("./router/api/comment");
const router_api_like = require("./router/api/like");
const router_api_theme = require("./router/api/theme");
const router_api_upload = require("./router/api/upload");

const config = require("./config/secret.json");

app.use(favicon(__dirname + '/static/image/favicon.png'));
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
app.get("/post/:idx", router_post);
app.get("/write", router_write);
app.post("/write", router_write);
app.get('/login', router_login);
app.get("/logout", router_login);
app.get('/auth/google/callback', router_login);
app.get("/profile", router_profile);
app.get("/feed", router_feed);

app.get("/api/index", router_api_index);
app.post("/api/auth", router_api_auth);
app.delete("/api/post/:idx", router_api_delete);
app.post("/api/comment", router_api_comment);
app.post("/api/reply", router_api_comment);
app.get("/api/like/:idx", router_api_like);
app.get("/api/theme", router_api_theme);
app.post("/api/upload", router_api_upload);

app.get("*", (req, res) => {
    res.status(404);
    res.render("404");
})

app.listen(8081, () => {
    console.log("running");
})