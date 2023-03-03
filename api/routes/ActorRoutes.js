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


/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all actors
 *     description: Retrieve a list of all actors. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: 
 *           - v1
 *           - v2
 *     responses:
 *       200:
 *         description: A list of actors
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Actor'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Register an actor
 *     description: This method is used to create an actor, it returns the created actor. Managers can only be created by administrators. Explorers can be created by any user.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterActor'
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
* */
v1.route("/")
  .get(getActors, sendErrors)
  .post(
    creationValidator,
    handleExpressValidation,
    createActor,
    sendErrors
  );

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *     summary: Update an actor
 *     description: This method is used to update an actor by its ID. An actor can only update its own data but administrators can update any actor.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - name: id
 *         in: path
 *         description: ID of the actor to update
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     requestBody:
 *       description: Actor object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateActor'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
* */
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


/**
 * @swagger
 * /actors/{id}/ban:
 *   patch:
 *     summary: Ban an actor
 *     description: This method is used to ban an actor by its ID. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - name: id
 *         in: path
 *         description: ID of the actor to ban
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error 
* */ 
v1.route("/:id/ban").patch(
  objectIdValidator,
  handleExpressValidation,
  banActor,
  sendErrors
);

/**
 * @swagger
 * /actors/{id}/unban:
 *   patch:
 *     summary: Unban an actor
 *     description: This method is used to unban an actor by its ID. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - name: id
 *         in: path
 *         description: ID of the actor to unban
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error 
* */
v1.route("/:id/unban").patch(
  objectIdValidator,
  handleExpressValidation,
  unbanActor,
  sendErrors
);

export const actorsV1 = v1;
export const actorsV2 = v2;
