'use strict'
import mongoose from 'mongoose';

const ConfigurationSchema = new mongoose.Schema({
    flatRate: {
        type: Number,
        default: 1000,
        min: 0,
        required: 'Enter the flat rate of the configuration',
    },

}, { strict: false });

const model = mongoose.model('Configuration', ConfigurationSchema);

export const schema = model.schema;
export default model;