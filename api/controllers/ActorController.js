'use strict'

import ActorModel from '../models/ActorModel.js';

const getActors = async (req, res, next) => {
    try {
        const actors = await ActorModel.find();
        res.status(200).json(actors);
    } catch (err) {
        req.err = err;
        next()
    }
}

const getMyPersonalData = async (req, res, next) => {
    //TODO: Get the user id from the token
    const userId = await ActorModel.findOne({});
    try {
        const actor = await ActorModel.findOne({ _id: userId });
        res.status(200).json(actor);
    } catch (err) {
        req.err = err;
        next()
    }
}

const createActor = async (req, res, next) => {
    req.body.banned = undefined;
    const newActor = new ActorModel(req.body);
    try {
        const actor = await newActor.save();
        res.status(201).json(actor);
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateActor = async (req, res, next) => {
    req.body.banned = undefined;
    try {
        const actor = await ActorModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        if (actor) {
            res.status(200).json(actor);
        }
        else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}


const banActor = async (req, res, next) => {
    try {
        const actor = await ActorModel.findOne({ _id: req.params.id })
        if (actor) {
            if (actor.banned) {
                res.status(400).json({ message: "Actor already banned" });
            }
            await ActorModel.findOneAndUpdate({ _id: req.params.id }, { banned: true }, { new: true })
            res.status(200).json(actor);
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const unbanActor = async (req, res, next) => {
    try {
        const actor = await ActorModel.findOne({ _id: req.params.id })
        if (actor) {
            if (!actor.banned) {
                res.status(400).json({ message: "Actor not banned" });
            }
            await ActorModel.findOneAndUpdate({ _id: req.params.id }, { banned: false }, { new: true })
            res.status(200).json(actor);
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}


export { getActors, getMyPersonalData, createActor, updateActor, banActor, unbanActor };