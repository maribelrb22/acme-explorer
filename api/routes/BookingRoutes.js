'use strict'
import express from 'express'

import { getExplorerBookings, postBooking, payBooking, rejectBooking, cancelBooking, dueBooking } from "../controllers/BookingController.js"
import { creationBookingValidator, creationRejectValidation, isExplorerValidator } from '../controllers/validators/BookingValidator.js'
import { objectIdValidator } from '../middlewares/ObjectIdValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

const v1 = express.Router();


v1.route('/:id')
    .get(isExplorerValidator, handleExpressValidation, getExplorerBookings, sendErrors)

v1.route('/')
    .post(creationBookingValidator,
        handleExpressValidation,
        postBooking,
        sendErrors)

v1.route('/:id/pay')
    .patch(
        objectIdValidator,
        isExplorerValidator,
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
