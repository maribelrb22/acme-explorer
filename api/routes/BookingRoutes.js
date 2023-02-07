'use strict'
import { getBooking, postBooking, acceptBooking } from "../controllers/BookingController.js"
import { creationBookingValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'


export default function (app) { 
    app.route('/v0/bookings')
        .get(getBooking,sendErrors)
        .post(creationBookingValidator,
            handleExpressValidation,
            postBooking,
            sendErrors)

    app.route('/v0/bookings/:id')
        .patch(
            acceptBooking,
            sendErrors
        )
}




