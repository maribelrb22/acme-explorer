import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();

chai.use(chaiHttp);

//-----------------ACTORS------------------------------
//

describe("GET ACTORS / ", () => {
    it("should return 200", (done) => {
      const managerId = "63e0fddfa46c5f293ee07d22";
      chai
        .request(app)
        .get("/actors/")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({ })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });


// Va a dar error porque no se puede crear un actor con el mismo email
describe("POST NEW ACTOR / ", () => {
  it("should return 201", (done) => {
    const managerId = "63e0fddfa46c5f293ee07d22";
    chai
      .request(app)
      .post("/actors/")
      .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
      .send({
        name: "BrianTestMocha",
        surname: "TestapellidoChai",
        email: "brianmocha1@hotmail.com",
        password: "MyPassw0rd!",
        role: "EXPLORER",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        done();
      });
  });
});

// PUT ACTOR 
describe("PUT ACTOR /actors/:id ", () => {
    it("should return 200", (done) => {
      const managerId = "63e0fddfa46c5f293ee07d22";
      const actorId = "640244eb26ea019616ad883b"
      chai
        .request(app)
        .put("/actors/"+ actorId + "/")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({
          name: "BrianUpdate2Mocha",
          surname: "TestapellidoChai",
          email: "brianmocha1@hotmail.com",
          password: "MyPassw0rd!",
          role: "EXPLORER",
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });


  // PATCH ACTOR - Ban
describe("PATCH ACTOR /actors/:id/ban ", () => {
    it("should return 200", (done) => {
      const managerId = "63e0fddfa46c5f293ee07d22";
      const actorId = "640244eb26ea019616ad883b"
      chai
        .request(app)
        .patch("/actors/"+ actorId + "/ban")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({ })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
});

// PATCH ACTOR - UnBan
describe("PATCH ACTOR /actors/:id/unban ", () => {
    it("should return 200", (done) => {
      const managerId = "63e0fddfa46c5f293ee07d22";
      const actorId = "640244eb26ea019616ad883b"
      chai
        .request(app)
        .patch("/actors/"+ actorId + "/unban")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({ })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
});