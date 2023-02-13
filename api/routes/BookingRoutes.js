'use strict'
import express from 'express'

import { getBooking, postBooking, acceptBooking } from "../controllers/BookingController.js"
import { creationBookingValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

const v1 = express.Router();

v1.route('/')
    .get(getBooking,sendErrors) // if user is manager. Return the bookings of his trips
    .post(creationBookingValidator, // if user is a explorer
        handleExpressValidation,
        postBooking,
        sendErrors)

v1.route('/:id/accept')
    .patch(
        acceptBooking,
        sendErrors
    )

v1.route('/:id/reject')
    .patch(
        rejectBooking,
        sendErrors
    )

v1.route('/:id/cancel')
    .patch(
        cancelBooking,
        sendErrors
    )

v1.route('/:id/pay')
    .patch(
        payBooking,
        sendErrors
    )

const v2 = express.Router();

export const bookingsV1 = v1;
export const bookingsV2 = v2;
