const KoaRouter = require('koa-router');
const fs = require('fs');
const path = require('path');
const router = new KoaRouter();

router.get('/auth/register', async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, '../views/register.html'));
});

module.exports = router;