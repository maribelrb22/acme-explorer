'use strict'
import express from 'express'

import { getExplorerBookings, getManagerBookings, postBooking, payBooking, rejectBooking, cancelBooking, dueBooking} from "../controllers/BookingController.js"
import { creationBookingValidator, creationRejectValidation, objectIdValidator, isExplorerValidator, isManagerValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    //Authenticated as EXPLORER
    .post(creationBookingValidator,
        handleExpressValidation,
        postBooking,
        sendErrors)

v1.route('/explorer')
    .get(isExplorerValidator, getExplorerBookings, sendErrors)

v1.route('/manager')
    .get(isManagerValidator, getManagerBookings, sendErrors)

//Authenticated as EXPLORER
v1.route('/:id/pay')
    .patch(
        objectIdValidator,
        handleExpressValidation,
        payBooking,
        sendErrors
    )

//Authenticated as MANAGER
v1.route('/:id/reject')
    .patch(
        creationRejectValidation,
        objectIdValidator,
        handleExpressValidation,
        rejectBooking,
        sendErrors
    )

//Authenticated as EXPLORER
v1.route('/:id/cancel')
    .patch(
        objectIdValidator,
        handleExpressValidation,
        cancelBooking,
        sendErrors
    )

//Authenticated as MANAGER
v1.route('/:id/due')
    .patch(
        objectIdValidator,
        handleExpressValidation,
        dueBooking,
        sendErrors
    )

const v2 = express.Router();

export const bookingsV1 = v1;
export const bookingsV2 = v2;
