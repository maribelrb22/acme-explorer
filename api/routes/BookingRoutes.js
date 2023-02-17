'use strict'
import express from 'express'

import { getBooking, postBooking, payBooking, rejectBooking, cancelBooking, dueBooking} from "../controllers/BookingController.js"
import { creationBookingValidator, creationRejectValidation, objectIdValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    .get(getBooking,sendErrors) // if user is manager. Return the bookings of his trips. If user is explorer, return his bookings
    .post(creationBookingValidator, // if user is a explorer
        handleExpressValidation,
        postBooking,
        sendErrors)

v1.route('/:id/pay')
    .patch(
        objectIdValidator,
        handleExpressValidation,
        payBooking,
        sendErrors
    )

v1.route('/:id/reject')
    .patch(
        creationRejectValidation,
        objectIdValidator,
        handleExpressValidation,
        rejectBooking,
        sendErrors
    )

v1.route('/:id/cancel')
    .patch(
        objectIdValidator,
        handleExpressValidation,
        cancelBooking,
        sendErrors
    )

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
