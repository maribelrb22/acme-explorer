import { app } from "../app.js";
import chai from "chai";
import chaiHttp from "chai-http";
const should = chai.should();
import chance from "chance";
import { tripId2 } from "./1_trip.test.js";
import { sponsorId, explorerId } from "./0_actor.test.js";

chai.use(chaiHttp);

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

const sponsorshipId = mongoObjectId();

//-----------------SPONSORSHIP------------------------------
//

// 201, Nuevo Sponsorship - POST /sponsorships
describe("POST Nuevo Sponsorship /sponsorships", () => {
    it("should return 201", (done) => {
        chai
        .request(app)
        .post("/sponsorships/")
        .set("X-API-Version", "v1")
        .send({
            landingPage: "https://www.google.com/",
            banner: "https://www.google.com/",
            sponsor: sponsorId,
            trip: tripId2
        })
        .end((err, res) => {
            res.should.have.status(201);
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
        .set("X-API-Version", "v1")
        .send({
            landingPage: "https://www.google.com/",
            banner: "https://www.google.com/",
            sponsor: explorerId,
            trip: tripId2
        })
        .end((err, res) => {
            res.should.have.status(400);
            done();
        });
    });
    });