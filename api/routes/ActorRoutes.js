'use strict'
import { listActors } from "../controllers/ActorController.js"
export default function (app) {
    app.route('/v0/actors')
        .get(listActors)
}