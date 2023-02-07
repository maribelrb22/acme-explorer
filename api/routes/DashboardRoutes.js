'use strict'
import { getDashboard } from "../controllers/DashboardController.js"

export default function (app) {
    app.route('/v0/dashboard')
        .get(getDashboard)
}