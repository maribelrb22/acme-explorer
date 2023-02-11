'use strict'

import FinderModel from '../models/FinderModel.js';

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
        const finder = await FinderModel.findById(req.params.explorerId);
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
        const finder = await FinderModel.findByIdAndUpdate(req.params.explorerId, req.body, { new: true });
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
        const finder = await FinderModel.findByIdAndDelete(req.params.explorerId);
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

export { createFinder, getFinder, updateFinder, deleteFinder };