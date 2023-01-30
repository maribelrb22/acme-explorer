'use strict'

import ActorModel from '../models/ActorModel.js';

const listActors = async (req, res) => {
    try {
        const actors = await ActorModel.find({});
        res.status(200).json(actors);
    } catch (err) {
        res.status(500).json(err);
    }
}

export {listActors};