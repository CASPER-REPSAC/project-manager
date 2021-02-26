const express = require("express");
const router = express.Router();

const sendQuery = require("../../feature/db");
const check = require("../../feature/check");

router.get("/feed", async (req, res) => {
    const option = Number(req.query.feed) ? Number(req.query.feed) : 0;

    if(!check.isLogin(req.session.passport)){
        res.json({"result" : "error", "message" : "로그인을 해주세요."});
        return;
    }

    const user_id = req.session.passport.user.id;
    await sendQuery(`UPDATE user SET feed = ? WHERE user_id = ?`, [option, user_id]);

    res.json({"result" : "success"});
})

module.exports = router;