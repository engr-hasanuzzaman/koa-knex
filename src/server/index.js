const koa = require('koa');
const app = new koa();
const PORT = 3001;

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello world'
  };
});

const server = app.listen(PORT, () => {
  console.log('app is runnin on port ', PORT);
});

module.exports = server;