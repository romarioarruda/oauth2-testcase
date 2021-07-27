const passport = require('passport');
const isLogged = require('../middlewares/isLoggedMiddleware')

module.exports = app => {
  // Auth Routes
  app.route('/google')
    .get(passport.authenticate('google', { scope: ['profile', 'email'] }))

  app.route('/google/callback')
    .get(passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
      res.redirect('/good')
    })
  
  app.route('/')
    .get((req, res) => res.send('Example Home page!'))

  app.route('/failed')
    .get((req, res) => res.send('You Failed to log in!'))

  app.route('/good')
    .get(isLogged((req, res) => res.send(`Welcome mr. ${req.user.displayName}`)))

  app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
  })
}