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

function isNull(data){
    return (!data ? true : false);
}