'use strict'

import DashboardSchema from '../models/DashboardModel.js'

const getDashboard = async (req, res) => {
    try {
        const dashboard = await getDashboard.find({})
        res.status(200).json(dashboard)
    } catch (err) {
        res.status(500).json(err)
    }
}

export {getDashboard};