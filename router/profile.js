const express = require("express");
const router = express.Router();

const sendQuery = require("../feature/db");
const check = require("../feature/check");
const requirement = require("../feature/requirement");

router.get("/profile", async (req, res) => {
    if(!check.isLogin(req.session.passport)){
        res.send("<script>alert('로그인을 해주세요.'); location.href='/'; </script>")
        return;
    }

    const require = await requirement.getRequireData(req.session);
    const user_info = await sendQuery(`SELECT * FROM user WHERE user_id = ?`, [req.session.passport.user.id]);
    res.render("profile", {
        "require" : require,
        "user_info" : user_info[0]
    });
})

module.exports = router;