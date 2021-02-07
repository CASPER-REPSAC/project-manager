const express = require("express");
const router = express.Router();
const checkOauth = require("../feature/checkOauth");
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");

router.post("/comment", async(req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await checkOauth.checkAuth(req, res, data))) return;

    const post_idx = req.body.post_idx;
    const writer = req.session.passport.user.displayName;
    const comment_content = req.body.comment_content;
    const user_id = req.session.passport.user.id;

    if(post_idx.length == 0 || comment_content.length == 0){
        res.json({"result" : "error", "message" : "필요한 값이 비어 있습니다."});
        return;
    }

    await sendQuery(`INSERT INTO post_comment (user_id, post_idx, writer, comment_content, comment_date) VALUES (?, ?, ?, ?, now())`,
                                              [user_id, post_idx, writer, comment_content]);
    res.json({"result" : "success", "message" : "댓글이 등록 되었습니다.", "redirect" : `/post/${post_idx}`})
})

router.post("/reply", async(req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await checkOauth.checkAuth(req, res, data))) return;

    const comment_idx = req.body.comment_idx;
    const reply_content = req.body.reply_content;
    const writer = req.session.passport.user.displayName;
    const user_id = req.session.passport.user.id;

    if(comment_idx.length == 0 || reply_content.length == 0){
        res.json({"result" : "error", "message" : "필요한 값이 비어 있습니다."});
        return;
    }

    await sendQuery(`INSERT INTO comment_reply (user_id, comment_idx, writer, reply_content, reply_date) VALUES (?, ?, ?, ?, now())`,
                                              [user_id, comment_idx, writer, reply_content]);
    res.json({"result" : "success", "message" : "답글이 등록 되었습니다."})
})



module.exports = router;