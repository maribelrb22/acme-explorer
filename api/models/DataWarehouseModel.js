'use strict'

import mongoose from 'mongoose'
import { schema as StatsSchema } from './StatsModel.js'
import TripModel from './TripModel.js'
import BookingModel from './BookingModel.js'

const DataWarehouseSchema = new mongoose.Schema({
    tripsPerManagerStats: {
        type: StatsSchema,
        required: 'Enter trips per manager stats'
    },
    applicationsPerTripStats: {
        type: StatsSchema,
        required: 'Enter applications per trip stats'
    },
    tripPriceStats: {
        type: StatsSchema,
        required: 'Enter trip price stats'
    },
    statusRatios: {
        type: [{
            status: String,
            ratio: Number
        }],
        required: 'Enter application status ratios'
    },
    computationMoment: {
        type: Date,
        default: Date.now
    },
}, {strict: false});

DataWarehouseSchema.index({ computationMoment: -1 });

const model = mongoose.model('DataWarehouse', DataWarehouseSchema);

export const schema = model.schema;
export default model;
