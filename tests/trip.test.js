import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();

chai.use(chaiHttp);

//-----------------TRIPS------------------------------
//

describe("GET TRIP /", () => {
  it("should return 200", (done) => {
    const explorerId = "64021b634f62f925ed5c90cc";
    chai
      .request(app)
      .get("/trips/")
      .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});




describe("POST TRIP /", () => {
    it("should return 201", (done) => {
      const managerId = "63e0fddfa46c5f293ee07d22"; 
      chai
        .request(app)
        .post("/trips/")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({
            title: "Test Mocha - Chai",
            description: "esto es u test",
            startDate: "2024-04-11T00:00:00.000Z",
            endDate: "2025-12-11T00:00:00.000Z",
            cancel: false,
            cancelReason: "",
            requirements: ["MOCHA","CHAI"],
            stages: [{
                title: "Test",
                description: "Test CHAI",
                price: 70
            }],
            manager : "63e0fddfa46c5f293ee07d22",
            published: false
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
});


describe("PUT TRIP /trips/:id", () => {
  it("should return 200", (done) => {
    const managerId = "63e0fddfa46c5f293ee07d22"; 
    const tripId = "640249a1a7fd4c206ee261a6"
    chai
      .request(app)
      .put("/trips/"+ tripId + "/")
      .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
      .send({
          title: "Test Mocha - Chai - Put",
          description: "esto es u test",
          startDate: "2024-04-11T00:00:00.000Z",
          endDate: "2025-12-11T00:00:00.000Z",
          cancel: false,
          cancelReason: "",
          requirements: ["MOCHA","CHAI"],
          stages: [{
              title: "Test Put",
              description: "Test CHAI",
              price: 70
          }],
          manager : "63e0fddfa46c5f293ee07d22",
          published: false
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// PATCH Trip Manager - publish
describe('PATCH Trip MANAGER /publish', () => {
    it('should return 200', (done) => {
        const tripId = '640237e2be6f5489f060da1f'; // Aquí debes asignar el ID que quieres enviar en el cuerpo de la solicitud
        const managerId = '63e0fddfa46c5f293ee07d22';
        chai.request(app)
            .patch('/trips/' + tripId + '/publish')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({  })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});


// PATCH Trip Manager - cancel
describe('PATCH Trip MANAGER /cancel', () => {
    it('should return 200', (done) => {
        const tripId = '640237e2be6f5489f060da1f'; 
        const managerId = '63e0fddfa46c5f293ee07d22';
        chai.request(app)
            .patch('/trips/' + tripId + '/cancel')
            .set('X-API-Version', 'v1') // Aquí agregas el encabezado de versión de la API
            .send({ cancelReason: 'Comprobando el test reason' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});