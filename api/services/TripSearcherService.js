'use strict'

import TripModel from '../models/TripModel.js'
import ConfigurationModel from '../models/ConfigurationModel.js'


const searchTrips = async (finder) => {
    // get finder cache time from configuration
    const configuration = await ConfigurationModel.findOne()
    const finderSearchLimit = configuration.finderSearchLimit

    // create filters
    var filters = []

    if (finder.keyword)
        filters.push({ $or: [
            { title:        { $regex: finder.keyword } },
            { description:  { $regex: finder.keyword } },
            { ticker:       { $regex: finder.keyword } }
        ]})

    if (finder.minPrice)
        filters.push({ price: { $gte: finder.minPrice }})

    if (finder.maxPrice)
        filters.push({ price: { $lte: finder.maxPrice }})

    if (finder.minDate)
        filters.push({ startDate: { $gte: new Date(finder.minDate) }})

    if (finder.maxDate)
        filters.push({ startDate: { $lte: finder.maxDate }})

    const stages = []
    if (filters.length > 0) {
        stages.push({
            $addFields: { price: { $sum: '$stages.price' } }
        })
        stages.push({
            $match: { $and: filters }
        })
    }

    // limit results
    stages.push({
        $limit: finderSearchLimit
    })

    return await TripModel.aggregate(stages)
}

export { searchTrips }
