const koa = require('koa');
const app = new koa();
const router = require('./routes/index');
const PORT = 3001;

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log('app is runnin on port ', PORT);
});

module.exports = server;