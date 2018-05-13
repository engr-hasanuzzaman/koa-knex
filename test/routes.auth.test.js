process.env.NODE_ENV = 'test';
process.env.PORT = 3005;

const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const knex = require('../src/server/db/connection');
const server = require('../src/server/index');

describe('routes: auth', () =>{
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.lates(); })
    .then(() => {return knex.seed.run(); })
  });

  afterEach(() => {
    return knex.migrate.rollback();
  })
})