'use strict'
import express from 'express'

import { getSponsorshipsByUser, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship } from "../controllers/SponsorshipController.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createSponsorshipValidator, updateSponsorshipValidator} from "../controllers/validators/SponsorshipValidator.js"
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"
import { verifyUser } from "../controllers/AuthController.js"

const v1 = express.Router();

v1.route('/')
    .post(createSponsorshipValidator, handleExpressValidation, createSponsorship, sendErrors)

v1.route('/:id')
    .get(objectIdValidator, handleExpressValidation, getSponsorshipsByUser, sendErrors)
    .put(updateSponsorshipValidator, objectIdValidator, handleExpressValidation, updateSponsorship, sendErrors)
    .delete(objectIdValidator, handleExpressValidation, deleteSponsorship, sendErrors)
    .patch(objectIdValidator, handleExpressValidation, paySponsorship, sendErrors)

export const sponsorshipsV1 = v1;
const v2 = express.Router();

v2.route('/')
    .post(verifyUser(['SPONSOR']), createSponsorshipValidator, handleExpressValidation, createSponsorship, sendErrors)

v2.route('/:id')
    .get(verifyUser(['SPONSOR']), objectIdValidator, handleExpressValidation, getSponsorshipsByUser, sendErrors)
    .put(verifyUser(['SPONSOR']), updateSponsorshipValidator, objectIdValidator, handleExpressValidation, updateSponsorship, sendErrors)
    .delete(verifyUser(['SPONSOR']), objectIdValidator, handleExpressValidation, deleteSponsorship, sendErrors)
    .patch(verifyUser(['SPONSOR']), objectIdValidator, handleExpressValidation, paySponsorship, sendErrors)

export const sponsorshipsV2 = v2;
