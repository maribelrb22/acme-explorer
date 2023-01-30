'use strict';
import mongoose from 'mongoose';
import {schema as StagesSchema} from './StagesModel.js';

const TripSchema = new mongoose.Schema({
    ticker: {
        type: String,
        required: 'Enter the ticker of the trip'
    },
    title: {
        type: String,
        required: 'Enter the title of the trip'
    },
    description: {
        type: String,
        required: 'Enter the description of the trip'
    },
    price: {
        type: Number,
        required: 'Enter the price of the trip',
        min: 0
    },
    startDate: {
        type: Date,
        required: 'Enter the start date of the trip'
    },
    endDate: {
        type: Date,
        required: 'Enter the end date of the trip'
    },
    cancelReason: {
        type: String,
    },
    requirements: [{
        type: String,
    }],
    pictures: [{
        type: String,
    }],
    stages: [StagesSchema],
    manager : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Enter the manager of the trip'
    },
}, {strict: false});

const model = mongoose.model('Trip', TripSchema);

export const schema = model.schema;
export default model;