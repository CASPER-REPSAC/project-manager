const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");
const check = require("../feature/check");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const user_auth = await check.getAuth(req.session.passport);

    res.render("index", {
        require : data, 
        user_auth : user_auth
    });
})

module.exports = router;