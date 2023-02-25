'use strict'

import DataWarehouseSchema from '../models/DataWarehouseModel.js'
import Booking from '../models/BookingModel.js'
import mongoose from 'mongoose'

const getLastIndicator = async (req, res) => {
    try {
        const dashboard = await DataWarehouseSchema.find({}).sort({ computationMoment: -1 }).limit(1);
        res.status(200).json(dashboard)
    } catch (err) {
        res.status(500).json(err)
    }
}

const calculatePeriod = (period) => {
    let startPeriod, endPeriod
    let startCurrentDate = new Date()
    let endCurrentDate = new Date()
    let endDate = parseInt(period.slice(1, 3)) - 1
    let startDate = parseInt(period.slice(5))

    if (period.startsWith('M')) {
        startPeriod = startCurrentDate.setMonth(startCurrentDate.getMonth() - endDate)
        endPeriod = endCurrentDate.setMonth(endCurrentDate.getMonth() - startDate)
    } else if (period.startsWith('Y')) {
        startPeriod = startCurrentDate.setFullYear(startCurrentDate.getFullYear() - endDate)
        endPeriod = endCurrentDate.setFullYear(endCurrentDate.getFullYear() - startDate)
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

    try {
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
                                in: { $add: ["$$value", "$$this.price"] }
                            }
                        }
                    }
                }
            }
        ])
        let totalMoneySpentByExplorer = 0
        if (computedPrice.length > 0) totalMoneySpentByExplorer = computedPrice[0].total
        res.status(200).send({ totalMoneySpentByExplorer })
    } catch (err) {
        req.err = err
        next()
    }
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

    try {
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
                                in: { $add: ["$$value", "$$this.price"] }
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
    } catch (err) {
        req.err = err
        next()
    }
}

export { getLastIndicator, getPriceByExplorer, getExplorers };