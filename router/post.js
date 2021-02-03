const express = require("express");
const router = express.Router();
const checkTheme = require("../feature/checkTheme");

router.get("/post", (req, res) => {
    const [user_theme, check] = checkTheme.check(req.session.user_theme);

    res.render("post", {web_theme : user_theme, check: check});
})

module.exports = router;
