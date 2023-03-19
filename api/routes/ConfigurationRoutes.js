'use strict'
import express from 'express'

import { getConfiguration, updateConfiguration } from "../controllers/ConfigurationController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { updateValidator} from "../controllers/validators/ConfigurationValidator.js"
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js"
import handleValidation from '../middlewares/ValidationHandlingMiddleware.js'
import { verifyUser } from "../controllers/AuthController.js"

const v1 = express.Router();

v1.route('/')
    .get(getConfiguration, sendErrors)

v1.route('/:id')
    .put(updateValidator, objectIdValidator, handleValidation, updateConfiguration, sendErrors)

export const configurationsV1 = v1;
const v2 = express.Router();

v2.route('/')
    .get(verifyUser(['ADMIN', 'SPONSOR']), getConfiguration, sendErrors)

v2.route('/:id')
    .put(verifyUser(['ADMIN']), updateValidator, objectIdValidator, handleValidation, updateConfiguration, sendErrors)

export const configurationsV2 = v2;