'use strict'
import express from 'express'

import { actorsV2 } from './ActorRoutes.js'
import { bookingsV2 } from './BookingRoutes.js'
import { tripsV2 } from './TripRoutes.js'

const v2 = express.Router();

v2.use('/actors', actorsV2)
v2.use('/bookings', bookingsV2)
v2.use('/trips', tripsV2)

export default v2;
