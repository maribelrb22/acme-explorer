'use strict'

import mongoose from 'mongoose'


const DashboardSchema = new mongoose.Schema({
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
    }
}, {strict: false});

const model = mongoose.model('Dashboard', DashboardSchema);

export const schema = model.schema;
export default model;
