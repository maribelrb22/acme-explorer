'use strict'
import express from 'express'

import { actorsV1 } from './ActorRoutes.js'
import { bookingsV1 } from './BookingRoutes.js'
import { tripsV1 } from './TripRoutes.js'
import { dataWarehouseV1 } from './DataWarehouseRoutes.js'
import { sponsorshipsV1 } from './SponsorshipRoutes.js'
import { configurationsV1 } from './ConfigurationRoutes.js'
import { findersV1 } from './FinderRoutes.js'
import { populateDatabaseV1 } from './PopulateDatabaseRoutes.js'
import { cubeV1} from './CubeRoutes.js'

const v1 = express.Router();

v1.use('/actors', actorsV1)
v1.use('/bookings', bookingsV1)
v1.use('/trips', tripsV1)
v1.use('/datawarehouse', dataWarehouseV1)
v1.use('/sponsorships', sponsorshipsV1)
v1.use('/configurations', configurationsV1)
v1.use('/finders', findersV1)
v1.use('/population', populateDatabaseV1)
v1.use('/cube', cubeV1)

export default v1;
