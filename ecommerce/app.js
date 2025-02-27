// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require('./config/session.config')(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'ecommerce'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

// auth routes
const authRoutes = require('./routes/auth.routes')
app.use('/auth', authRoutes)

//admin routes
const adminRoutes = require('./routes/admin.routes')
app.use('/admin', adminRoutes)

//product routes
const productsRoutes = require('./routes/products.routes')
app.use('/products', productsRoutes)
//checkout routes
const checkoutRoutes = require('./routes/checkout.routes')
app.use('/checkout', checkoutRoutes)

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
