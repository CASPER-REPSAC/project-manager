const express = require("express");
const router = express.Router();
const executeQuery = require("../../feature/db");

router.get("/api/index", async (req, res) => {
    const idx = Number(req.query.idx) ? 6 * (Number(req.query.idx) - 1): 1;
    const posts_row = await executeQuery(`SELECT user_id, post_idx, writer, title, post_date, type, tag FROM post ORDER BY post_idx DESC LIMIT ${idx}, 6`);
    const promises = posts_row.map(async (row, idx) => {
        const user_image = await executeQuery(`SELECT user_image FROM user WHERE user_id = ?`, [row["user_id"]]);
        posts_row[idx]["user_image"] = user_image[0]["user_image"];
        return posts_row[idx];
    }) 
    const result = await Promise.all(promises);

    res.json(result);
})

module.exports = router;