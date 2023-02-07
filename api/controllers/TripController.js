'use strict'

import TripModel from '../models/TripModel.js';

const listTrips = async (req, res, next) => {
    try {
        const trips = await TripModel.find({});
        res.status(200).json(trips);
    } catch (err) {
        req.err = err;
        next()
    }
}

const searchTrips = async (req, res, next) => {
    try {
        const trips = await TripModel.find({
            $or: [
                { title: { $regex: req.query.q, $options: 'i' } },
                { description: { $regex: req.query.q, $options: 'i' } },
                { ticker: { $regex: req.query.q, $options: 'i' } }
            ]
        });
        res.status(200).json(trips);
    } catch (err) {
        req.err = err;
        next()
    }
}

const createTrip = async (req, res, next) => {
    try {
        req.body.cancel = false;
        req.body.cancelReason = undefined;
        const newTrip = new TripModel(req.body);
        const trip = await newTrip.save();
        res.status(201).json(trip);
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const publishTrip = async (req, res, next) => {
    try {
        const trip = await TripModel.findOneAndUpdate({_id: req.params.tripId}, { published: true }, { new: true });
        if (trip) {
            res.status(200).json(trip);
        } else {
            res.status(404).send('Trip not found')
        }
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const updateTrip = async (req, res, next) => {
    try {
        req.body.cancel = false;
        req.body.cancelReason = undefined;
        const trip = await TripModel.findOneAndUpdate({_id: req.params.tripId}, req.body, { new: true });
        res.status(200).json(trip);
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const cancelTrip = async (req, res, next) => {
    try {
        const trips = await TripModel.find({_id: req.params.tripId});
        const trip = trips[0];
        const startDate = new Date(trip.startDate).getTime();

        if (trip.published && startDate > Date.now() && trip.bookings.length === 0) {
            await TripModel.findOneAndUpdate({_id: req.params.tripId}, { cancel: true, cancelReason: req.body.cancelReason }, { new: true });
            res.status(200).json(trip);
        } else {
            res.status(409).json({message: 'The trip cannot be cancelled'});
        }
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const deleteTrip = async (req, res, next) => {
    try {
        const trip = await TripModel.deleteOne({_id: req.params.tripId}, req.body);
        res.status(204).json(trip);
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

export {listTrips, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip};
