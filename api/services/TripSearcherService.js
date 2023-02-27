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
    
    filters.push({ cancel: false })
    filters.push({ published: true })
    filters.push({ startDate: { $gte: new Date() } })

    if (finder.minPrice)
        filters.push({ price: { $gte: finder.minPrice }})

    if (finder.maxPrice)
        filters.push({ price: { $lte: finder.maxPrice }})

    if (finder.minDate)
        filters.push({ startDate: { $gte: new Date(finder.minDate) }})

    if (finder.maxDate)
        filters.push({ startDate: { $lte: finder.maxDate }})

    const aggStages = []
    if (filters.length > 0) {
        aggStages.push({
            $addFields: { price: { $sum: '$stages.price' } }
        })
        aggStages.push({
            $match: { $and: filters }
        })
    }

    // limit results
    aggStages.push({
        $limit: finderSearchLimit,
    })

    aggStages.push({
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
        })

    return await TripModel.aggregate(aggStages)
}

export { searchTrips }
