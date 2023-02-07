'use strict'
import { createActor, updateActor } from "../controllers/ActorController.js"
import { creationValidator, putValidator } from '../controllers/validators/ActorValidator.js'
import handleExpressValidation from '../middlewares/ValidationHandlingMiddleware.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

export default function (app) {
    app.route('/v0/actors')
        .post(
            creationValidator,
            handleExpressValidation,
            createActor,
            sendErrors)

    app.route('/v0/actors/:actorId')
        .put(
            putValidator,
            handleExpressValidation,
            updateActor,
            sendErrors)
}