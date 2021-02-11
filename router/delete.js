const express = require("express");
const router = express.Router();

const check = require("../feature/check");
const sendQuery = require("../feature/db");

router.delete("/post/:idx", async (req, res) => {
    const post_idx = req.params.idx;
    
    if(!check.isLogin(req.session.passport)){
        res.json({"result" : "error" , "message" : "로그인을 해주세요.", "redirect" : "/"});
        return;
    }

    if(!(await check.isPostOwner(req.session.passport, post_idx))){
        res.json({"result" : "error" , "message" : "권한이 없습니다.", "redirect" : "/"});
        return;
    }

    await sendQuery(`DELETE FROM post WHERE post_idx = ?`, [post_idx]);
    await sendQuery(`DELETE FROM post_comment WHERE post_idx = ?`, [post_idx]);
    await sendQuery(`DELETE FROM post_attach WHERE post_idx = ?`, [post_idx]);

    res.json({"result" : "success", "message" : "글이 삭제 되었습니다.", "redirect" : "/"});
})

module.exports = router;