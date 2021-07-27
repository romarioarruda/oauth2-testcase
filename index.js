require('dotenv').config()
const express = require('express')
const cookieSession = require('cookie-session')
const cors = require('cors')

const app = express()
const passport = require('passport');

require('./src/config/passport');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cookieSession({
    name: 'oauthtest-session',
    keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    return req.user ? next() : res.sendStatus(401)
}

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }), (req, res) => {
    res.redirect('/good');
  }
);

app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.listen(3000, () => console.log(`API listening at port ${3000}!`))