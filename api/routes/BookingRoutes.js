'use strict'
import { getBooking, postBooking, patchBooking } from "../controllers/BookingController.js"
import { creationBookingValidator, updateBookingValidator } from '../controllers/validators/BookingValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'


export default function (app) { 
    app.route('/api/v0/bookings')
        .get(getBooking,sendErrors)
        .post(creationBookingValidator,
            handleExpressValidation,
            postBooking,
            sendErrors)

    app.route('/api/v0/bookings/:id')
        .patch(
            updateBookingValidator,
            handleExpressValidation,
            patchBooking,
            sendErrors
            )
}




