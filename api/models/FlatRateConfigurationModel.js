'use strict'
import mongoose from 'mongoose';

const FlatRateConfigurationSchema = new mongoose.Schema({
    flatRate: {
        type: Number,
        default: 1000,
        min: 0,
        required: 'Enter the flat rate of the configuration',
    },

}, { strict: false });

const model = mongoose.model('FlatRateConfiguration', FlatRateConfigurationSchema);

export const schema = model.schema;
export default model;