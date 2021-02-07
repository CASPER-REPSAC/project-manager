const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const post_row = await sendQuery(`SELECT post_idx, writer, title, post_date, type, tag FROM post ORDER BY post_idx DESC LIMIT 0, 10 `);
    const recent_comment = await sendQuery(`SELECT post_idx, writer, comment_content, comment_date FROM post_comment ORDER BY comment_idx DESC LIMIT 0, 5`);

    res.render("index", {require : data, post_data : post_row, recent_comment : recent_comment});
})

module.exports = router;