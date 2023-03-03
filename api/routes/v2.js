"use strict";
import express from "express";
import { loginV2 } from "./LoginRoutes.js";
import { actorsV2 } from "./ActorRoutes.js";

const v2 = express.Router();

v2.use("/login", loginV2);
v2.use("/actors", actorsV2);

export default v2;
