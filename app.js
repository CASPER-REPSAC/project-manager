const express = require("express");
const session = require('express-session');
const app = express();

const config = require("./config/secret.json");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/static"));
app.use(session({
 secret: config.session_key,
 resave: false,
 saveUninitialized: true
}));

app.get("/", (req, res) => {
    res.render("index");
})

app.listen(8080, () => {
    console.log("running");
})