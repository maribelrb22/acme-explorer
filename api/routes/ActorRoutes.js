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

v1.route("/").post(
  creationValidator,
  handleExpressValidation,
  createActor, // if user is not authenticated
  sendErrors
);

v1.route("/:actorId").put(
  putValidator,
  handleExpressValidation,
  updateActor, // if user is authenticated and it is the same user
  sendErrors
);

v1.route("/:id/ban").patch(
    banActor, 
    sendErrors
);

v1.route("/:id/unban").patch(
    unbanActor, 
    sendErrors
);

const v2 = express.Router();

export const actorsV1 = v1;
export const actorsV2 = v2;
