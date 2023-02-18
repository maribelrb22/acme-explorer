'use strict';
import mongoose from 'mongoose';
import { schema as StagesSchema } from './StagesModel.js';
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
    cancel: {
        type: Boolean,
        default: false
    },
    cancelReason: {
        type: String,
    },
    requirements: [{
        type: String,
        trim: true,
        required: 'Enter the requirements of the trip'
    }],
    pictures: [{
        type: String,
    }],
    stages: [StagesSchema],
    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Enter the manager of the trip'
    },
    published: {
        type: Boolean,
        default: false,
        required: 'Enter the published status of the trip'
    }
    
}, { strict: false });

TripSchema.virtual('price').get(function () {
    return this.stages.reduce((acc, stage) => acc + stage.price, 0);
});

TripSchema.pre('save', function (callback) {
    const newTrip = this;
    const day = dateFormat(new Date(), "yymmdd");
    const sequenceTicker = sequenceTickerGenerator();
    newTrip.ticker = day + '-' + sequenceTicker;

    if (!newTrip.stages.length) {
        const err = new Error('The stages are required');
        err.name = 'StagesError';
        return callback(err);
    }

    callback();
});

TripSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret, options) {
        delete ret.id;
    }
});

TripSchema.index({ ticker: 'text', title: 'text', description: 'text' });
TripSchema.index({ startDate: 1 });
TripSchema.index({ manager: 1 });

const model = mongoose.model('Trip', TripSchema);

export const schema = model.schema;
export default model;