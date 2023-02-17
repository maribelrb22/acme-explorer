'use strict'
import express from 'express'

import { getConfiguration, updateConfiguration } from "../controllers/ConfigurationController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { updateValidator, objectIdValidator} from "../controllers/validators/ConfigurationValidator.js"
import handleValidation from '../middlewares/ValidationHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    .get(getConfiguration, sendErrors)

v1.route('/:id')
    .put(updateValidator, objectIdValidator, handleValidation, updateConfiguration, sendErrors)

export const configurationsV1 = v1;