const express = require("express");
const router = express.Router();
const check = require("../feature/check");
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");

router.post("/comment", async(req, res) => {
    if(!check.isLogin(req.session.passport)){
        res.json({"result" : "error", "message" : "로그인을 해주세요."});
        return;
    }
    // const data = await requirement.getRequireData(req.session);
    // if(!(await check.checkAuth(req, res))) return;

    const post_idx = Number(req.body.post_idx) ? Number(req.body.post_idx) : -1;
    const writer = req.session.passport.user.displayName;
    const comment_content = req.body.comment_content;
    const user_id = req.session.passport.user.id;

    if(comment_content.length == 0){
        res.json({"result" : "error", "message" : "댓글을 입력해 주세요."});
        return;
    }

    const post_row = await sendQuery(`SELECT post_idx FROM post WHERE post_idx = ?`, [post_idx]);
    if(post_row.length == 0){
        res.json({"result" : "error", "message" : "존재하지 않는 게시글 입니다."});
        return;
    }

    await sendQuery(`INSERT INTO post_comment (user_id, post_idx, writer, comment_content, comment_date) VALUES (?, ?, ?, ?, now())`,
                                              [user_id, post_idx, writer, comment_content]);
    res.json({"result" : "success", "message" : "댓글이 등록 되었습니다.", "redirect" : `/post/${post_idx}`})
})

router.post("/reply", async(req, res) => {
    if(!check.isLogin(req.session.passport)){
        res.json({"result" : "error", "message" : "로그인을 해주세요."});
        return;
    }
    // const data = await requirement.getRequireData(req.session);
    if(!(await check.checkAuth(req, res))) return;

    const comment_idx = Number(req.body.comment_idx) ? Number(req.body.comment_idx) : -1;
    const reply_content = req.body.reply_content;
    const writer = req.session.passport.user.displayName;
    const user_id = req.session.passport.user.id;
    const post_idx = Number(req.body.post_idx) ? Number(req.body.post_idx) : -1;

    if(reply_content.length == 0){
        res.json({"result" : "error", "message" : "답글을 입력해 주세요."});
        return;
    }

    const post_row = await sendQuery(`SELECT post_idx FROM post WHERE post_idx = ?`, [post_idx]);
    if(post_row.length == 0){
        res.json({"result" : "error", "message" : "존재하지 않는 게시글 입니다."});
        return;
    }

    const comment_row = await sendQuery(`SELECT comment_idx FROM post_comment WHERE comment_idx = ?`, [comment_idx]);
    if(comment_row.length == 0){
        res.json({"result" : "error", "message" : "존재하지 않는 댓글 입니다."});
        return;
    }

    await sendQuery(`INSERT INTO comment_reply (user_id, comment_idx, writer, reply_content, reply_date, post_idx) VALUES (?, ?, ?, ?, now(), ?)`,
                                              [user_id, comment_idx, writer, reply_content, post_idx]);
    res.json({"result" : "success", "message" : "답글이 등록 되었습니다."})
})



module.exports = router;