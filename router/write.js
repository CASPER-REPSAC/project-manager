const express = require("express");
const router = express.Router();
const sendQuery = require("../feature/db");
const checkOauth = require("../feature/checkOauth");
const requirement = require("../feature/requirement");

router.get("/write", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await checkOauth.checkAuth(req, res, data))) return;

    res.render("write", {require: data});
})

router.post("/write", async (req, res) => {
    const data = await requirement.getRequireData(req.session);
    if(!(await checkOauth.checkAuth(req, res, data))) return;

    const input = req.body;
    
    if(input.title.length == 0) { res.json({"result" : "error", "message" : "제목을 입력해 주세요."}); return; }
    if(input.date.length == 0) { res.json({"result" : "error", "message" : "날짜를 입력해 주세요"}); return; }
    if(input.section_opinion.length == 0) { res.json({"result" : "error", "message" : "의견을 입력해 주세요"}); return; }
    if(input.tag.length == 0) { res.json({"result" : "error", "message" : "태그를 입력해 주세요"}); return; }

    for(let i=0; i<input.section.length; i++){
        if(input.section[i].section_content.length == 0){ res.json({"result" : "error", "message" : "섹션 설명을 입력해 주세요."}); return; }
        if(input.section[i].range_start.length == 0){ res.json({"result" : "error", "message" : "시작 범위를 입력해 주세요."}); return; }
        if(input.section[i].range_end.length == 0){ res.json({"result" : "error", "message" : "끝 범위를 입력해 주세요."}); return; }

        if(isNaN(input.section[i].range_start) || isNaN(input.section[i].range_end)){ res.json({"result" : "error", "message" : "범위는 숫자만 입력해 주세요."}); return; }
    }

    const user_id = req.session.passport.user.id;
    const writer = req.session.passport.user.displayName;

    const tmp_path_row = await sendQuery(`SELECT tmp_path FROM tmp_post_attach WHERE user_id = ?`, [user_id]);
    await sendQuery(`DELETE FROM tmp_post_attach WHERE user_id = ?`, [user_id]);
    await sendQuery(`INSERT INTO post (user_id, writer, title, subtitle, contents, opinion, post_date, project_date, type, tag) VALUES (?, ?, ?, ?, ?, ?, now(), ?, ?, ?)`,
                                       [user_id, writer, input.title, input.subtitle, input.section, input.section_opinion, input.date, input.type, input.tag]);

    const row = await sendQuery(`SELECT post_idx FROM post WHERE user_id = ? ORDER BY post_idx DESC LIMIT 0,1`, [user_id]);
    await sendQuery(`INSERT INTO post_attach (post_idx, path) VALUES (?, ?)`, [row[0].post_idx, tmp_path_row[0].tmp_path]);


    res.json({"result" : "success", "message" : "글이 작성 되었습니다.", "redirect" : `/post/${row[0].post_idx}`})
})


module.exports = router;