process.env.NODE_ENV = 'test';
process.env.PORT = 3005;

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const knex = require('../src/server/db/connection');
const server = require('../src/server/index');

describe('routes: auth', () =>{
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => {return knex.seed.run(); })
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /auth/register', () => {
    it('should return register view', (done) => {
      chai.request(server)
      .get('/auth/register')
      .end((err, res) =>{
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.type).eql('text/html');
        // expect(res.status).eql(200);

        done();
      });
    })
  });
})