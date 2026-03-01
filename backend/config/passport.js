const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'mock_google_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_secret',
    callbackURL: "/api/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {
    // In a production app, you would find or create the user in your PostgreSQL database here.
    const user = { 
      id: profile.id, 
      name: profile.displayName, 
      email: profile.emails?.[0]?.value, 
      role: 'parent',
      provider: 'google'
    };
    return cb(null, user);
  }
));

// Facebook OAuth Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID || 'mock_fb_id',
    clientSecret: process.env.FACEBOOK_APP_SECRET || 'mock_fb_secret',
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails'],
    proxy: true
  },
  function(accessToken, refreshToken, profile, cb) {
    // Database logic goes here
    const user = { 
      id: profile.id, 
      name: profile.displayName, 
      email: profile.emails?.[0]?.value, 
      role: 'parent',
      provider: 'facebook'
    };
    return cb(null, user);
  }
));

module.exports = passport;
