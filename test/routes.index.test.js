process.env.NODE_ENV = 'test';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const server =  require('../src/server/index');

describe('routes: index', () => {
  describe('get /', () => {
    it('should return json', (done) => {
      chai.request(server)
      .get('/')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.type).eql('application/json');
        expect(res.body.message).eql('hello world');
        expect(res.body.status).eql('success');
        done();
      })
    })
  });
});
