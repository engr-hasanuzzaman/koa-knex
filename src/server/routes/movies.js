const Router = require('koa-router');
const queries = require('../db/queries/movies');

const router = new Router();
const BASE_URL = `/api/v1/movies`;

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
});

router.get(`${BASE_URL}/:id`, async (ctx) => {
  try {
    let movie = await queries.getMovieById(ctx.params.id);
    if(movie.length){
      ctx.body = {
        status: 'success',
        movie: movie
      }
    }else{
      ctx.status = 404;
      ctx.body = {
        status: 'fail',
        msg: 'movie not found'
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete(`${BASE_URL}/:id`, async (ctx) => {
  try {
    let movie = await queries.getMovieById(ctx.params.id);
    if(movie.length){
      ctx.body = {
        status: 'success',
        movie: movie
      }
    }else{
      ctx.status = 404;
      ctx.body = {
        status: 'fail',
        movie: 'movie not found'
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.post(BASE_URL, async (ctx) => {
  try {
    let movieAttrs = ctx.request.body;
    let movies = await queries.insertMovie(movieAttrs);
    if(movies.length){
      ctx.body = {
        status: 'success',
        movie: movies[0]
      }
    }else{
      ctx.status = 404;
      ctx.body = {
        status: 'fail',
        movie: 'Invalid movie data'
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.put(`${BASE_URL}/:id`, async (ctx) => {
  try {
    let movieAttrs = ctx.request.body;
    let movies = await queries.updateMovie(ctx.params.id, movieAttrs);
    if(movies.length){
      ctx.body = {
        status: 'success',
        movie: movies[0]
      }
    }else{
      ctx.status = 404;
      ctx.body = {
        status: 'fail',
        movie: 'Invalid movie data'
      }
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;


