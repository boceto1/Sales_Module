import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Status service', () => {
    describe('GET /test', () => {
        it('should get status code 200 and status UP SERVICE', (done) => {
             chai.request(app)
                 .get('/test')
                 .end((err, res) => {
                     res.should.have.status(200);
                     (res.body.status).should.equal('UP SERVICE');
                     done();
                  });
         });
    }); 
}); 