const knex = require('../connection');
const T_NAME =  'users';

function addUser(attrs){
  return knex(T_NAME).insert(attrs).returning('*');
}

function allUsers(){
  return knex(T_NAME).select('*');
}

module.exports = {
  addUser,
  allUsers
}