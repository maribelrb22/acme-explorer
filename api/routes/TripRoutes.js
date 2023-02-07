'use strict'
import { cancelTripValidator, createTripValidator, updateTripValidator } from "../controllers/validators/TripValidator.js"
import publishValidator from "../middlewares/PublishValidator.js"
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js"
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { listTrips, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip} from "../controllers/TripController.js"

export default function (app) {
    app.route('/v0/trips')
        .get(listTrips, sendErrors)
        .post(createTripValidator, handleExpressValidation, createTrip, sendErrors)

    app.route('/v0/trips/:tripId')
        .put(updateTripValidator, handleExpressValidation, publishValidator, updateTrip, sendErrors)
        .delete(publishValidator, deleteTrip, sendErrors)

    app.route('/v0/trips/search')
        .get(searchTrips, sendErrors)

    app.route('/v0/trips/:tripId/cancel')
        .patch(cancelTripValidator, handleExpressValidation, cancelTrip, sendErrors)

    app.route('/v0/trips/:tripId/publish')
        .patch(publishTrip, sendErrors)
}
