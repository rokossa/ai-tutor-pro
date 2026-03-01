const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'mock_google_id',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_google_secret',
    callbackURL: "/api/auth/google/callback",
    proxy: true
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      // 1. Check if user already exists in MongoDB
      let user = await User.findOne({ googleId: profile.id });
      
      // 2. If not, create and save them permanently
      if (!user) {
        // Also check if they exist by email first to prevent duplicates
        let existingEmail = await User.findOne({ email: profile.emails?.[0]?.value });
        if (existingEmail) {
           existingEmail.googleId = profile.id;
           await existingEmail.save();
           return cb(null, existingEmail);
        }

        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          role: 'parent'
        });
      }
      
      // 3. Return the real database user!
      return cb(null, user);
    } catch (err) {
      console.error("Passport DB Error:", err);
      return cb(err, null);
    }
  }
));

module.exports = passport;
