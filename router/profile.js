const express = require("express");
const router = express.Router();
const sendQuery = require("../feature/db");
const check = require("../feature/check");
const requirement = require("../feature/requirement");

router.get("/profile/:writer", async (req, res) => {
    const user_id = await checkUserName(req.params.writer);
    const user_auth = await check.getAuth(req.session.passport);

    if(user_id == -1){
        res.send("<script>alert('사용자가 존재하지 않습니다.'); location.href='/'; </script>");
        return;
    }
    
    const require = await requirement.getRequireData(req.session);
    const total_count = await getTotal(user_id);
    const tags = await getAllTags(user_id);
    const user_image = await sendQuery(`SELECT user_image FROM user WHERE user_name = ?`, [req.params.writer]);

    res.render("profile", {
        "require" : require,
        "total" : total_count,
        "tags" : tags,
        "writer" : req.params.writer,
        "user_image" : user_image[0].user_image,
        user_auth : user_auth
    });
})

router.post("/profile/:writer", async (req, res) => {
    const option = req.body.option;
    const user_id = await checkUserName(req.params.writer);

    if(user_id == -1){
        res.send("<script>alert('사용자가 존재하지 않습니다.'); location.href='/'; </script>");
        return;
    }

    if(option == "summary"){
        const row_posts = await sendQuery(`SELECT * FROM post WHERE user_id = ? ORDER BY post_date DESC LIMIT 0, 4 `, [user_id]);
        const row_comments = await sendQuery(`SELECT *
                                                FROM   (SELECT "comment" AS "type",
                                                                comment_idx,
                                                                post_idx,
                                                                user_id,
                                                                writer,
                                                                comment_date,
                                                                comment_content
                                                        FROM   post_comment
                                                        WHERE  comment_date >= Date_add(Now(), INTERVAL -3 month)
                                                                AND user_id = ?
                                                        UNION
                                                        SELECT "reply" AS "type",
                                                                reply_idx,
                                                                post_idx,
                                                                user_id,
                                                                writer,
                                                                reply_date,
                                                                reply_content
                                                        FROM   comment_reply
                                                        WHERE  reply_date >= Date_add(Now(), INTERVAL -3 month)
                                                                AND user_id = ?) AS result
                                                ORDER  BY comment_date DESC
                                                LIMIT  0, 4`, [user_id, user_id]);
        res.json({
            "posts" : row_posts,
            "comments": row_comments
        })
    }
    else if(option == "all_projects"){
        const row_posts = await sendQuery(`SELECT * FROM post WHERE user_id = ? ORDER BY post_date DESC`, [user_id]);
        res.json({
            "posts" : row_posts
        })
    }
    else if(option == "all_comments"){
        const row_comments = await sendQuery(`SELECT *
                                                FROM   (SELECT "comment" AS "type",
                                                                comment_idx,
                                                                post_idx,
                                                                user_id,
                                                                writer,
                                                                comment_date,
                                                                comment_content
                                                        FROM   post_comment
                                                        WHERE   user_id = ?
                                                        UNION
                                                        SELECT "reply" AS "type",
                                                                reply_idx,
                                                                post_idx,
                                                                user_id,
                                                                writer,
                                                                reply_date,
                                                                reply_content
                                                        FROM   comment_reply
                                                        WHERE   user_id = ? ) AS result
                                                ORDER  BY comment_date DESC`, [user_id, user_id]);
        res.json({
            "comments" : row_comments
        })
    }
    else if(option == "popular_projects"){
        const row_popular_posts = await sendQuery(`SELECT *
                                                    FROM   post
                                                    WHERE  like_count >= 1
                                                            AND user_id = ?
                                                    ORDER  BY like_count `, [user_id]);
        res.json({
            "posts" : row_popular_posts
        })
    }
    return;
})

const checkUserName = async (user_id) => {
    const row = await sendQuery(`SELECT user_id FROM user WHERE user_name = ?`, [user_id]);
    if(row.length == 0)
        return -1;
    return row[0].user_id;
}


const getTotal = async (user_id) => {
    const total_project = await sendQuery(`SELECT count(post_idx) AS result FROM post WHERE user_id = ?`, [user_id]);
    const total_like = await sendQuery(`SELECT Count(like_idx) AS result
                                        FROM   post_like
                                        WHERE  post_idx IN (SELECT post_idx
                                                            FROM   post
                                                            WHERE  user_id = ?)`, [user_id]);
    const total_comments = await sendQuery(`SELECT Count(*) AS result 
                                            FROM   (SELECT user_id
                                                    FROM   post_comment
                                                    WHERE  user_id = ?
                                                    UNION ALL
                                                    SELECT user_id
                                                    FROM   comment_reply
                                                    WHERE  user_id = ?) AS t`, [user_id, user_id]);

    return {
        "like" : total_like[0].result,
        "project" : total_project[0].result,
        "comment" : total_comments[0].result
    };
}

const getAllTags = async (user_id) => {
    const row = await sendQuery(`SELECT tag FROM post WHERE user_id = ?`, [user_id]);
    const result = [];

    for(const r of row){
        const tmp = r.tag.split(",");

        for(let i=0; i<tmp.length; i++){
            if(tmp[i].length == 0) continue;
            if(result.indexOf(tmp[i]) != -1) continue;
            result.push(tmp[i]);
        }
    }
    return result;
}

module.exports = router;