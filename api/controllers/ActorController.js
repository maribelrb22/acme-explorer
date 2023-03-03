'use strict'

import ActorModel from '../models/ActorModel.js';
import admin from 'firebase-admin';
import { getUserId } from './AuthController.js';

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
    try {
        const actor = await ActorModel.findOne({ _id: req.params.id })
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

const updateVerifiedActor = async (req, res, next) => {
    req.body.banned = undefined;
    console.log(req.body)
    ActorModel.findById(req.params.id, async function (err, actor) {
        if (err) {
            res.send(err);
        } else {
            const idToken = req.headers.idtoken;
            const authenticatedUserId = await getUserId(idToken);

            if (authenticatedUserId.toString() === req.params.id.toString()) {
                ActorModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, actor) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.status(200).json(actor);
                    }
                });
            } else {
                res.status(403) // Auth error
                res.send('The Actor is trying to update an Actor that is not himself!')
            }
        }
    });
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

const login = async (req, res, next) => {
    const emailParam = req.body.email
    const password = req.body.password
    let customToken

    ActorModel.findOne({ email: emailParam }, function (err, actor) {
        if (err) { // No actor found with that email as username
            res.send(err)
        } else if (!actor) { // an access token isn’t provided, or is invalid
            res.status(401)
            res.json({ message: 'forbidden', error: err })
        } else if (actor.banned) {
                res.status(403)
                res.json({ message: 'forbidden', error: err })
        } else {
            // Make sure the password is correct
            actor.verifyPassword(password, async function (err, isMatch) {
              if (err) {
                res.send(err)
              } else if (!isMatch) { // Password did not match
                console.log('Password did not match')
                res.status(401) // an access token isn’t provided, or is invalid
                res.json({ message: 'forbidden', error: err })
              } else {
                try {
                  customToken = await admin.auth().createCustomToken(actor.email)
                } catch (error) {
                  console.log('Error creating custom token:', error)
                }
                actor.customToken = customToken
                res.json(actor)
              }
            })
        }
    })
}


export { getActors, getMyPersonalData, createActor, updateActor, updateVerifiedActor, banActor, unbanActor, login };