const express = require("express");
const router = express.Router();
const requirement = require("../feature/requirement");
const check = require("../feature/check");
const sendQuery = require("../feature/db");

router.get("/modify/:idx", async (req, res) => {
    if(!check.isLogin(req.session.passport)){
        res.status(401).send("<script>alert('로그인을 해주세요.'); location.href='/';</script>");
        return;
    }

    if(!Number(req.params.idx)){
        res.status(403).send("<script>alert('잘못된 접근 입니다.'); location.href='/'; </script>");
        return;
    }

    const post_idx = Number(req.params.idx);
    if(!(await check.isPostOwner(req.session.passport, post_idx))){
        res.status(403).send("<script>alert('해당 게시글의 작성자가 아니거나 글이 존재하지 않습니다.'); location.href='/'; </script>");
        return;
    }

    req.session.post_idx = post_idx;

    const data = await requirement.getRequireData(req.session);
    const user_auth = await check.getAuth(req.session.passport);
    const post_data = await sendQuery(`SELECT * FROM post WHERE post_idx = ? AND user_id = ?`, [post_idx, req.session.passport.user.id]);
    const post_attach = await sendQuery(`SELECT path FROM post_attach WHERE post_idx = ?`, [post_idx]);
    post_data[0].contents = JSON.stringify(post_data[0].contents);

    res.render("modify", {
        require : data,
        user_auth : user_auth,
        post_data : post_data[0],
        post_attach : post_attach[0].path
    })
})

router.post("/modify", async(req, res) => {
    if(!check.isLogin(req.session.passport)){
        res.status(401).json({"result" : "error", "message" : "로그인을 해주세요."});
        return;
    }

    if(req.session.post_idx != req.body.post_idx){
        res.status(403).json({"result" : "error", "message" : "잘못된 요청 입니다."});
        return;
    }

    if(!(await check.isPostOwner(req.session.passport, req.body.post_idx))){
        res.status(403).json({"result" : "error", "message" : "해당 게시글의 작성자가 아니거나 글이 존재하지 않습니다."});
        return;
    }

    const input = req.body;
    
    if(input.title.length == 0) { res.json({"result" : "error", "message" : "제목을 입력해 주세요."}); return; }
    if(input.date.length == 0) { res.json({"result" : "error", "message" : "날짜를 입력해 주세요"}); return; }
    if(input.section_opinion.length == 0) { res.json({"result" : "error", "message" : "의견을 입력해 주세요"}); return; }
    if(input.tag.length == 0) { res.json({"result" : "error", "message" : "태그를 입력해 주세요"}); return; }

    for(let i=0; i<input.section.length; i++){
        if(input.section[i].section_content.length == 0){ res.json({"result" : "error", "message" : "섹션 설명을 입력해 주세요."}); return; }
        if(input.section[i].range_start.length == 0){ res.json({"result" : "error", "message" : "시작 범위를 입력해 주세요."}); return; }
        if(input.section[i].range_end.length == 0){ res.json({"result" : "error", "message" : "끝 범위를 입력해 주세요."}); return; }
        if(!parseInt(input.section[i].range_start) || !parseInt(input.section[i].range_end)){ res.json({"result" : "error", "message" : "범위는 숫자만 입력해 주세요."}); return; }
        if(parseInt(input.section[i].range_start) <=0 || parseInt(input.section[i].range_end) <= 0) {res.json({"result" : "error", "message" : "지정한 범위는 0 보다 커야 합니다."}); return;}
        if(parseInt(input.section[i].range_start) > parseInt(input.section[i].range_end)){res.json({"result" : "error", "message" : "시작 범위가 끝 범위보다 클 수 없습니다."}); return; }
        if(i != 0 && parseInt(input.section[i].range_start) <= parseInt(input.section[i-1].range_end)){res.json({"result" : "error", "message" : "다음 섹션의 '시작 범위'가 이전 색션의 '끝 범위'보다 커야 합니다."}); return; }
    }

    await sendQuery(`UPDATE post SET title = ?, subtitle = ?, contents = ?, opinion = ?, project_date = ?, type = ?, tag = ?, thumbnail = ? WHERE post_idx = ?`,
                                        [input.title, input.subtitle, input.section, input.section_opinion, input.date, input.type, input.tag, input.thumbnail, input.post_idx]);
    req.session.post_idx = null;
    res.status(200).json({"result" : "success", "message" : "글이 수정 되었습니다.", "redirect" : `/post/${input.post_idx}`});
})

module.exports = router;