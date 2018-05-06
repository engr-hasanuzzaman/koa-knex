const knex = require('../connection');
const table = 'movies';

function getAllMovies(){
  return knex(table)
    .select('*');
}

module.exports = {
  getAllMovies
};