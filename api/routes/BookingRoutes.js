'use strict'
import { listBookings } from "../controllers/BookingController.js"
export default function (app) { 
    app.route('/v0/bookings')
        .get(listBookings)
}

