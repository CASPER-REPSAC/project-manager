const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    res.render("index", {require : data});
})

module.exports = router;