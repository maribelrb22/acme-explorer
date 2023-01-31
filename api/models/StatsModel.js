'use strict'

import mongoose from 'mongoose'

const StatsSchema = new mongoose.Schema({
    average: {
        type: Number,
        required: 'Enter the average'
    },
    maximum: {
        type: Number,
        required: 'Enter the maximum'
    },
    minimum: {
        type: Number,
        required: 'Enter the minimum'
    },
    stdDeviation: {
        type: Number,
        required: 'Enter the standard deviation'
    }
}, {strict: false});

const model = mongoose.model('Stats', TripSchema);

export const schema = model.schema;
export default model;