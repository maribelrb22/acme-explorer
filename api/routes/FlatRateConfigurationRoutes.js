'use strict'
import express from 'express'

import { getFlatRateConfiguration, updateFlatRateConfiguration } from "../controllers/FlatRateConfigurationController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { updateFlatRateValidator, objectIdValidator} from "../controllers/validators/FlatRateConfigurationValidator.js"
import handleValidation from '../middlewares/ValidationHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    .get(getFlatRateConfiguration, sendErrors)

v1.route('/:id')
    .put(updateFlatRateValidator, objectIdValidator, handleValidation, updateFlatRateConfiguration, sendErrors)

export const flatRateConfigurationsV1 = v1;