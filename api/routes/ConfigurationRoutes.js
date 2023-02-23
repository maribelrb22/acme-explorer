'use strict'
import express from 'express'

import { getConfiguration, updateConfiguration } from "../controllers/ConfigurationController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { updateValidator} from "../controllers/validators/ConfigurationValidator.js"
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js"
import handleValidation from '../middlewares/ValidationHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    //Authenticated as ADMIN
    .get(getConfiguration, sendErrors)

v1.route('/:id')
    //Authenticated as ADMIN
    .put(updateValidator, objectIdValidator, handleValidation, updateConfiguration, sendErrors)

export const configurationsV1 = v1;