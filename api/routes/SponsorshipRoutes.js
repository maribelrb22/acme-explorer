'use strict'
import express from 'express'

import { getSponsorshipsByUser, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship } from "../controllers/SponsorshipController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createSponsorshipValidator, updateSponsorshipValidator} from "../controllers/validators/SponsorshipValidator.js"
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"

const v1 = express.Router();

v1.route('/')
    //Authenticated as SPONSOR
    .post(createSponsorshipValidator, handleExpressValidation, createSponsorship, sendErrors)

v1.route('/:id')
    //Autgenticated as SPONSOR, in this case, id is the sponsor id
    .get(objectIdValidator, handleExpressValidation, getSponsorshipsByUser, sendErrors)
    //Authenticated as SPONSOR
    .put(updateSponsorshipValidator, objectIdValidator, handleExpressValidation, updateSponsorship, sendErrors)
    //Authenticated as SPONSOR
    .delete(objectIdValidator, handleExpressValidation, deleteSponsorship, sendErrors)
    //Authenticated as SPONSOR
    .patch(objectIdValidator, handleExpressValidation, paySponsorship, sendErrors)

export const sponsorshipsV1 = v1;
