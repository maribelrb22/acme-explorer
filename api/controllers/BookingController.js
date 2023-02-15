'use strict'

import BookingModel from '../models/BookingModel.js';

const getBooking = async (req, res, next) => {
    try {
        const booking = await BookingModel.find({})
        res.status(200).json(booking)
    } catch (err) {
        req.err = err;
        next()
    }
}

const postBooking = async (req, res, next) => {
    req.body.moment = undefined
    req.body.status = undefined
    try {
        const booking = new BookingModel(req.body)
        await booking.save()
        res.status(201).json(booking)
    } catch (err) {
        req.err = err;
        next()
    }
}

const dueBooking = async (req, res, next) => {
    try{
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING') {
                res.status(400).json({message: "Cannot accept a booking that is not PENDING"})
            } else {
                const updatedBooking = await BookingModel.updateOne({_id: req.params.id}, {$set: {status: "DUE"}})
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({message: "Booking not found"})
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const rejectBooking = async (req, res, next) => {
    try{
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING') {
                res.status(400).json({message: "Cannot reject a booking that is not PENDING"})
            } else {
                const updatedBooking = await BookingModel.updateOne({_id: req.params.id}, {$set: {status: "REJECTED"}})
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({message: "Booking not found"})
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const cancelBooking = async (req, res, next) => {
    try{
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING' && booking.status !== 'ACCEPTED') {
                res.status(400).json({message: "Cannot cancel a booking that is not PENDING or ACCEPTED"})
            } else {
                const updatedBooking = await BookingModel.updateOne({_id: req.params.id}, {$set: {status: "CANCELLED"}})
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({message: "Booking not found"})
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const acceptBooking = async (req, res, next) => {
    try{
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'DUE' ) {
                res.status(400).json({message: "Cannot accept a booking that is not DUE"})
            } else {
                const updatedBooking = await BookingModel.updateOne({_id: req.params.id}, {$set: {status: "ACCEPTED"}})
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({message: "Booking not found"})
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}



export {getBooking, postBooking, acceptBooking, rejectBooking, cancelBooking, dueBooking};