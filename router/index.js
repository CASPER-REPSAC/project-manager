const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    let user_theme = req.session.user_theme;

    if(!user_theme)
        user_theme = "dark";

    res.render("index", {web_theme : user_theme});
})


module.exports = router;