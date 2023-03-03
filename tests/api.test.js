// tests all my endpoints and their responses with mocha and chai

import { app } from '../app.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
const should = chai.should();

chai.use(chaiHttp);


//-----------------BOOKINGS------------------------------
//
describe('App', () => {
    describe('GET /', () => {
        it('should return 200', (done) => {
            const explorerId = '64021b634f62f925ed5c90cc'; // Aquí debes asignar el ID que quieres enviar en el cuerpo de la solicitud
            chai.request(app)
                .get('/bookings/explorer')
                .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
                .send({ explorerId })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
});


// 201, Nuevo Booking - POST /bookings
describe('POST /', () => {
    it('should return 201', (done) => {
              
        chai.request(app)
            .post('/bookings/')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({ comment: "Test Mocha", trip: "64022ad36221c75534ec5580", explorer: "64021b634f62f925ed5c90cc" })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});


// Error 400, ya que el trip ya ha comenzado - POST /bookings
describe('POST /', () => {
    it('should return 201', (done) => {
              
        chai.request(app)
            .post('/bookings/')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({ comment: "Test Mocha error 400", trip: "63e12ac7ba78002425dd817d", explorer: "64021b634f62f925ed5c90cc" })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

