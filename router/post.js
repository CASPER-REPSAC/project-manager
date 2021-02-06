const express = require("express");
const sendQuery = require("../feature/db");
const router = express.Router();
const requirement = require("../feature/requirement");

router.get("/post/:idx", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const post_idx = req.params.idx;

    const post_row = await sendQuery(`SELECT * FROM post WHERE post_idx=?`, [post_idx]);

    if(post_row.length == 0){
        res.send("<script>alert('해당 글이 존재 하지 않습니다.'); location.href='/'; </script>");
        return;
    }

    const post_attach = await sendQuery(`SELECT path FROM post_attach WHERE post_idx = ?`, [post_idx]);
    
    post_row[0].project_date = (await sendQuery(`SELECT date_format(?, '%Y-%m-%d') as date`, [post_row[0].project_date]))[0].date;
    post_row[0].contents = post_row[0].contents
    
    res.render("post", {require: data, post_data : post_row[0], post_attach : post_attach[0]});
})

module.exports = router;