const express = require("express");
const router = express.Router();

router.get("/theme", (req, res) => {
    const data = (req.query.data == "dark" ? "dark" : "light");
    req.session.user_theme = data;

    res.json({"result" : "success"});
})

module.exports = router;