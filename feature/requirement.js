const checkTheme = require("../feature/checkTheme");
const checkOauth = require("../feature/checkOauth");

module.exports.getRequireData = async (session) => {
    const [user_theme, check] = checkTheme.check(session.user_theme);
    const is_login = await checkOauth.isLogin(session.passport);

    return {
        "web_theme" : user_theme,
        "check" : check,
        "is_login" : is_login
    };
}