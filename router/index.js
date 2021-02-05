const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const post_row = await sendQuery(`SELECT post_idx, writer, title, post_date, type, tag FROM post ORDER BY post_idx DESC LIMIT 0, 10 `);

    res.render("index", {require : data, post_data : post_row});
})

module.exports = router;