'use strict'

import mongoose from 'mongoose';

import ConfigurationModel from '../models/ConfigurationModel.js';
import FinderModel from '../models/FinderModel.js';
import { searchTrips as _searchTrips } from '../services/TripSearcherService.js';

// Finder CRUD
const createFinder = async (req, res, next) => {
    try {
        const newFinder = new FinderModel(req.body);
        const finder = await newFinder.save();
        res.status(201).json(finder);
    } catch (err) {
        req.err = err;
        next()
    }
}

const getFinder = async (req, res, next) => {
    try {
        const finder = await FinderModel.findById({ explorerId: req.params.explorerId });
        if (finder) {
            res.status(200).json(finder);
        } else {
            res.status(404).json({ message: 'Finder not found' });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateFinder = async (req, res, next) => {
    try {
        const finder = await FinderModel.findByIdAndUpdate({ explorerId: req.params.explorerId }, req.body, { new: true });
        if (finder) {
            res.status(200).json(finder);
        } else {
            res.status(404).json({ message: 'Finder not found' });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const deleteFinder = async (req, res, next) => {
    try {
        const finder = await FinderModel.findByIdAndDelete({ explorerID: req.params.explorerId });
        if (finder) {
            res.status(200).json(finder);
        } else {
            res.status(404).json({ message: 'Finder not found' });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const searchTrips = async (req, res, next) => {
    try {
        // get finder cache time from configuration
        const configuration = await ConfigurationModel.find()
        const finderSearchLimit = configuration.finderSearchLimit

        // get the explorer finder
        const finder = await FinderModel.findOne({explorer: req.params.explorerId});

        const trips = await _searchTrips(
            finder.keyword,
            0,
            1,
            undefined,
            undefined)
        res.status(200).json(trips);
    } catch (err) {
        req.err = err;
        next()
    }
}

export { createFinder, getFinder, updateFinder, deleteFinder, searchTrips};