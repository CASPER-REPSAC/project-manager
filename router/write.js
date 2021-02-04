const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");

router.get("/write", async (req, res) => {
    // if(!(await checkOauth.isLogin(req.session.passport))){
    //     const html = "<script>alert('로그인이 필요합니다.'); location.href='/'; </script>";
    //     res.send(html);
    //     return;
    // }
    const data = await requirement.getRequireData(req.session);

    res.render("write", {require: data});
})

module.exports = router;