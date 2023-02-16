'use strict'

import mongoose from 'mongoose'
import { schema as StatsSchema } from './StatsModel.js'
import TripModel from './TripModel.js'
import BookingModel from './BookingModel.js'

const DashboardSchema = new mongoose.Schema({
    tripsPerManagerStats: {
        type: StatsSchema,
        required: 'Enter trips per manager stats'
    },
    applicationsPerTripStats: {
        type: StatsSchema,
        required: 'Enter applications per trip stats'
    },
    tripPriceStats: {
        type: StatsSchema,
        required: 'Enter trip price stats'
    },
    statusRatios: {
        type: [{
            status: String,
            ratio: Number
        }],
        required: 'Enter application status ratios'
    }
}, {strict: false});

const model = mongoose.model('Dashboard', DashboardSchema);

const generateDashboard = async () => {
    let tripsPerManagerStats = await TripModel.aggregate([
        { $group: { _id: "$manager", count: { $sum: 1 } } },
        { $group: { _id: 0,
            average: { $avg: "$count" },
            maximum: { $max: "$count" },
            minimum: { $min: "$count" },
            stdDeviation: { $stdDevPop: "$count" } 
        }},
        { $project: { _id: 0 } }
    ]);
    let applicationsPerTripStats = await BookingModel.aggregate([
        { $group: { _id: "$trip", count: { $sum: 1 } } },
        { $group: { _id: 0,
            average: { $avg: "$count" },
            maximum: { $max: "$count" },
            minimum: { $min: "$count" },
            stdDeviation: { $stdDevPop: "$count" }
        }},
        { $project: { _id: 0 } }
    ]);
    let tripPriceStats = await TripModel.aggregate([
        { $unwind: "$stages" },
        { $group: { _id: "$_id", price: { $sum: "$stages.price" } } },
        { $group: { _id: 0,
            average: { $avg: "$price" },
            maximum: { $max: "$price" },
            minimum: { $min: "$price" },
            stdDeviation: { $stdDevPop: "$price" }
        }},
        { $project: { _id: 0 } }
    ]);
    let countBookings = await BookingModel.countDocuments();
    let statusRatios = await BookingModel.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, status: "$_id", ratio: { $divide: ["$count", countBookings] } } }
    ]);
    
    return{
        tripsPerManagerStats: tripsPerManagerStats[0],
        applicationsPerTripStats: applicationsPerTripStats[0],
        tripPriceStats: tripPriceStats[0],
        statusRatios: statusRatios
    };
}

generateDashboard()
    .then((dashboard) => {
        const newDashboard = new model(dashboard);
        newDashboard.save();
    })
    .catch((err) => {
        console.log(err);
    });

export const schema = model.schema;
export default model;
