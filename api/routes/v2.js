"use strict";
import express from "express";
import { loginV2 } from "./LoginRoutes.js";
import { actorsV2 } from "./ActorRoutes.js";
import { bookingsV2 } from "./BookingRoutes.js";
import { configurationsV2 } from "./ConfigurationRoutes.js";
import { dashboardV2 } from "./DashboardRoutes.js";
import { sponsorshipsV2 } from "./SponsorshipRoutes.js";
import { tripsV2 } from "./TripRoutes.js";

const v2 = express.Router();

v2.use("/login", loginV2);
v2.use("/actors", actorsV2);
v2.use("/bookings", bookingsV2);
v2.use("/configurations", configurationsV2);
v2.use("/dashboard", dashboardV2);
v2.use("/sponsorships", sponsorshipsV2);
v2.use("/trips", tripsV2);

export default v2;
