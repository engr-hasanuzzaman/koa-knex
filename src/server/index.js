const koa = require('koa');
const logger = require('koa-logger');
const app = new koa();
const indexRoutes = require('./routes/index');
const movieRoutes = require('./routes/movies');
const PORT = process.env.PORT || 3001;

app.use(logger());
app.use(indexRoutes.routes());
app.use(movieRoutes.routes());

const server = app.listen(PORT, () => {
  console.log('app is runnin on port ', PORT);
});

module.exports = server;