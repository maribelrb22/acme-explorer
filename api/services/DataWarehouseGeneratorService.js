'use strict'

import TripModel from '../models/TripModel.js'
import BookingModel from '../models/BookingModel.js'
import FinderModel from '../models/FinderModel.js'

const generateDataWarehouse = async () => {
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

    let finderStats = await FinderModel.aggregate([
        { $facet: {
            "avgFinderPrice": [
                {
                    $group: {
                        _id: null,
                        "avgFinderPrice": {
                            $avg: {
                                $divide: [ { $add: ['$maxPrice', '$minPrice'] }, 2]
                            }
                        }
                    }
                }
            ],
            "top10FinderKeywords": [
                { $group: { _id: "$keyword", count: { $sum: 1 } } },
                { $sort: { count: -1 } },
                { $limit: 10 },
                { $project: { _id: 0, keyword: "$_id", count: 1 }}
            ]
        }}
    ]);

    return {
        tripsPerManagerStats: tripStats[0].tripsPerManagerStats[0],
        applicationsPerTripStats: bookingStats[0].applicationsPerTripStats[0],
        tripPriceStats: tripStats[0].tripPriceStats[0],
        statusRatios: bookingStats[0].statusRatios,
        avgFinderPrice: finderStats[0].avgFinderPrice[0].avgFinderPrice,
        top10FinderKeywords: finderStats[0].top10FinderKeywords
    };
}

export { generateDataWarehouse }
