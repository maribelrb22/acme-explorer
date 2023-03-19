import { app } from '../app.js'
import chai from 'chai'
import chaiHttp from 'chai-http'
const should = chai.should();
import { explorerId } from './0_actor.test.js';
import { tripId, tripId2, tripId3 } from './1_trip.test.js';
import chance from 'chance';
chai.use(chaiHttp);

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

const bookingId = mongoObjectId();

//-----------------BOOKINGS------------------------------
//

describe('GET Bookings /', () => {
    it('should return 200', (done) => {
        chai.request(app)
            .get('/bookings/' + explorerId)
            .set('X-API-Version', 'v1')
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

// 201, Nuevo Booking - POST /bookings
describe('POST Nuevo Booking/', () => {
    it('should return 201', (done) => {
        chai.request(app)
            .post('/bookings/')
            .set('X-API-Version', 'v1')
            .send({ _id: bookingId, comment: "Test Mocha", trip: tripId2, explorer: explorerId })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
});

// Codigo de error, Error por trip no publicado - POST /bookings
describe('POST Error Booking - Trip cancelado /bookings', () => {
    it('should return 400', (done) => {

        chai.request(app)
            .post('/bookings/')
            .set('X-API-Version', 'v1')
            .send({ comment: "Test Mocha - trip no publicado", trip: tripId3, explorer: explorerId })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// Codigo de error, Error por trip cancelado - POST /bookings
describe('POST Error Booking - Trip Cancelado /bookings', () => {
    it('should return 400', (done) => {

        chai.request(app)
            .post('/bookings/')
            .set('X-API-Version', 'v1')
            .send({ comment: "Test Mocha - trip Cancelado", trip: tripId, explorer: explorerId })
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
    });
});

// PATCH Booking Manager - DUE
describe('PATCH MANAGER /due', () => {
    it('should return 200', (done) => {
        chai.request(app)
            .patch('/bookings/' + bookingId + '/due')
            .set('X-API-Version', 'v1')
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

// PATCH Booking Explorer - PAY
describe('PATCH EXPLORER /pay', () => {
    it('should return 200', (done) => {
        chai.request(app)
            .patch('/bookings/' + bookingId + '/pay')
            .set('X-API-Version', 'v1')
            .send({ explorerId })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});



