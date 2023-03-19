import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();
import chance from "chance";

chai.use(chaiHttp);
const chanceGenerator = new chance()

//-----------------ACTORS------------------------------
//

var mongoObjectId = function () {
  var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
  return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
  }).toLowerCase();
};

const sponsorId = mongoObjectId();
const explorerId = mongoObjectId();
const managerId = mongoObjectId();

describe("GET ACTORS / ", () => {
    it("should return 200", (done) => {
      chai
        .request(app)
        .get("/actors/")
        .set("X-API-Version", "v1")
        .send({ })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
  });


describe("POST NEW ACTOR (sponsor) / ", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/actors/")
      .set("X-API-Version", "v1")
      .send({
        _id: sponsorId,
        name: "SponsorMocha",
        surname: "TestapellidoChai",
        email: chanceGenerator.email(),
        password: "MyPassw0rd!",
        role: "SPONSOR",
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        done();
      });
  });
});

describe("POST NEW ACTOR (manager) / ", () => {
    it("should return 201", (done) => {
      chai
        .request(app)
        .post("/actors/")
        .set("X-API-Version", "v1")
        .send({
          _id: managerId,
          name: "ManagerMocha",
          surname: "TestapellidoChai",
          email: chanceGenerator.email(),
          password: "MyPassw0rd!",
          role: "MANAGER",
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          done();
        });
    });
  });
  
describe("POST NEW ACTOR (explorer) / ", () => {
  it("should return 201", (done) => {
    chai
      .request(app)
      .post("/actors/")
      .set("X-API-Version", "v1")
      .send({
        _id: explorerId,
        name: "ExplorerMocha",
        surname: "TestapellidoChai",
        email: chanceGenerator.email(),
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
      chai
        .request(app)
        .put("/actors/"+ sponsorId + "/")
        .set("X-API-Version", "v1")
        .send({
          name: "BrianUpdate2Mocha",
          surname: "TestapellidoChai",
          email: chanceGenerator.email(),
          password: "MyPassw0rd!"        
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
      chai
        .request(app)
        .patch("/actors/"+ sponsorId + "/ban")
        .set("X-API-Version", "v1")
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
      chai
        .request(app)
        .patch("/actors/"+ sponsorId + "/unban")
        .set("X-API-Version", "v1")
        .send({ })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          done();
        });
    });
});

export { sponsorId, explorerId, managerId };