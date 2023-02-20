'use strict'

import ActorModel from '../models/ActorModel.js';

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
        const actor = await ActorModel.findOneAndUpdate({ _id: req.params.actorId }, req.body, { new: true })
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
        const actor = await ActorModel.findOne({ _id: req.params.actorId })
        if (actor) {
            if (actor.banned) {
                res.status(400).json({ message: "Actor already banned" });
            }
            await ActorModel.findOneAndUpdate({ _id: req.params.actorId }, { banned: true }, { new: true })
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
        const actor = await ActorModel.findOne({ _id: req.params.actorId })
        if (actor) {
            if (!actor.banned) {
                res.status(400).json({ message: "Actor not banned" });
            }
            await ActorModel.findOneAndUpdate({ _id: req.params.actorId }, { banned: false }, { new: true })
            res.status(200).json(actor);
        } else {
            res.status(404).json({ message: "Actor not found" });
        }
    } catch (err) {
        req.err = err;
        next()
    }
}


export { createActor, updateActor, banActor, unbanActor };