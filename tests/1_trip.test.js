import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();
import chance from "chance";
import { managerId } from "./0_actor.test.js";

chai.use(chaiHttp);

//-----------------TRIPS------------------------------
//

var mongoObjectId = function () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};

const tripId = mongoObjectId();
const tripId2 = mongoObjectId();
const tripId3 = mongoObjectId();

describe("GET TRIP /", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .get("/trips/")
      .set("X-API-Version", "v1")
      .send({})
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe("POST TRIP /", () => {
    it("should return 201", (done) => {
      chai
        .request(app)
        .post("/trips/")
        .set("X-API-Version", "v1")
        .send({
            _id : tripId,
            title: "Test Mocha - Chai",
            description: "esto es u test",
            startDate: "2024-04-11T00:00:00.000Z",
            endDate: "2025-12-11T00:00:00.000Z",
            requirements: ["MOCHA","CHAI"],
            stages: [{
                title: "Test",
                description: "Test CHAI",
                price: 70
            }],
            manager : managerId,
        })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });
});

describe("POST TRIP /", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/trips/")
      .set("X-API-Version", "v1")
      .send({
          _id : tripId2,
          title: "Test Mocha - Chai",
          description: "esto es u test",
          startDate: "2024-04-11T00:00:00.000Z",
          endDate: "2025-12-11T00:00:00.000Z",
          requirements: ["MOCHA","CHAI"],
          stages: [{
              title: "Test",
              description: "Test CHAI",
              price: 70
          }],
          manager : managerId,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe("POST TRIP /", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/trips/")
      .set("X-API-Version", "v1")
      .send({
          _id : tripId3,
          title: "Test Mocha - Chai",
          description: "esto es u test",
          startDate: "2024-04-11T00:00:00.000Z",
          endDate: "2025-12-11T00:00:00.000Z",
          requirements: ["MOCHA","CHAI"],
          stages: [{
              title: "Test",
              description: "Test CHAI",
              price: 70
          }],
          manager : managerId,
      })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});

describe("PUT TRIP /trips/:id", () => {
  it("should return 200", (done) => {
    chai
      .request(app)
      .put("/trips/"+ tripId + "/")
      .set("X-API-Version", "v1")
      .send({
          title: "Test Mocha - Chai - Put",
          description: "esto es u test",
          startDate: "2024-04-11T00:00:00.000Z",
          endDate: "2025-12-11T00:00:00.000Z",
          requirements: ["MOCHA","CHAI"],
          stages: [{
              title: "Test Put",
              description: "Test CHAI",
              price: 70
          }],
      })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

describe('PATCH Trip MANAGER /publish', () => {
    it('should return 200', (done) => {
        chai.request(app)
            .patch('/trips/' + tripId + '/publish')
            .set('X-API-Version', 'v1')
            .send({  })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('PATCH Trip MANAGER /cancel', () => {
    it('should return 200', (done) => {
        chai.request(app)
            .patch('/trips/' + tripId + '/cancel')
            .set('X-API-Version', 'v1')
            .send({ cancelReason: 'Comprobando el test reason' })
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
});

describe('PATCH Trip MANAGER /publish', () => {
  it('should return 200', (done) => {
      chai.request(app)
          .patch('/trips/' + tripId2 + '/publish')
          .set('X-API-Version', 'v1')
          .send({  })
          .end((err, res) => {
              res.should.have.status(200);
              done();
          });
  });
});

export { tripId, tripId2, tripId3 };