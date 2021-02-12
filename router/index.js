const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");
const check = require("../feature/check");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const post_row = await sendQuery(`SELECT post_idx, writer, title, post_date, type, tag FROM post ORDER BY post_idx DESC LIMIT 0, 10 `);
    const recent_comment = await sendQuery(`SELECT post_idx, writer, comment_content, comment_date FROM post_comment ORDER BY comment_idx DESC LIMIT 0, 10`);
    const popular_row = await sendQuery(`SELECT * FROM post WHERE like_count >= 1 ORDER BY like_count DESC LIMIT 0, 10`);
    const user_auth = await check.getAuth(req.session.passport);

    res.render("index", {
        require : data, 
        post_data : post_row, 
        recent_comment : recent_comment, 
        popular : popular_row, 
        user_auth : user_auth
    });
})

module.exports = router;