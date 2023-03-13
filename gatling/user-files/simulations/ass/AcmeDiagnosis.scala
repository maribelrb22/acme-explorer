package ass

import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._

class AcmeDiagnosis extends Simulation {

	val httpProtocol = http
		.baseUrl("http://localhost:8080/")
		

	val headers = Map(
        "Content-Type" -> "application/json",
        "X-API-Version" -> "v1")

    
	object CreateActor {
		val createActor = exec(http("POST ACTOR")
			.post("/actors")
			.body(RawFileBody("./post-actor-acme.json"))
			.headers(headers))
		.pause(1)
	}

	object CreateManager {
		val createManager = exec(http("POST ACTOR MANAGER" )
			.post("/actors")
			.body(RawFileBody("./post-actor-manager-acme.json"))
			.headers(headers))
		.pause(1)
	}
	
	object ModifyActor {
		val modifyActor = exec(http("PUT ACTOR")
			.put("/actors/640244eb26ea019616ad883b/")
			.body(RawFileBody("./put-actor-acme.json"))
			.headers(headers))
		.pause(2)
	}

	object ShowActors {
		val showActors = exec(http("GET ALL ACTORS")
			.get("/actors/")
			.headers(headers))
		.pause(1)
	}

	object CreateActor2 {
		val createActor2 = exec(http("POST ACTOR 2")
			.post("/actors/")
			.body(RawFileBody("./post-actor2-acme.json"))
			.headers(headers))
		.pause(2)
	}

	object BanActor{
		val banActor = exec(http("BAN ACTOR")
			.patch("/actors/640244eb26ea019616ad883b/ban")
			.headers(headers))
		.pause(2)
	}

	object UnBanActor{
		val unbanActor = exec(http("UNBAN ACTOR")
			.patch("/actors/640244eb26ea019616ad883b/unban")
			.headers(headers))
		.pause(2)
	}

	object ShowBookings {
		val showBookings = exec(http("GET ALL BOOKINGS EXPLORER")
			.get("/bookings/explorer")
			.body(RawFileBody("./get-explorer-bookings.json"))
			.headers(headers))
		.pause(1)
	}


	object CreateBooking {
		val createBooking = exec(http("POST BOOKING")
			.post("/bookings/")
			.body(RawFileBody("./post-booking-acme.json"))
			.headers(headers))
		.pause(2)
	}

	object CreateBooking2 {
		val createBooking2 = exec(http("POST BOOKING 2")
			.post("/bookings/")
			.body(RawFileBody("./post-booking2-acme.json"))
			.headers(headers))
		.pause(2)
	}


	object CreateSponsorship {
		val createSponsorship = exec(http("POST SPONSORSHIP")
			.post("/sponsorships/")
			.body(RawFileBody("./post-sponsorship-acme.json"))
			.headers(headers))
		.pause(2)
	}

	object CreateSponsorship2 {
		val createSponsorship2 = exec(http("POST SPONSORSHIP 2")
			.post("/sponsorships/")
			.body(RawFileBody("./post-sponsorship-acme.json"))
			.headers(headers))
		.pause(2)
	}




	

	val actorScn = scenario("Actors").exec(CreateActor.createActor,
									  ModifyActor.modifyActor,
									  ShowActors.showActors,
                                      CreateActor2.createActor2,
									  ShowBookings.showBookings,
									  CreateBooking.createBooking,
									  CreateBooking2.createBooking2,
									  CreateSponsorship.createSponsorship,
									  CreateSponsorship2.createSponsorship2)

	val adminsScn = scenario("Admins").exec(BanActor.banActor,
									  UnBanActor.unbanActor,
									  CreateManager.createManager
									  )


	setUp(
		actorScn.inject(rampUsers(20) during (20 seconds)),
		adminsScn.inject(rampUsers(20) during (20 seconds))
	).protocols(httpProtocol)
                                            
	
}