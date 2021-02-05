const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");

router.get("/post", async (req, res) => {
    const data = await requirement.getRequireData(req.session);

    res.render("post", {require: data});
})

module.exports = router;
