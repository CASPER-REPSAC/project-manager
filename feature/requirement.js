const feature = require("../feature/check");

module.exports.getRequireData = async (session) => {
    const [user_theme, check] = feature.getUserTheme(session.user_theme)
    const is_login = await feature.isLogin(session.passport);
    const feed = await feature.getFeed(session.passport);

    return {
        "web_theme" : user_theme,
        "check" : check,
        "is_login" : is_login,
        "feed" : feed
    };
}