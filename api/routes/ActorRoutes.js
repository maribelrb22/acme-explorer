"use strict";
import express from "express";

import { getActors, getMyPersonalData, createActor, updateActor, banActor, unbanActor} from "../controllers/ActorController.js";
import {
  creationValidator,
  putValidator,
  objectIdValidator
} from "../controllers/validators/ActorValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";

const v1 = express.Router();

v1.route("/")
  //Authenticated as ADMIN
  .get(
    getActors,
    sendErrors
  )
  //Not authenticated and authenticated as ADMIN
  .post(
    creationValidator,
    handleExpressValidation,
    createActor, // if user is not authenticated, create a EXPLORER. If user is authenticated as ADMIN, create a MANAGER
    sendErrors
  );

//Authenticated
v1.route("/me").get(
  getMyPersonalData,
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
v1.route("/:actorId/ban").patch(
    objectIdValidator,
    handleExpressValidation,    
    banActor,
    sendErrors
);

//Authenticated as ADMIN
v1.route("/:actorId/unban").patch(
    objectIdValidator,
    handleExpressValidation,
    unbanActor,
    sendErrors
);

const v2 = express.Router();

export const actorsV1 = v1;
export const actorsV2 = v2;
