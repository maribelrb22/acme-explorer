'use strict'
import express from 'express'

import { createActor, updateActor } from "../controllers/ActorController.js"
import { creationValidator, putValidator } from '../controllers/validators/ActorValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'


const v1 = express.Router();

v1.route('/')
    .post(
        creationValidator,
        handleExpressValidation,
        createActor,
        sendErrors)

v1.route('/:actorId')
    .put(
        putValidator,
        handleExpressValidation,
        updateActor,
        sendErrors)

const v2 = express.Router();

export const actorsV1 = v1;
export const actorsV2 = v2;
