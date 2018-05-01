const koaRouter = require('koa-router');
const router = new koaRouter();

router.get('/', async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'hello world'
  };
});

module.exports = router;