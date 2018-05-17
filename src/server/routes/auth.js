const KoaRouter = require('koa-router');
const passport = require('koa-passport');
const fs = require('fs');
const path = require('path');
const queries = require('../db/queries/users');

const knex = require('../db/connection');

const router = new KoaRouter();

const BASE_PATH = '/auth/register';

router.get(BASE_PATH, async (ctx) => {
  ctx.type = 'text/html';
  ctx.body = fs.createReadStream(path.join(__dirname, '../views/register.html'));
});

router.post(BASE_PATH, async (ctx) => {
  const user = await queries.addUser(ctx.request.body);
  console.log('--------- new created user is', user);
  return passport.authenticate('local', (err, user, info, status) => {
    if(user){
      console.log('--------- with in login user is', user);
      ctx.login(user);
      ctx.redirect('/auth/status');
    }else{
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

router.get('/auth/status', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/status.html');
  } else {
    ctx.redirect('/auth/login');
  }
});

router.get('/auth/logout', async (ctx) => {
  if (ctx.isAuthenticated()) {
    ctx.logout();
    ctx.redirect('/auth/login');
  } else {
    ctx.body = { success: false };
    ctx.throw(401);
  }
});

router.get('/auth/login', (ctx) => {
  if(!ctx.isAuthenticated()){
    ctx.type = 'html';
    ctx.body = fs.createReadStream('./src/server/views/login.html');
  }else{
    ctx.redirect('/auth/status');
  }
});

router.post('/auth/login', async (ctx) => {
  return passport.authenticate('local', (err, user, info, status) => {
    if (user) {
      console.log('--- with in login with user', user);
      ctx.login(user);
      ctx.redirect('/auth/status');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx);
});

module.exports = router;