'use strict';
import mongoose from 'mongoose';
import {schema as StagesSchema} from './StagesModel.js';
import { customAlphabet } from 'nanoid';
import dateFormat from 'dateformat';

const sequenceTickerGenerator = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);

const TripSchema = new mongoose.Schema({
    ticker: {
        type: String,
        unique: true
    },
    title: {
        type: String,
        required: 'Enter the title of the trip'
    },
    description: {
        type: String,
        required: 'Enter the description of the trip'
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
    published: {
        type: Boolean,
        required: 'Enter the published status of the trip'
    },
}, {strict: false});

TripSchema.virtual('price').get(function () {
    return this.stages.reduce((acc, stage) => acc + stage.price, 0);
});

TripSchema.pre('save', function (callback) {
    const newTrip = this;
    const day = dateFormat(new Date(), "yymmdd");
    const sequenceTicker = sequenceTickerGenerator();
    newTrip.ticker = day + '-' + sequenceTicker;
    callback();
});

const model = mongoose.model('Trip', TripSchema);

export const schema = model.schema;
export default model;