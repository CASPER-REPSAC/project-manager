const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let user_theme = req.session.user_theme;
    let check = true;

    if(!user_theme || user_theme == "dark"){
        user_theme = "dark";
        check = false;
    }

    res.render("index", {web_theme : user_theme, check : check});
})


module.exports = router;