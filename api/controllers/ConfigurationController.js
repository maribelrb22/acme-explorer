'use strict'
import ConfigurationModel from '../models/ConfigurationModel.js';

const getConfiguration = async (req, res, next) => {
    try {
        const configuration = await ConfigurationModel.find()
        res.status(200).json(configuration)
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateConfiguration = async (req, res, next) => {
    try {
        const configuration = await ConfigurationModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (configuration) {
            res.status(200).json(configuration)
        } else {
            res.status(404).send('Configuration not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

export { getConfiguration, updateConfiguration }