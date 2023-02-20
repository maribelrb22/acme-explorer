"use strict";
import express from "express";

import { createActor, updateActor, banActor, unbanActor} from "../controllers/ActorController.js";
import {
  creationValidator,
  putValidator,
} from "../controllers/validators/ActorValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";

const v1 = express.Router();

//Not authenticated and authenticated as ADMIN
v1.route("/").post(
  creationValidator,
  handleExpressValidation,
  createActor, // if user is not authenticated, create a EXPLORER. If user is authenticated as ADMIN, create a MANAGER
  sendErrors
);

//Authenticated and same user
v1.route("/:actorId").put(
  putValidator,
  handleExpressValidation,
  updateActor,
  sendErrors
);

//Authenticated as ADMIN
v1.route("/:actorId/ban").patch( //TODO: validate id is a valid ObjectId
    banActor, // TODO: validate is not banned
    sendErrors
);

//Authenticated as ADMIN
v1.route("/:actorId/unban").patch( //TODO: validate id is a valid ObjectId
    unbanActor, // TODO: validate is banned
    sendErrors
);

const v2 = express.Router();

export const actorsV1 = v1;
export const actorsV2 = v2;
