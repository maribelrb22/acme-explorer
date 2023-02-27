'use strict'

import mongoose from 'mongoose';

import TripModel from '../models/TripModel.js';
import BookingModel from '../models/BookingModel.js';
import ActorModel from '../models/ActorModel.js';
import FinderModel from '../models/FinderModel.js';
import ConfigurationModel from '../models/ConfigurationModel.js';
import { searchTrips as _searchTrips } from '../services/TripSearcherService.js';


const listTrips = async (req, res, next) => {
    try {
        let trips = await TripModel.aggregate([
            {
                $match: { published: true, cancel: false, startDate: { $gt: new Date() } }
            },
            {
                $addFields: {
                    sponsorships: {
                      $let: {
                        vars: {
                          paidSponsorships: {
                            $filter: {
                              input: "$sponsorships",
                              as: "sponsorship",
                              cond: { $ne: ["$$sponsorship.paid", null] }
                            }
                          }
                        },
                        in: {
                          $cond: {
                            if: { $and: [{ $isArray: "$$paidSponsorships" }, { $gt: [{ $size: "$$paidSponsorships" }, 0] }] },
                            then: { $arrayElemAt: ["$$paidSponsorships", { $floor: { $multiply: [{ $size: "$$paidSponsorships" }, Math.random()] } }] } ,
                            else: null
                          }
                        }
                      }
                    }
                  }
        }
        ])
                        
            
        res.status(200).json(trips);
    } catch (err) {
        req.err = err;
        next()
    }
}

const getMyTrips = async (req, res, next) => {
    //TODO: Get the user id from the token
    const userId = await ActorModel.findOne({ role: 'MANAGER' });
    try {
        const trips = await TripModel.find({ manager: userId });
        res.status(200).json(trips);
    } catch (err) {
        req.err = err;
        next()
    }
}

const getTripById = async (req, res, next) => {
    //TODO: For showing the bookings, you must be the manager of the trip
    try {
        let trip = await TripModel.aggregate([
            {
                $match: {
                    _id: mongoose.Types.ObjectId(req.params.id)
                }
            },
            {
                $lookup: {
                    from: 'bookings',
                    localField: '_id',
                    foreignField: 'trip',
                    as: 'bookings'
                }
            }
        ]);
        if (trip) {
            res.status(200).json(trip);
        }
        else {
            res.status(404).json({ message: "Trip not found" });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

function _compareFinders(l, r) {
    return l.keyword === r.keyword &&
        l.minPrice === r.minPrice &&
        l.maxPrice === r.maxPrice &&
        l.minDate?.toISOString().substring(0, 10) === r.minDate?.toISOString().substring(0, 10) &&
        l.maxDate?.toISOString().substring(0, 10) === r.maxDate?.toISOString().substring(0, 10)
}

const searchTrips = async (req, res, next) => {
    try {
        // get finder cache time from configuration
        const configuration = await ConfigurationModel.findOne()
        const finderCacheSeconds = configuration.finderCacheSeconds

        // create finder with request params
        const newFinder = {
            _id: mongoose.Types.ObjectId(req.params.explorerId),
            keyword: req.query.keyword,
            minPrice: req.query.minPrice,
            maxPrice: req.query.maxPrice,
            minDate: req.query.minDate,
            maxDate: req.query.maxDate,
            expireAt: new Date(new Date().getTime() + finderCacheSeconds * 1000)
        }

        if(newFinder.minDate !== undefined && newFinder.maxDate !== undefined) {
            if(newFinder.minDate > newFinder.maxDate) {
                res.status(400).json({ message: 'Min date must be before max date' });
            }
        }

        if (newFinder.minPrice !== undefined && newFinder.maxPrice !== undefined) {
            if (newFinder.minPrice > newFinder.maxPrice) {
                res.status(400).json({ message: 'Min price must be before max price' });
            }
        }

        // find user finder
        const oldFinder = await FinderModel.findOne({ _id: req.params.explorerId })
        // check finder filters are equal to request filters
        if (oldFinder !== null && _compareFinders(oldFinder, newFinder)) {
            res.status(200).json(oldFinder.results)
        } else {
            // get filter results
            newFinder.results = await _searchTrips(newFinder)
            // insert new finder
            if (req.params.explorerId) {
                await FinderModel.findOneAndUpdate({ _id: req.params.explorerId }, newFinder, { upsert: true })
            }
            
            res.status(200).json(newFinder.results)
            return
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const createTrip = async (req, res, next) => {
    try {
        req.body.cancel = false;
        req.body.cancelReason = undefined;
        req.body.ticker = undefined;
        req.body.published = false;
        req.body.sponsorships = [];

        const startDate = new Date(req.body.startDate).getTime();
        const endDate = new Date(req.body.endDate).getTime();
        if (startDate > endDate) {
            res.status(400).json({ message: 'Start date must be before end date' });
            return;
        }      
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
        const trip = await TripModel.findOneAndUpdate({_id: req.params.id}, { published: true }, { new: true });
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
        req.body.ticker = undefined;
        req.body.published = false;
        req.body.sponsorships = [];

        const trips = await TripModel.find({_id: req.params.id})
        const trip = trips[0]
        if (trip) {
            const startDate = req.body.startDate ? req.body.startDate : Date(trip.startDate);
            const endDate = req.body.endDate ? req.body.endDate : Date(trip.endDate);
            if (startDate > endDate) {
                req.err = new Error('Start date must be before end date');
                req.err.status = 400;
                next();
            }
            const tripResponse = await TripModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
            res.status(200).json(tripResponse);
        } else {
            res.status(404).send("Trip not found")
        }
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const cancelTrip = async (req, res, next) => {
    try {
        const trips = await TripModel.find({_id: req.params.id});
        let trip = trips[0];
        if (trip) {
            const startDate = new Date(trip.startDate).getTime();
            
            //TODO: do with aggregate
            const bookings = await BookingModel.find({trip: trip._id});
            const acceptedBookings = bookings.filter(booking => booking.status === 'ACCEPTED');

            if (trip.published && startDate > Date.now() && acceptedBookings.length === 0) {
                trip = await TripModel.findOneAndUpdate({_id: req.params.id}, { cancel: true, cancelReason: req.body.cancelReason }, { new: true });
                res.status(200).json(trip);
            } else {
                res.status(409).json({message: 'The trip cannot be cancelled'});
            }
        } else {
            res.status(404).send("Trip not found")
        }
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}

const deleteTrip = async (req, res, next) => {
    try {
        const trips = await TripModel.find({_id : req.params.id})
        const trip = trips[0]
        if (trip) {
            await TripModel.findOneAndDelete({_id: req.params.id});
            res.status(204).json(trip);
        } else {
            res.status(404).send("Trip not found")
        }
        
    } catch (err) {
        // check if the role is MANAGER
        req.err = err;
        next()
    }
}
export {listTrips, getMyTrips, getTripById, searchTrips, createTrip, publishTrip, updateTrip, cancelTrip, deleteTrip};
