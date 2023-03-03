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
describe('POST Nuevo Booking/', () => {
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
describe('POST Error Trip Empezado /', () => {
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

// PATCH Booking Manager - DUE
describe('PATCH MANAGER /due', () => {
    it('should return 200', (done) => {
        const bookingId = '64022b147ef514c9e3387a23'; // Aquí debes asignar el ID que quieres enviar en el cuerpo de la solicitud
        const managerId = '63e0fddfa46c5f293ee07d22';
        chai.request(app)
            .patch('/bookings/' + bookingId + '/due')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({  })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


// PATCH Booking Explorer - PAY
describe('PATCH EXPLORER /pay', () => {
    it('should return 200', (done) => {
        const bookingId = '64022b147ef514c9e3387a23'; // Aquí debes asignar el ID que quieres enviar en el cuerpo de la solicitud
        const explorerId = '64021b634f62f925ed5c90cc';
        chai.request(app)
            .patch('/bookings/' + bookingId + '/pay')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({ explorerId })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});



