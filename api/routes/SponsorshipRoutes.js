'use strict'
import express from 'express'

import { getSponsorship as getPaidSponsorship, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship } from "../controllers/SponsorshipController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createSponsorshipValidator, updateSponsorshipValidator, objectIdValidator} from "../controllers/validators/SponsorshipValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"

const v1 = express.Router();

v1.route('/')
    //Authenticated as SPONSOR
    .get(getPaidSponsorship, sendErrors)
    //Authenticated as SPONSOR
    .post(createSponsorshipValidator, handleExpressValidation, createSponsorship, sendErrors)

v1.route('/:id')
    //Authenticated as SPONSOR
    .put(updateSponsorshipValidator, objectIdValidator, handleExpressValidation, updateSponsorship, sendErrors)
    //Authenticated as SPONSOR
    .delete(objectIdValidator, handleExpressValidation, deleteSponsorship, sendErrors)
    //Authenticated as SPONSOR
    .patch(objectIdValidator, handleExpressValidation, paySponsorship, sendErrors)

export const sponsorshipsV1 = v1;
