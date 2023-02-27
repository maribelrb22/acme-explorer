'use strict'

import mongoose from 'mongoose';

import BookingModel from '../models/BookingModel.js';


const getExplorerBookings = async (req, res, next) => {
    try {
        // join Trip with Bookings and get manager bookings
        const bookings = await BookingModel.aggregate([
            {
                $match: {
                    explorer: mongoose.Types.ObjectId(req.body.explorerId)
                }
            },
            {
                $group: {
                    _id: '$status', 
                    bookings: {
                        $push: '$$ROOT'
                    }
                }
            }
        ]);
        res.status(200).json(bookings)
    } catch (err) {
        req.err = err;
        next()
    }
}

const postBooking = async (req, res, next) => {
    req.body.moment = undefined
    req.body.status = undefined
    req.body.paid = undefined
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
    try {
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING') {
                res.status(400).json({ message: "Cannot accept a booking that is not PENDING" })
            } else {
                const updatedBooking = await BookingModel.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "DUE" } })
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({ message: "Booking not found" })
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const rejectBooking = async (req, res, next) => {
    try {
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING') {
                res.status(400).json({ message: "Cannot reject a booking that is not PENDING" })
            } else {
                const updatedBooking = await BookingModel.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "REJECTED", rejectReason: req.body.rejectReason } })
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({ message: "Booking not found" })
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const cancelBooking = async (req, res, next) => {
    try {
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'PENDING' && booking.status !== 'ACCEPTED') {
                res.status(400).json({ message: "Cannot cancel a booking that is not PENDING or ACCEPTED" })
            } else {
                const updatedBooking = await BookingModel.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "CANCELLED" } })
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({ message: "Booking not found" })
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

const payBooking = async (req, res, next) => {
    try {
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            if (booking.status !== 'DUE') {
                res.status(400).json({ message: "Cannot accept a booking that is not DUE" })
            } else {
                const updatedBooking = await BookingModel.findOneAndUpdate({ _id: req.params.id }, { $set: { status: "ACCEPTED", paid: new Date() } })
                res.status(200).json(updatedBooking)
            }
        } else {
            res.status(404).json({ message: "Booking not found" })
        }
    }
    catch (err) {
        req.err = err;
        next()
    }
}

export { getExplorerBookings, postBooking, payBooking, rejectBooking, cancelBooking, dueBooking };