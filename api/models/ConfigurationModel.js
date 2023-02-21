'use strict'
import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
    flatRate: {
        type: Number,
        default: 1000,
        min: 0,
        required: 'Enter the flat rate of the configuration',
    },
    finderCacheSeconds: {
        type: Number,
        default: 60 * 60,
        min: 60,
        max: 60 * 60 * 24,
        required: 'Enter the finder cache time of the configuration',
    },
    finderSearchLimit: {
        type: Number,
        default: 10,
        min: 0,
        max: 100,
        required: 'Enter the finder search limit of the configuration',
    },
}, { strict: false });

const model = mongoose.model('Configuration', ConfigurationSchema);

export const schema = model.schema;
export default model;