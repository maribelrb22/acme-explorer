'use strict'
import express from 'express'

import publishOrDeleteValidator from "../middlewares/PublishValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { cancelTripValidator, createTripValidator, updateTripValidator, searchTripsValidator } from "../controllers/validators/TripValidator.js"
import { objectIdValidator } from "../middlewares/ObjectIdValidator.js"
import { listTrips, getMyTrips, getTripById, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip} from "../controllers/TripController.js"
import { verifyUser } from "../controllers/AuthController.js"

const v1 = express.Router();

v1.route('/')
    .get(listTrips, sendErrors)
    .post(createTripValidator, handleExpressValidation,  createTrip, sendErrors)

v1.route('/me/:id')
    .get(objectIdValidator, handleExpressValidation, getMyTrips, sendErrors)

v1.route('/search/:explorerId?')
    .get(searchTripsValidator, handleExpressValidation, searchTrips, sendErrors)

v1.route('/:id')
    .get(objectIdValidator, handleExpressValidation, getTripById, sendErrors)
    .put(updateTripValidator, objectIdValidator, handleExpressValidation, publishOrDeleteValidator, updateTrip, sendErrors) 
    .delete(objectIdValidator, handleExpressValidation, publishOrDeleteValidator, deleteTrip, sendErrors) 


v1.route('/:id/cancel')
    .patch(cancelTripValidator, objectIdValidator, handleExpressValidation, cancelTrip, sendErrors) 

v1.route('/:id/publish')
    .patch(objectIdValidator, handleExpressValidation, publishTrip, sendErrors) 

export const tripsV1 = v1;
const v2 = express.Router();

v2.route('/')
    .get(listTrips, sendErrors)
    .post(verifyUser(['MANAGER']), createTripValidator, handleExpressValidation,  createTrip, sendErrors)

v2.route('/me/:id')
    .get(verifyUser(['MANAGER']), objectIdValidator, handleExpressValidation, getMyTrips, sendErrors)

v2.route('/search/:explorerId?')
    // The controller will check if the user is a Explorer to keep the response in his finder
    .get(searchTripsValidator, handleExpressValidation, searchTrips, sendErrors)

v2.route('/:id')
    //In front-end, manager will have a panel with where he can see all bookings in a trip and change the status
    .get(objectIdValidator, handleExpressValidation, getTripById, sendErrors)
    .put(verifyUser(['MANAGER']), updateTripValidator, objectIdValidator, handleExpressValidation, publishOrDeleteValidator, updateTrip, sendErrors)
    .delete(verifyUser(['MANAGER']), objectIdValidator, handleExpressValidation, publishOrDeleteValidator, deleteTrip, sendErrors)

v2.route('/:id/cancel')
    .patch(cancelTripValidator, objectIdValidator, handleExpressValidation, cancelTrip, sendErrors)

v2.route('/:id/publish')
    .patch(verifyUser(['MANAGER']), objectIdValidator, handleExpressValidation, publishTrip, sendErrors)

export const tripsV2 = v2;