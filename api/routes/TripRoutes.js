'use strict'
import { listTrips } from "../controllers/TripController.js"
export default function (app) {
    app.route('/v0/trips')
        .get(listTrips)
}
