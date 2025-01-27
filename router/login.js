import { Router } from "express";
const router = Router();
import passport from 'passport';
import sendQuery from "../feature/db.js";
import OpenIDConnectStrategy from "passport-openidconnect";
import secret from "../config/secret.json" with { "type": "json" };
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(new OpenIDConnectStrategy({
    issuer: secret.sso.issuer,
    authorizationURL: secret.sso.auth_url,
    tokenURL: secret.sso.token_url,
    clientID: secret.sso.client_id,
    clientSecret: secret.sso.client_secret,
    callbackURL: secret.sso.callback_url,
    scope: ['profile', 'email', 'openid', 'offline_access']
}, (issuer, profile, done) => {
    done(null, profile);
}));
router.get('/login', passport.authenticate('openidconnect'), async (req, res) => {
    console.log("login");
    const user = req.session.passport.user;
    const user_id = user.id;
    const user_name = user.displayName;
    const user_email = user.emails[0].value;
    const rows = await sendQuery(`SELECT user_id, user_email FROM user WHERE user_id = ?`, [user_id]);
    if(rows.length == 0){
        await sendQuery(`INSERT INTO user (user_id, user_email, user_name, auth, registration_date) VALUES
                                       (?, ?, ?, "guest", sysdate())`, [user_id, user_email, user_name]);
    }
    else{
        await sendQuery(`UPDATE user SET user_name = ?, user_email = ? WHERE user_id = ?`, [user_name, user_email, user_id]);
    }
    res.redirect("/");
});
router.get("/logout", (req, res) => {
    req.session.passport = undefined;
    res.redirect("/");
});
export default router;