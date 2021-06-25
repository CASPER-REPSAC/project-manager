const express = require("express");
const sendQuery = require("../feature/db");
const router = express.Router();
const requirement = require("../feature/requirement");
const check = require("../feature/check");

router.get("/post/:idx", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    const user_auth = await check.getAuth(req.session.passport);
    const post_idx = req.params.idx;
    const user_info = {"user_image" : "", "is_post_owner" : 0};

    const post_row = await sendQuery(`SELECT * FROM post WHERE post_idx=?`, [post_idx]);

    if(post_row.length == 0){
        res.send("<script>alert('해당 글이 존재 하지 않습니다.'); location.href='/'; </script>");
        return;
    }

    if(data.is_login){
        const user_row = await sendQuery(`SELECT user_image FROM user WHERE user_id = ?`, [req.session.passport.user.id]);
        const is_post_owner = await sendQuery(`SELECT count(post_idx) as cnt FROM post WHERE post_idx = ? AND user_id = ?`, [post_idx, req.session.passport.user.id]);
        user_info.user_image = user_row[0].user_image;
        user_info.is_post_owner = (is_post_owner[0].cnt == 1 ? 1 : 0);
    }
    
    const post_attach = await sendQuery(`SELECT path FROM post_attach WHERE post_idx = ?`, [post_idx]);
    const [comment, user_image, count] = await getCommentAndReply(post_idx);
    const side_posts = await getSidePosts(post_idx);

    res.render("post", {
        require: data, 
        post_data : post_row[0], 
        post_attach : post_attach[0], 
        user_info : user_info,
        comment_data : comment,
        comment_image : user_image,
        user_auth : user_auth,
        count : count,
        side_posts: side_posts
    });
})

const getCommentAndReply = async (post_idx) => {
    let post_comment = await sendQuery(`SELECT * FROM post_comment WHERE post_idx = ?`, [post_idx]);
    const user_image = {};
    let user_list = [];
    let count = post_comment.length;

    // 각 댓글의 답글을 조회
    for(let i = 0; i < post_comment.length; i++){
        let reply_comment = await sendQuery(`SELECT * FROM comment_reply WHERE comment_idx = ?`, [post_comment[i].comment_idx]);
        count = count + reply_comment.length;
        post_comment[i].reply_comment = reply_comment;

        user_list.push(post_comment[i].user_id);

        for(let j=0; j<reply_comment.length; j++)
            user_list.push(reply_comment[j].user_id);
    }

    user_list = Array.from(new Set(user_list));
    for(let i = 0; i < user_list.length; i++){
        let tmp = await sendQuery(`SELECT user_image FROM user WHERE user_id = ?`, [user_list[i]]);
        user_image[user_list[i]] = tmp[0].user_image;
    }

    return [post_comment, user_image, count];
}

const getSidePosts = async (currnet_post_idx) => {
    const previous_post = await sendQuery(`SELECT post_idx, title FROM post WHERE post_idx = ?`, [currnet_post_idx - 1]);
    const next_post = await sendQuery(`SELECT post_idx, title FROM post WHERE post_idx = ?`, [currnet_post_idx + 1]);
    
    return {
        "previous_post" : previous_post,
        "next_post" : next_post 
    }
}

module.exports = router;