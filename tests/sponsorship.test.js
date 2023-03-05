import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();

chai.use(chaiHttp);

//-----------------SPONSORSHIP------------------------------
//

// 201, Nuevo Sponsorship - POST /sponsorships
describe("POST Nuevo Sponsorship /sponsorships", () => {
    it("should return 201", (done) => {
        chai
        .request(app)
        .post("/sponsorships/")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({
            landingPage: "https://www.google.com/",
            banner: "https://www.google.com/",
            sponsor: "6404a2b7e86c46de831f91f1",
            trip: "64022ad36221c75534ec5580"
        })
        .end((err, res) => {
            res.should.have.status(201);
            done();
        });
    });
    });

describe("PUT Sponsorship /sponsorships/:id", () => {
    it("should return 200", (done) => {
        const sponsorshipId = '6404a303dd33ace3a6cf57be';
        chai
        .request(app)
        .put('/sponsorships/' + sponsorshipId + '/')
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({
            landingPage: "https://www.google.com/putSponsorship",
            banner: "https://www.google.com/putSponsorship3",
            sponsor: "6404a2b7e86c46de831f91f1",
            trip: "64022ad36221c75534ec5580"
        })
        .end((err, res) => {
            res.should.have.status(200);
            done();
        });
    });
    });


// 400, Error Nuevo Sponsorship - POST /sponsorships
describe("POST Error Nuevo Sponsorship - Actor no es Sponsor /sponsorships", () => {
    it("should return 400", (done) => {
        chai
        .request(app)
        .post("/sponsorships/")
        .set("X-API-Version", "v1") // Aquí agregas el encabezado de versión de la API
        .send({
            landingPage: "https://www.google.com/",
            banner: "https://www.google.com/",
            sponsor: "64021b634f62f925ed5c90cc",
            trip: "64022ad36221c75534ec5580"
        })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
    });
