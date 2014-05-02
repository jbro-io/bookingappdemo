'use strict';
//================================================================================
// Libraries
//================================================================================
var express        = require('express');
var passport       = require('passport');
var config         = require('../config');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

//================================================================================
// Properties
//================================================================================
var router = express.Router();
var _accessToken;

//================================================================================
// Passport Strategies
//================================================================================
var googleStrategy = new GoogleStrategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    },
    function(accessToken, refreshToken, profile, done) {
        console.log('Google Profile:', profile);
        _accessToken = accessToken;
        done(null, profile);
    }
);
passport.use(googleStrategy);

//================================================================================
// Module
//================================================================================
/**
 * Redirect the user to Google for authentication.
 */
router.get('/google', passport.authenticate('google'));

/**
 * Google will redirect the user back to this route after authentication.
 * If valid, the user will be logged in. Otherwise, authentication has failed.
 */
router.get('/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, profile) {
        if(err) return next(err);

        //store the access token and calendarId in our session
        req.session.accessToken = _accessToken;
        req.session.calendarId = profile._json.email;

        res.cookie('profile', profile);

        res.redirect('/');
    })(req, res, next);
});

module.exports = router;
