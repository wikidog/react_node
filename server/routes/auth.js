const passport = require('passport');

// // by default, passport tries to use session based authentication
// // we have to disable it - don't create session after successful authentication
// const requireAuth = passport.authenticate('jwt', { session: false });
// const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout(); // this function is provided by Passport
    res.redirect('/');
  });

  app.get('/', (req, res) => {
    res.send({ message: 'secret code 123456' });
  });

  // Google OAuth Step 1
  //
  app.get(
    '/auth/google',
    // tell passport to use 'google' strategy
    passport.authenticate('google', {
      scope: ['profile', 'email'], // these are defined by google
    })
  );

  // Google OAuth Step 2
  //
  // 'google' strategy sees the 'code' sent back from Google
  // Passport uses this code to exchange user information with Google
  //
  // The callback function we add (Google OAuth Step 3 - in passport.js file)
  // in the GoogleStrategy gets called
  //
  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/surveys');
    }
  );
};
