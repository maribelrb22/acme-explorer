'use strict';
import mongoose from 'mongoose';

const ActorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Enter the name of the actor'
    },
    surname: {
        type: String,
        required: 'Enter the surname of the actor'
    },
    email: {
        type: String,
        required: 'Enter the email of the actor'
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    role: [{
        type: String,
        enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER'],
        required: 'Enter the role of the actor'
    }]
}, {strict: false});    

const model = mongoose.model('Actor', ActorSchema);

export const schema = model.schema;
export default model;
