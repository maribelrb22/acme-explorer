'use strict'

import TripModel from '../models/TripModel.js';

const listTrips = async (req, res) => {
    try {
        const trips = await TripModel.find({});
        res.status(200).json(trips);
    } catch (err) {
        res.status(500).json(err);
    }
}

export {listTrips};
