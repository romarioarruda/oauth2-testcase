require('dotenv').config()
const express = require('express')
const consign = require('consign')

const app = express()

consign()
  .include('./src/config/passport.js')
  .then('./src/middlewares/appMiddleware.js')
  .then('./src/routes/routes.js')
  .into(app)

const port = 3000
app.listen(port, () => console.log(`API listening at port ${port}!`))