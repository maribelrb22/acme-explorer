'use strict'
import mongoose from 'mongoose'

const StagesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Enter the title of the stage'
    },
    description: {
        type: String,
        required: 'Enter the description of the stage'
    },
    price: {
        type: Number,
        required: 'Enter the price of the stage',
        min: 0
    }
}, {strict: false});

export const schema  =  StagesSchema;
