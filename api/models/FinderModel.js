'use strict'

import mongoose from 'mongoose'

const FinderSchema = new mongoose.Schema({
    keyword: {
        type: String
    },
    minPrice: {
        type: Number
    },
    maxPrice: {
        type: Number
    },
    minDate: {
        type: Date
    },
    maxDate: {
        type: Date
    },
    results: {
        type: Array
    },
    expireAt: {
        type: Date,
        default: Date.now
    },
}, {strict: false});

const model = mongoose.model('Finder', FinderSchema);

FinderSchema.index({explorer: 1});
FinderSchema.index({expireAt: 1}, {expireAfterSeconds: 0})


export const schema = model.schema;
export default model;
