const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const check = require("../feature/check");
const executeQuery = require("../feature/db");

router.get("/", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const user_auth = await check.getAuth(req.session.passport);
    const comment_info = await getRecentCommentAndReply();
    const popular_info = await getPopularProjects();

    res.render("index", {
        require : data, 
        user_auth : user_auth,
        comment : comment_info,
        popular : popular_info
    });
})

const getRecentCommentAndReply = async () => {
    // 최근 3개월 이내에 등록된 댓글과 답글을 가져와서, 그 중에 최근에 등록된 10개만 가져옴.
    const tmp_user = {};
    const result = await executeQuery(`SELECT *
                                        FROM   (SELECT "comment" AS "type",
                                                        comment_idx,
                                                        post_idx,
                                                        user_id,
                                                        writer,
                                                        comment_date,
                                                        comment_content
                                                FROM   post_comment
                                                WHERE  comment_date >= Date_add(Now(), INTERVAL -3 month)
                                                UNION
                                                SELECT "reply" AS "type",
                                                        reply_idx,
                                                        post_idx,
                                                        user_id,
                                                        writer,
                                                        reply_date,
                                                        reply_content
                                                FROM   comment_reply
                                                WHERE  reply_date >= Date_add(Now(), INTERVAL -3 month)) AS result
                                        ORDER  BY comment_date DESC
                                        LIMIT  0, 10`);
    
    // 사용자 이미지 가져오기
    for(const [i, data] of result.entries()){
        if(!tmp_user[data.user_id]){
            const row = await executeQuery(`SELECT user_image FROM user WHERE user_id = ?`, [data.user_id]);
            result[i].user_image = row[0].user_image;
            tmp_user[data.user_id] = row[0].user_image;
        }
        else{
            result[i].user_image = tmp_user[data.user_id];
        }

        // 최대 글자수
        if(data.comment_content.length >= 70){
            result[i].comment_content = data.comment_content.substr(0, 70) + "...";
        }
    }
    return result;
}

const getPopularProjects = async () => {
    const result = await executeQuery(`SELECT * FROM post WHERE like_count >= 1 ORDER BY like_count DESC LIMIT 0, 12`);
    return result;
}

module.exports = router;