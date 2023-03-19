'use strict';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

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
        required: 'Kindly enter the actor email',
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: ['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR'],
        required: 'Enter the role of the actor'
    },
    banned: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(v);
            },
            message: props => `Is not a valid password!, it must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character`
        },
        required: 'Kindly enter the actor password'
    },
    customToken: {
        type: String,
    }
}, { strict: false });

ActorSchema.index({ email:1 });

ActorSchema.pre('save', function (callback) {
    const actor = this
    bcrypt.genSalt(5, function (err, salt) {
        if (err) return callback(err)

        bcrypt.hash(actor.password, salt, function (err, hash) {
            if (err) return callback(err)
            actor.password = hash
            callback()
        })
    })
})

// verify password
ActorSchema.methods.verifyPassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

ActorSchema.pre('findOneAndUpdate', function (callback) {
    const actor = this._update
    if (actor?.password) {
        bcrypt.genSalt(5, function (err, salt) {
            if (err) return callback(err)

            bcrypt.hash(actor.password, salt, function (err, hash) {
                if (err) return callback(err)
                actor.password = hash
                callback()
            })
        })
    }
    else {
        callback()
    }
})
const model = mongoose.model('Actor', ActorSchema);

export const schema = model.schema;
export default model;
