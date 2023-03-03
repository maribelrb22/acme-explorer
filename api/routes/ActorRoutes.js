"use strict";
import express from "express";

import {
  getActors,
  getMyPersonalData,
  createActor,
  updateActor,
  updateVerifiedActor,
  banActor,
  unbanActor,
} from "../controllers/ActorController.js";
import { creationValidator, putValidator } from "../controllers/validators/ActorValidator.js";
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";
import { verifyUser } from "../controllers/AuthController.js";

const v1 = express.Router();
const v2 = express.Router();

v1.route("/")
  //Authenticated as ADMIN
  .get(getActors, sendErrors)
  //Not authenticated and authenticated as ADMIN
  .post(
    creationValidator,
    handleExpressValidation,
    createActor, // if user is not authenticated, create a EXPLORER. If user is authenticated as ADMIN, create a MANAGER
    sendErrors
  );

//Authenticated and same user
v1.route("/:id").put(
  putValidator,
  objectIdValidator,
  handleExpressValidation,
  updateActor,
  sendErrors
);

v2.route("/:id")
  .get(objectIdValidator, handleExpressValidation, getMyPersonalData, sendErrors)
  .put(
    verifyUser(['MANAGER', 'EXPLORER', 'ADMIN']),
    putValidator,
    objectIdValidator,
    handleExpressValidation,
    updateVerifiedActor,
    sendErrors
  );

//Authenticated as ADMIN
v1.route("/:id/ban").patch(
  objectIdValidator,
  handleExpressValidation,
  banActor,
  sendErrors
);

//Authenticated as ADMIN
v1.route("/:id/unban").patch(
  objectIdValidator,
  handleExpressValidation,
  unbanActor,
  sendErrors
);

export const actorsV1 = v1;
export const actorsV2 = v2;
