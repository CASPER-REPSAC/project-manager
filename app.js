const express = require("express");
const session = require('express-session');
const app = express();

const router_index = require("./router/index");
const router_theme = require("./router/theme");

const config = require("./config/secret.json");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(session({
 secret: config.session_key,
 resave: false,
 saveUninitialized: true
}));

app.get("/", router_index);
app.get("/theme", router_theme);

app.listen(8080, () => {
    console.log("running");
})