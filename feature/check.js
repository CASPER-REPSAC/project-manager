const sendQuery = require("./db");

module.exports.isLogin = async (user_id) => {
    if(isNull(user_id)) return false;

    const row = await sendQuery(`SELECT user_id FROM user WHERE user_id = ?`, [user_id.user.id]);

    if(row.length == 0)
        return false;
    return true;
}

module.exports.getAuth = async (user_id) => {
    if(isNull(user_id)) return "guest";

    const row = await sendQuery(`SELECT auth FROM user WHERE user_id = ?`, [user_id.user.id]);

    if(row.length == 0)
        return "guest";
    return row[0].auth;
}

module.exports.checkAuth = async (req, res, data) => {
    if(!data.is_login){
        const html = "<script>alert('로그인이 필요합니다.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }
    if(this.getAuth(req.session.passport) == "guest"){
        const html = "<script>alert('게스트는 글을 작성 할 수 없습니다.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }

    return true;
}

module.exports.isPostOwner = (session) => {
    if(!session)
        return false;
}

module.exports.getUserTheme = (data) => {
    let isCheck = true;

    if(!data || data == "dark"){
        data = "dark";
        isCheck = false;
    }

    return [data, isCheck];
}


function isNull(data){
    return (!data ? true : false);
}