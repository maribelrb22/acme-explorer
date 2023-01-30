'use strict'
import mongoose from 'mongoose'

const BookingSchema = new mongoose.Schema({
    moment: {
        type: Date,
        required: 'Enter the moment of the booking'
    },
    status: {
        type: String,
        enum: ['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED'],
        required: 'Enter the status of the booking'
    },
    comment: {
        type: String,
    },
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trip',
        required: 'Enter the trip of the booking'
    },
    explorer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Enter the explorer of the booking'
    },
}, {strict: false});

const model = mongoose.model('Booking', BookingSchema);

export const schema = model.schema
export default model
