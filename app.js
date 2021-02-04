const express = require("express");
const session = require('express-session');
const passport = require('passport');
const app = express();

const router_index = require("./router/index");
const router_theme = require("./router/theme");
const router_post = require("./router/post");
const router_login = require("./router/login");
const router_write = require("./router/write");

const config = require("./config/secret.json");

app.use(passport.initialize());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(session({
 secret: config.session_key,
 resave: false,
 saveUninitialized: true
}));

app.get("/", router_index);
app.get("/theme", router_theme);
app.get("/post", router_post);
app.get("/write", router_write);
app.get('/login', router_login);
app.get("/logout", router_login);
app.get('/auth/google/callback', router_login);

app.listen(8080, () => {
    console.log("running");
})