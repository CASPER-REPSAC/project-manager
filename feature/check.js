const sendQuery = require("./db");

module.exports.isLogin = (passport) => {
    if(!passport)
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

module.exports.checkAuth = async (req, res) => {
    if(!this.isLogin(req.session.passport)){
        const html = "<script type='text/javascript'>alert('로그인이 필요합니다.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }
    if(await this.getAuth(req.session.passport) == "guest"){
        const html = "<script type='text/javascript'>alert('게스트는 작성 할 수 없습니다. 토큰을 통해 인증을 해주세요.'); location.href='/'; </script>";
        res.send(html);
        return false;
    }

    return true;
}

module.exports.getUserTheme = (data) => {
    let isCheck = true;

    if(!data || data == "dark"){
        data = "dark";
        isCheck = false;
    }

    return [data, isCheck];
}

module.exports.isPostOwner = async (passport, post_idx) => {
    const row = await sendQuery(`SELECT post_idx FROM post WHERE post_idx = ? and user_id = ?`, [post_idx, passport.user.id]);

    if(row.length == 0)
        return false;
    return true;
}

module.exports.getFeed = async (passport) => {
    if(!this.isLogin(passport))
        return 0;
        
    const feed = await sendQuery(`SELECT feed FROM user WHERE user_id = ?`, [passport.user.id]);
    return feed[0].feed;   
}

function isNull(data){
    return (!data ? true : false);
}