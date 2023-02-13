'use strict'
import express from 'express'

import publishOrDeleteValidator from "../middlewares/PublishValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { cancelTripValidator, createTripValidator, updateTripValidator, objectIdValidator } from "../controllers/validators/TripValidator.js"
import { listTrips, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip} from "../controllers/TripController.js"


const v1 = express.Router();

v1.route('/')
    .get(listTrips, sendErrors)
    .post(createTripValidator, handleExpressValidation,  createTrip, sendErrors)

v1.route('/:tripId')
    .put(updateTripValidator, objectIdValidator, handleExpressValidation, publishOrDeleteValidator, updateTrip, sendErrors) // if user is manager and it is the same user
    .delete(objectIdValidator, handleExpressValidation, publishOrDeleteValidator, deleteTrip, sendErrors) // if user is manager and it is the same user

v1.route('/search')
    .get(searchTrips, sendErrors)

v1.route('/:tripId/cancel')
    .patch(cancelTripValidator, objectIdValidator, handleExpressValidation, cancelTrip, sendErrors) // if user is manager and it is the same user

v1.route('/:tripId/publish')
    .patch(objectIdValidator, handleExpressValidation, publishTrip, sendErrors) // if user is manager and it is the same user

const v2 = express.Router();

export const tripsV1 = v1;
export const tripsV2 = v2;