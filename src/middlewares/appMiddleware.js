const express = require('express')
const passport = require('passport');
const cookieSession = require('cookie-session')
const cors = require('cors')

module.exports = app => {
    app.use(cors())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    app.use(cookieSession({
        name: 'oauthtest-session',
        keys: ['key1', 'key2']
    }))

    app.use(passport.initialize());
    app.use(passport.session());
}