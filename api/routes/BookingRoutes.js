'use strict'
import express from 'express'

import { getBooking, postBooking, acceptBooking } from "../controllers/BookingController.js"
import { creationBookingValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'


const v1 = express.Router();

v1.route('/')
    .get(getBooking,sendErrors)
    .post(creationBookingValidator,
        handleExpressValidation,
        postBooking,
        sendErrors)

v1.route('/:id')
    .patch(
        acceptBooking,
        sendErrors
    )

const v2 = express.Router();

export const bookingsV1 = v1;
export const bookingsV2 = v2;
