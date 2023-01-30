'use strict'

import BookingModel from '../models/BookingModel.js';

const listBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find({});
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json(err);
    }
}

export {listBookings};