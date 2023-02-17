'use strict'

import DataWarehouseSchema from '../models/DataWarehouseModel.js'

const getLastIndicator = async (req, res) => {
    try {
        const dashboard = await DataWarehouseSchema.find({}).sort({computationMoment: -1}).limit(1);
        res.status(200).json(dashboard)
    } catch (err) {
        res.status(500).json(err)
    }
}

export { getLastIndicator };