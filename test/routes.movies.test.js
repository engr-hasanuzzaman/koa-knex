process.env.NODE_ENV = 'test'

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes: movies', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); })
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('get /api/v1/movies', () => {
    it('should return all movies', (done) => {
      chai.request(server)
      .get('/api/v1/movies')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.type).eql('application/json');
        expect(res.body.status).equla('success');
        expect(res.body.data[0]).include.keys(
          'id', 'name'
        );
        expect(res.body.data).eql(3);
        done();
      })
    })
  })
});