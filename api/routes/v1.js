'use strict'
import express from 'express'

import { actorsV1 } from './ActorRoutes.js'
import { bookingsV1 } from './BookingRoutes.js'
import { tripsV1 } from './TripRoutes.js'
import { dashboardsV1 } from './DashboardRoutes.js'

const v1 = express.Router();

v1.use('/actors', actorsV1)
v1.use('/bookings', bookingsV1)
v1.use('/trips', tripsV1)
v1.use('/dashboards', dashboardsV1)

export default v1;
