'use strict'
import express from 'express'

import publishOrDeleteValidator from "../middlewares/PublishValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { cancelTripValidator, createTripValidator, updateTripValidator, objectIdValidator } from "../controllers/validators/TripValidator.js"
import { listTrips, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip} from "../controllers/TripController.js"


const v1 = express.Router();

//TODO: Add an endpoint to get my trips

v1.route('/')
    //Not authenticated and authenticated
    .get(listTrips, sendErrors)
    //Authenticated as MANAGER
    .post(createTripValidator, handleExpressValidation,  createTrip, sendErrors)

v1.route('/:tripId')
    //Authenticated as MANAGER
    .put(updateTripValidator, objectIdValidator, handleExpressValidation, publishOrDeleteValidator, updateTrip, sendErrors) 
    //Authenticated as MANAGER
    .delete(objectIdValidator, handleExpressValidation, publishOrDeleteValidator, deleteTrip, sendErrors) 

v1.route('/search')
    //Not authenticated and authenticated
    .get(searchTrips, sendErrors)

v1.route('/:tripId/cancel')
    //Authenticated as MANAGER
    .patch(cancelTripValidator, objectIdValidator, handleExpressValidation, cancelTrip, sendErrors) 

v1.route('/:tripId/publish')
    //Authenticated as MANAGER
    .patch(objectIdValidator, handleExpressValidation, publishTrip, sendErrors) 

const v2 = express.Router();

export const tripsV1 = v1;
export const tripsV2 = v2;