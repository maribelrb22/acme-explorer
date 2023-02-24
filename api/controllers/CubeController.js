'use strict'
import Booking from '../models/BookingModel.js'
import mongoose from 'mongoose'

const calculatePeriod = (period) => {
    let startPeriod, endPeriod
    let currentDate = new Date()
    let endDate = parseInt(period.slice(1, 3)) - 1
    let startDate = parseInt(period.slice(5))

    if (period.startsWith('M')) {
        startPeriod = currentDate.setMonth(currentDate.getMonth() - endDate)
        endPeriod = currentDate.setMonth(currentDate.getMonth() - startDate)
    } else if (period.startsWith('Y')) {
        startPeriod = currentDate.setFullYear(currentDate.getFullYear() - endDate)
        endPeriod = currentDate.setFullYear(currentDate.getFullYear() - startDate)
    }
    startPeriod = new Date(startPeriod)
    endPeriod = new Date(endPeriod)
    return { startPeriod, endPeriod }
}

const getPriceByExplorer = async (req, res, next) => {
    const period = req.body.period
    let calculatedPeriod = calculatePeriod(period)
    let startPeriod = calculatedPeriod.startPeriod
    let endPeriod = calculatedPeriod.endPeriod

    const computedPrice = await Booking.aggregate([
        {
            $match: {
                explorer: mongoose.Types.ObjectId(req.body.explorer),
                paid: { $gte: endPeriod, $lte: startPeriod }
            },
        },
        {
            $lookup: {
                from: 'trips',
                localField: 'trip',
                foreignField: '_id',
                as: 'trip'
            }
        },
        {
            $unwind: '$trip'
        },
        {
            $group: {
                 _id: 0,
                 total: {
                     $sum: {
                         $reduce: {
                             input: "$trip.stages",
                             initialValue: 0,
                             in: { $add: [ "$$value", "$$this.price" ] }
                         }
                     }
                 }
            }
        }
    ])
    let totalMoneySpentByExplorer = 0
    if (computedPrice.length > 0) totalMoneySpentByExplorer = computedPrice[0].total
    res.status(200).send({ totalMoneySpentByExplorer })
}

const getExplorers = async (req, res, next) => {
    const period = req.body.period
    const price = req.body.price
    const operator = req.body.operator
    let matchOperation = {}

    let calculatedPeriod = calculatePeriod(period)
    let startPeriod = calculatedPeriod.startPeriod
    let endPeriod = calculatedPeriod.endPeriod

    switch (operator) {
        case "equal":
            matchOperation = { $eq: price }
            break
        case "not equal":
            matchOperation = { $ne: price }
            break
        case "greater than":
            matchOperation = { $gt: price }
            break
        case "greater than or equal":
            matchOperation = { $gte: price }
            break
        case "smaller than":
            matchOperation = { $lt: price }
            break
        case "smaller than or equal":
            matchOperation = { $lte: price }
            break
    }

    let explorers = await Booking.aggregate([
        {
            $match: {
                paid: { $gte: endPeriod, $lte: startPeriod }
            },
        },
        {
            $lookup: {
                from: 'trips',
                localField: 'trip',
                foreignField: '_id',
                as: 'trip'
            }
        },
        {
            $unwind: '$trip'
        },
        {
            $group: {
                _id: "$explorer",
                total: {
                    $sum: {
                        $reduce: {
                            input: "$trip.stages",
                            initialValue: 0,
                            in: { $add: [ "$$value", "$$this.price" ] }
                        }
                    }
                }
            }
        },
        {
            $match: {
                total: matchOperation
            }
        },
        {
            $lookup: {
                from: 'actors',
                localField: '_id',
                foreignField: '_id',
                as: 'actor'
            }
        },
        {
            $unwind: '$actor'
        },
        {
            $project: {
                _id: 0,
                actor: 1
            }
        },
    ])
    res.status(200).json(explorers)

}
export { getPriceByExplorer, getExplorers }

