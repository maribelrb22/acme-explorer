'use strict'

import mongoose from 'mongoose'
import { schema as StatsSchema } from './StatsModel.js'
import TripModel from './TripModel.js'
import BookingModel from './BookingModel.js'

const DataWarehouseSchema = new mongoose.Schema({
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
    },
    computationMoment: {
        type: Date,
        default: Date.now
    },
}, {strict: false});

DataWarehouseSchema.index({ computationMoment: -1 });

const model = mongoose.model('DataWarehouse', DataWarehouseSchema);

const generateDashboard = async () => {
    let tripStats = await TripModel.aggregate([
        { $facet: {
            "tripsPerManagerStats": [
                { $group: { _id: "$manager", count: { $sum: 1 } } },
                { $group: { _id: 0,
                    average: { $avg: "$count" },
                    maximum: { $max: "$count" },
                    minimum: { $min: "$count" },
                    stdDeviation: { $stdDevPop: "$count" }
                }},
                { $project: { _id: 0 } }
            ],
            "tripPriceStats": [
                { $unwind: "$stages" },
                { $group: { _id: "$_id", price: { $sum: "$stages.price" } } },
                { $group: { _id: 0,
                    average: { $avg: "$price" },
                    maximum: { $max: "$price" },
                    minimum: { $min: "$price" },
                    stdDeviation: { $stdDevPop: "$price" }
                }},
                { $project: { _id: 0 } }
            ],
        }},
    ]);

    let countBookings = await BookingModel.countDocuments();
    let bookingStats = await BookingModel.aggregate([
        { $facet: {
            "applicationsPerTripStats": [
                { $group: { _id: "$trip", count: { $sum: 1 } } },
                { $group: { _id: 0,
                    average: { $avg: "$count" },
                    maximum: { $max: "$count" },
                    minimum: { $min: "$count" },
                    stdDeviation: { $stdDevPop: "$count" }
                }},
                { $project: { _id: 0 } }
            ],
            "statusRatios": [
                { $group: { _id: "$status", count: { $sum: 1 } } },
                { $project: { _id: 0, status: "$_id", ratio: { $divide: ["$count", countBookings] } } }
            ]
        }},
    ]);
    return {
        tripsPerManagerStats: tripStats[0].tripsPerManagerStats[0],
        applicationsPerTripStats: bookingStats[0].applicationsPerTripStats[0],
        tripPriceStats: tripStats[0].tripPriceStats[0],
        statusRatios: bookingStats[0].statusRatios
    };
}

generateDashboard()
    .then((dashboard) => {
        if (dashboard.tripsPerManagerStats !== undefined &&
            dashboard.applicationsPerTripStats !== undefined &&
            dashboard.tripPriceStats !== undefined &&
            dashboard.statusRatios !== []) {
            const newDashboard = new model(dashboard);
            newDashboard.save();
        }
    })
    .catch((err) => {
        console.log(err);
    });

export const schema = model.schema;
export default model;
