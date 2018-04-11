const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

// 'user' is the user object we get from our DB (in Google OAuth Step 3)
// serialize user and put it in the cookie
passport.serializeUser((user, done) => {
  // 'id' is user record id in MongoDB; not the googleId
  // We might have multiple auth methods, e.g. facebookId, linkedin Id,
  // so we use the database record id to uniquely identify the user
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => done(null, user))
    .catch(e => console.log(e));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    //
    // Google OAuth Step 3
    //
    async (accessToken, refreshToken, profile, done) => {
      // console.log('access token:', accessToken);
      // console.log('profile:', profile);
      const googleId = profile.id;

      try {
        const user = await User.findOne({ googleId });
        if (user) {
          return done(null, user); // tell passport we are done with no error
        }

        const newUser = await new User({ googleId }).save();
        done(null, newUser);
      } catch (error) {
        console.log('catch error', error);
        done(error);
      }
    }
  )
);
