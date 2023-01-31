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
        type: {
            PENDING:    { type: String, required: 'Enter PENDING applications ratio' },
            REJECTED:   { type: String, required: 'Enter REJECTED applications ratio' },
            DUE:        { type: String, required: 'Enter DUE applications ratio' },
            ACCEPTED:   { type: String, required: 'Enter ACCEPTED applications ratio'},
            CANCELLED:  { type: String, required: 'Enter CANCELLED applications ratio' }
        },
        required: 'Enter application status ratios'
    }
}, {strict: false});

const model = mongoose.model('Dashboard', DashboardSchema);

export const schema = model.schema;
export default model;
