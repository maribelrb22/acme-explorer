'use strict'

import BookingModel from '../models/BookingModel.js';

const getBooking = async (req, res) => {
    try {
        const booking = await BookingModel.find({})
        res.status(200).json(booking)
    } catch (err) {
        res.status(500).json(err)
    }
}

const postBooking = async (req, res) => {
    try {
        const booking = new BookingModel(req.body)
        await booking.save()
        res.status(201).json(booking)
    } catch (err) {
        res.status(500).json(err)
    }
}


const patchBooking = async (req, res) => {
    try{
        const booking = await BookingModel.findById(req.params.id)
        if (booking) {
            await BookingModel.updateOne({_id: req.params.id}, {$set: {status: "ACCEPTED"}})
            res.status(200).json({message: "Status updated"})
        } else {
            res.status(404).json({message: "Booking not found"})
        }
    }
    catch (err) {
        res.status(500).json(err)
    }
}


export {getBooking, postBooking, patchBooking};





