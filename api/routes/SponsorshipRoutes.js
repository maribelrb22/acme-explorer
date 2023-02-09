'use strict'
import express from 'express'

import { getSponsorship as getPaidSponsorship, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship } from "../controllers/SponsorshipController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createSponsorshipValidator, updateSponsorshipValidator } from "../controllers/validators/SponsorshipValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"

const v1 = express.Router();

v1.route('/')
    .get(getPaidSponsorship, sendErrors)
    .post(createSponsorshipValidator, handleExpressValidation, createSponsorship, sendErrors)

v1.route('/:id')
    .put(updateSponsorshipValidator, updateSponsorship, sendErrors)
    .delete(deleteSponsorship, sendErrors)
    .patch(paySponsorship, sendErrors)

export const sponsorshipsV1 = v1;
