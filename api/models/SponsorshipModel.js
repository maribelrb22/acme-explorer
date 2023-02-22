'use strict'
import mongoose from 'mongoose';

const SponsorshipSchema = new mongoose.Schema({
    sponsor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Actor',
        required: 'Enter the sponsor of the sponsorship'
    },
    landingPage: {
        type: String,
        required: 'Enter the landing page of the sponsorship'
    },
    banner: {
        type: String,
        required: 'Enter the banner of the sponsorship'
    },
    paid: {
        type: Boolean,
        default: false
    }

}, { strict: false });

export const schema = SponsorshipSchema;
