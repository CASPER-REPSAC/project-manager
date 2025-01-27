import { Router } from "express";
const router = Router();
import sendQuery from "../../feature/db.js";

router.get("/api/index", async (req, res) => {
    const max_content_cnt = 10;
    const idx = Number(req.query.idx) ? max_content_cnt * (Number(req.query.idx) - 1): 1;
    const posts_row = await sendQuery(`SELECT user_id, post_idx, writer, title, post_date, type, tag, thumbnail FROM post ORDER BY post_idx DESC LIMIT ${idx}, ${max_content_cnt}`);
    const promises = posts_row.map(async (row, idx) => {
        if (row["title"].length > "30")
            posts_row[idx]["title"] = row["title"].substr(0,30) + "...";

        return posts_row[idx];
    }) 
    const result = await Promise.all(promises);

    res.json(result);
})

export default router;