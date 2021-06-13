const express = require("express");
const router = express.Router();
const sendQuery = require("../feature/db");
const check = require("../feature/check");
const requirement = require("../feature/requirement");

router.get("/profile/:writer", async (req, res) => {
    const user_id = await sendQuery(`SELECT user_id FROM user WHERE user_name = ?`, [req.params.writer]);

    if(user_id.length == 0){
        res.send("<script>alert('사용자가 존재하지 않습니다.'); location.href='/'; </script>");
        return;
    }
    
    const require = await requirement.getRequireData(req.session);
    const total_count = await getTotal(user_id[0].user_id);
    const tags = await getAllTags(user_id[0].user_id);

    res.render("profile", {
        "require" : require,
        "total" : total_count,
        "tags" : tags
    });
})
// TODO 각 메뉴마다 데이터 가져오기

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