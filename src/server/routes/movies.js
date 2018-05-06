const Router = require('koa-router');
const queries = require('../db/queries/movies');

const router = new Router();
const BASE_URL = `api/v1/movies`;

router.get(BASE_URL, async (ctx) => {
  try {
    let movies = await queries.getAllMovies();
    ctx.body = {
      status: 'success',
      data: movies
    };
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;


