'use strict'
import TripModel from '../models/TripModel.js';

const publishOrDeleteValidator = async (req, res, next) => {
    const trips = await TripModel.find({_id: req.params.id});
    if (!trips[0]?.published) {
        next()
    } else {
        res.status(403).send('Trip already published')
    }
}

export default publishOrDeleteValidator