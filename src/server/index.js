const koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const passport = require('koa-passport');
const session = require('koa-session');

const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');
const authRoutes = require('./routes/auth');

const app = new koa();
const PORT = process.env.PORT || 3001;

// session
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser & logger
app.use(bodyParser());
app.use(logger());

// authenticat
require('./auth');
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());
app.use(authRoutes.routes());

const server = app.listen(PORT, () => {
  console.log('app is runnin on port ', PORT);
});

module.exports = server;