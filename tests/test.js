let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

// Suite de teste relacionada a Events
describe('Events', () => {
  // No describe podemos passar um texto para identificação
  describe('/GET Events', () => {
    it('Testing GET All Events', (done) => {
      chai
        .request('http://localhost:8000')
        .get('/api/v1/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
