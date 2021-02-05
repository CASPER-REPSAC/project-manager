const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const sendQuery = require("../feature/db");
const checkOauth = require("../feature/checkOauth");

router.get("/write", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await checkAuth(req, res))) return;

    res.render("write", {require: data});
})

router.post("/write", async (req, res) => {
    if(!(await checkAuth(req, res))) return;

    const input = req.body;
    
    if(input.title.length == 0) { res.json({"result" : "error", "message" : "제목을 입력해 주세요."}); return; }
    if(input.date.length == 0) { res.json({"result" : "error", "message" : "날짜를 입력해 주세요"}); return; }
    if(input.section_opinion.length == 0) { res.json({"result" : "error", "message" : "의견를 입력해 주세요"}); return; }

    for(let i=0; i<input.section.length; i++){
        if(input.section[i].section_content.length == 0){ res.json({"result" : "error", "message" : "섹션 설명을 입력해 주세요."}); return; }
        if(input.section[i].range_start.length == 0){ res.json({"result" : "error", "message" : "시작 범위를 입력해 주세요."}); return; }
        if(input.section[i].range_end.length == 0){ res.json({"result" : "error", "message" : "끝 범위를 입력해 주세요."}); return; }
    }

    const user_id = req.session.passport.user.id;
    const writer = req.session.passport.user.displayName;

    await sendQuery(`INSERT INTO post (user_id, writer, title, subtitle, contents, opinion, post_date, project_date) VALUES (?, ?, ?, ?, ?, ?, sysdate(), ?)`,
                                       [user_id, writer, input.title, input.subtitle, input.section, input.section_opinion, input.date]);
    const row = await sendQuery(`SELECT post_idx FROM post WHERE user_id = ? ORDER BY post_idx DESC LIMIT 0,1`, [user_id]);

    res.json({"result" : "success", "message" : "글이 작성 되었습니다.", "redirect" : `/post/${row[0].post_idx}`})
})

async function checkAuth(req, res){
    const data = await requirement.getRequireData(req.session);

    if(!data.is_login){
        const html = "<script>alert('로그인이 필요합니다.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }
    if(checkOauth.getAuth(req.session.passport) == "guest"){
        const html = "<script>alert('게스트는 글을 작성 할 수 없습니다.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }

    return true;
}

module.exports = router;