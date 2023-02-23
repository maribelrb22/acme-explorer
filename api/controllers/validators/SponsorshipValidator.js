import { check } from 'express-validator';
import ActorModel from '../../models/ActorModel.js';
import TripModel from '../../models/TripModel.js'

const _checkActorExists = async (value) => {
    const actors = await ActorModel.find({ _id: value, role: 'SPONSOR' });
    if (actors.length === 0) {
        throw new Error('The actor does not exist');
    }
};

const _checkTripExists = async (value) => {
    const trips = await TripModel.find({ _id: value});
    if (trips.length === 0) {
        throw new Error('The trip does not exist');
    }
};

const createSponsorshipValidator = [
    check('landingPage').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The landing page must be a string').trim().notEmpty().withMessage('The landing page is required').escape(),
    check('banner').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The banner must be a string').trim().notEmpty().withMessage('The banner is required').escape(),
    check('sponsor').exists({ checkNull: true, checkFalsy: true }).isMongoId().custom(_checkActorExists).trim().escape(),
    check('trip').exists({ checkNull: true, checkFalsy: true }).isMongoId().custom(_checkTripExists).trim().escape(),
]

const updateSponsorshipValidator = [
    check('landingPage').optional().isString().withMessage('The landing page must be a string').trim().notEmpty().withMessage('The landing page is required').escape(),
    check('banner').optional().isString().withMessage('The banner must be a string').trim().notEmpty().withMessage('The banner is required').escape(),
    check('sponsor').optional().isMongoId().custom(_checkActorExists).trim().escape(),
    check('trip').optional().isMongoId().custom(_checkTripExists).trim().escape(),
];

export { createSponsorshipValidator, updateSponsorshipValidator };