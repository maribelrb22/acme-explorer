'use strict'
import express from 'express'

import { getFlatRateConfiguration, createFlatRateConfiguration, updateFlatRateConfiguration } from "../controllers/FlatRateConfigurationController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createOrUpdateFlatRateValidator, objectIdValidator} from "../controllers/validators/FlatRateConfigurationValidator.js"
import handleValidation from '../middlewares/ValidationHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    .get(getFlatRateConfiguration, sendErrors)
    .post(createOrUpdateFlatRateValidator, handleValidation, createFlatRateConfiguration, sendErrors)

v1.route('/:id')
    .put(createOrUpdateFlatRateValidator, objectIdValidator, handleValidation, updateFlatRateConfiguration, sendErrors)

export const flatRateConfigurationsV1 = v1;