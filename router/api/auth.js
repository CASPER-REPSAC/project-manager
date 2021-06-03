const express = require("express");
const router = express.Router();

const check = require("../../feature/check");
const config = require("../../config/secret.json");
const sendQuery = require("../../feature/db");

router.post("/api/auth", async (req,res) => {
    if(!check.isLogin(req.session.passport)){
        res.json({"result" : "error" , "message" : "로그인을 해주세요."});
        return;
    }
    if((await check.getAuth(req.session.passport)) != "guest"){
        res.json({"result" : "error" , "message" : "이미 권한이 상승 되었습니다."});
        return;
    }

    const token = req.body.token;
    const user_id = req.session.passport.user.id;
    const change_auth = "casper";

    if(token != config.casper_token){
        res.json({"result" : "error" , "message" : "토큰 값이 다릅니다."});
        return;
    }

    await sendQuery(`UPDATE user SET auth = ? WHERE user_id = ?`, [change_auth, user_id]);
    res.json({"result" : "success" , "message" : "성공적으로 권한이 상승 되었습니다.", "redirect" : "/"});
})

module.exports = router;