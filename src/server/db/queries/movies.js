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

module.exports = {
  getAllMovies,
  getMovieById
};