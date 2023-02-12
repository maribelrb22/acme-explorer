'use strict'
import FlatRateConfigurationModel from '../models/FlatRateConfigurationModel.js';

const getFlatRateConfiguration = async (req, res, next) => {
    try {
        const flatRateConfiguration = await FlatRateConfigurationModel.find()
        res.status(200).json(flatRateConfiguration)
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateFlatRateConfiguration = async (req, res, next) => {
    try {
        const flatRateConfiguration = await FlatRateConfigurationModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (flatRateConfiguration) {
            res.status(200).json(flatRateConfiguration)
        } else {
            res.status(404).send('Flat rate configuration not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

export { getFlatRateConfiguration, updateFlatRateConfiguration }