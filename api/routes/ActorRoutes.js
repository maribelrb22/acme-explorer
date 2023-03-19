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

v1.route("/")
  .get(getActors, sendErrors)
  .post(
    creationValidator,
    handleExpressValidation,
    createActor,
    sendErrors
  );

v1.route("/:id")
  .get(objectIdValidator, handleExpressValidation, getMyPersonalData, sendErrors)
  .put(
    putValidator,
    objectIdValidator,
    handleExpressValidation,
    updateActor,
    sendErrors
);

v1.route("/:id/ban").patch(
  objectIdValidator,
  handleExpressValidation,
  banActor,
  sendErrors
);

v1.route("/:id/unban").patch(
  objectIdValidator,
  handleExpressValidation,
  unbanActor,
  sendErrors
);

export const actorsV1 = v1;
const v2 = express.Router();

v2.route("/")
  .get(verifyUser(['ADMIN']), getActors, sendErrors)
  .post(
    creationValidator,
    handleExpressValidation,
    createActor,
    sendErrors
  );
  //post doesnt need to be controlled by verifyUser because it is for register. The controller will distinguish between roles.

v2.route("/:id")
  .get(objectIdValidator, handleExpressValidation, getMyPersonalData, sendErrors)
  .put(
    verifyUser(['MANAGER', 'EXPLORER', 'ADMIN', 'SPONSOR']),
    putValidator,
    objectIdValidator,
    handleExpressValidation,
    updateVerifiedActor,
    sendErrors
  );

v2.route("/:id/ban").patch(
  verifyUser(['ADMIN']),
  objectIdValidator,
  handleExpressValidation,
  banActor,
  sendErrors
);

v2.route("/:id/unban").patch(
  verifyUser(['ADMIN']),
  objectIdValidator,
  handleExpressValidation,
  unbanActor,
  sendErrors
);

export const actorsV2 = v2;
