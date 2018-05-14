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
        expect(res.text).contain('<h1>Register</h1>');
        expect(res.text).contain('<p><button type="submit">Register</button></p>');
        
        done();
      });
    })
  }); // end of GET /auth/register

  describe('POST /auth/register', () => {
    it('shouuld successfully create user', (done) => {
      chai.request(server)
      .post('/auth/register')
      .send({ username: 'testuser1', password: 'password' })
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.redirects[0]).contain('/auth/status');

        done();
      });
    });
  }); // end of post /auth/register 
})