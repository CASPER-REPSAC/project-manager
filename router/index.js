const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const post_row = await sendQuery(`SELECT post_idx, writer, title, post_date FROM post ORDER BY post_date DESC`);
    post_row[0].post_date = (await sendQuery(`SELECT date_format(?, '%Y-%m-%d') as date`, [post_row[0].post_date]))[0].date;
    
    res.render("index", {require : data, post_data : post_row});
})

module.exports = router;