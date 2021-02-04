const express = require("express");
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require( 'passport-google-oauth20' ).Strategy;

const config = require("../config/secret.json");

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});
passport.use(new GoogleStrategy({
        clientID: config.google_api_clientID,
        clientSecret: config.google_api_client,
        callbackURL: 'http://localhost:8080/auth/google/callback'
    }, function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            user = profile;
            // console.log(profile.id);
            // console.log(profile.photos[0].value)
            // console.log(profile._json.name);

            return done(null, user);
        });
    }
));

router.get('/login', passport.authenticate('google', { scope: ['profile']}));
router.get('/auth/google/callback', passport.authenticate( 'google', { failureRedirect: '/login' }), (req, res) => {
    // console.log(req.session.passport);
    res.redirect('/');
});

module.exports = router;