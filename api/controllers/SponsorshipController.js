'use strict'
import TripModel from '../models/TripModel.js'
import mongoose from 'mongoose';

const getSponsorshipsByUser = async (req, res, next) => {
    try {
        let trips = await TripModel.aggregate([
            {$unwind: "$sponsorships"},
            {$match: {"sponsorships.sponsor": mongoose.Types.ObjectId(req.params.id)}},
            {$addFields: { price: { $sum: '$stages.price' } }}
        ])
        res.status(200).json(trips)
    } catch (err) {
        req.err = err;
        next()
    }
}

const createSponsorship = async (req, res, next) => {
    try {
        req.body.paid = false;
        let trip = await TripModel.findOne({_id: req.body.trip});
        if (trip) {
            const sponsorship = ({
                sponsor: req.body.sponsor,
                landingPage: req.body.landingPage,
                banner: req.body.banner
            })
            trip.sponsorships.push(sponsorship); 
            trip = await trip.save();
            res.status(201).json(trip);
        }else {
            res.status(404).send('Trip not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateSponsorship = async (req, res, next) => {
    try {
        req.body.paid = false;
        req.body.sponsor = undefined;

        const originalSponsorship = await TripModel.findOne({'sponsorships._id': req.params.id}, { 'sponsorships.$': 1 });
        const sponsorship = ({
            landingPage: req.body.landingPage,
            banner: req.body.banner ? req.body.banner : originalSponsorship.sponsorships[0].banner,
            sponsor: req.body.sponsor ? req.body.sponsor : originalSponsorship.sponsorships[0].sponsor,
        })
        const trip = await TripModel.findOneAndUpdate({'sponsorships._id': req.params.id}, { $set: { 'sponsorships.$': sponsorship } }, { new: true });
        if (trip) {
            res.status(200).json(trip)
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const deleteSponsorship = async (req, res, next) => {
    try {
        const trip = await TripModel.findOneAndUpdate({'sponsorships._id': req.params.id}, { $pull: { sponsorships: { _id: req.params.id } } }, { new: true });
        if (trip) {
            res.status(204).json()
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const paySponsorship = async (req, res, next) => {
    try {
        const trip = await TripModel.findOneAndUpdate({'sponsorships._id' : req.params.id}, { $set: {"sponsorships.$.paid" : true}}, {new : true})
        if (trip) {
            res.status(200).json(trip)
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

export { getSponsorshipsByUser, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship }
