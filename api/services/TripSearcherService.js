'use strict'

import TripModel from '../models/TripModel.js'


const searchTrips = async (limit, keyword, minPrice, maxPrice, minDate, maxDate) => {
    // create filters
    var filters = []

    // if (keyword)
    //     filters.push({ $or: [
    //         { title:        { $regex: keyword, $options: 'i' } },
    //         { description:  { $regex: keyword, $options: 'i' } },
    //         { ticker:       { $regex: keyword, $options: 'i' } }
    //     ]})

    if (minPrice)
        filters.push({ price: { $gte: minPrice }})

    if (maxPrice)
        filters.push({ price: { $lte: maxPrice }})

    if (minDate)
        filters.push({ startDate: { $gte: minDate }})

    if (maxDate)
        filters.push({ startDate: { $lte: maxDate }})

    console.log(filters)

    return await TripModel.aggregate([{$match: { $and: filters }}])
}

export { searchTrips }
