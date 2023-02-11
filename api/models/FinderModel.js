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
    }
    explorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor'
        required: 'Enter the explorer'
    }
}, {strict: false});

const model = mongoose.model('Finder', FinderSchema);

export const schema = model.schema;
export default model;
