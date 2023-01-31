'use strict'
import { getBooking, postBooking, patchBooking } from "../controllers/BookingController.js"

export default function (app) { 
    app.route('/api/v0/bookings')
        .get(getBooking)
        .post(postBooking)

    app.route('/api/v0/bookings/:id')
        .patch(patchBooking)
}




