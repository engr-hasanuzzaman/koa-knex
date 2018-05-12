process.env.NODE_ENV = 'test';
process.env.POET = 3005;

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
        expect(res.body.status).eql('success');
        expect(res.body.data[0]).include.keys(
          'id', 'name'
        );
        expect(res.body.data.length).eql(3);
        done();
      })
    })
  });

  describe('get /api/v1/movies/:id', () => {
    it('should return valid movie', (done) => {
      chai.request(server)
      .get('/api/v1/movies/1')
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res).be.json;
        done();
      });
    });

    it('should throw error is movie not found', (done) => {
      chai.request(server)
      .get('/api/v1/movies/9999')
      .end((err, res) => {
        expect(res.status).eql(404);
        expect(res.body.status).eql('fail');
        expect(res.body.msg).eql('movie not found');
        expect(res).be.json;
        done();
      });
    });
  });

  // test section for delete /api/v1/movies/:id
  describe('DELETE /api/v1/movies/:id', () => {
    // delete movie if found
    it('should remove movie from movies', (done) => {
      chai.request(server)
      .delete('/api/v1/movies/1')
      .end((err, res) => {
        let movieCountBeforeDelete = 0;
        (async () => {
          movieCountBeforeDelete = await knex('movies').length;
        });
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        // expect(res.body.movie.id).eql(1);
        (async () => {
          let moviesCount = await knex('movies').select('*').length;
          expect(moviesCount).eql(movieCountBeforeDelete -1);
        });
        done();
      })
    })
  });

  // inset new movie
  describe('post /api/v1/movies', () => {
    it('it should create new movie', (done) => {
      let moviesCountBeforeInsert = 0;
      (async () => {
        moviesCountBeforeInsert = await knex('movies').select('*').length;
      });

      chai.request(server)
      .post('/api/v1/movies')
      .send({
        name: 'Harry potter',
        genre: 'Fantasy adventure',
        rating: 9.5,
        explicit: true
      })
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body.movie.name).eql('Harry potter');
        expect(res.body.movie.genre).eql('Fantasy adventure');
        expect(res.body.movie.rating).eql('9.5');
        expect(res.body.movie.explicit).eql(true);
        
        done(); 
      })
    });
  });

  // test put /api/v1/movies/:id
  describe('put /api/v1/movies/:id', () => {
    it('it should change movie', (done) => {
      let movieBeforeUpdate = undefined;
      (async () => {
        movieBeforeUpdate = await knex('movies').select('*').where({ id: 1 });
      });

      chai.request(server)
      .put('/api/v1/movies/1')
      .send({
        name: 'updated name',
        genre: 'update genre',
        rating: 0.0,
        explicit: false
      })
      .end((err, res) => {
        expect(err).not.exist;
        expect(res.status).eql(200);
        expect(res.body.status).eql('success');
        expect(res.body.movie.name).eql('updated name');
        expect(res.body.movie.genre).eql('update genre');
        expect(res.body.movie.rating).eql('0');
        expect(res.body.movie.explicit).eql(false);
        
        done(); 
      })
    });
  })
});