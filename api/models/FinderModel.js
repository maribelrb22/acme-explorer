'use strict'

import mongoose from 'mongoose'

const FinderSchema = new mongoose.Schema({
    explorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Enter the explorer of the finder'
    },
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
}, {strict: false});

const model = mongoose.model('Finder', FinderSchema);

FinderSchema.index({explorer: 1});

export const schema = model.schema;
export default model;
