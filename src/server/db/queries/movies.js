const knex = require('../connection');
const tName = 'movies';

function getAllMovies(){
  return knex(tName)
    .select('*');
}

function getMovieById(id){
  return knex(tName)
    .select('*')
    .where({ id: parseInt(id) });
}

function deleteMovieById(id){
  return getMovieById(id).del().returning('*');
}

function insertMovie(movie){
  return knex('movies').insert(movie).returning('*');
}

module.exports = {
  getAllMovies,
  getMovieById,
  insertMovie
};