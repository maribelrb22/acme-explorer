'use strict'
import SponsorshipModel from '../models/SponsorshipModel.js';

const getPaidSponsorship = async (req, res, next) => {
    try {
        const sponsorships = await SponsorshipModel.find({ paid: true })
        res.status(200).json(sponsorships)
    } catch (err) {
        req.err = err;
        next()
    }
}

const createSponsorship = async (req, res, next) => {
    try {
        req.body.paid = false;
        const sponsorship = new SponsorshipModel(req.body)
        await sponsorship.save()
        res.status(201).json(sponsorship)
    } catch (err) {
        req.err = err;
        next()
    }
}

const updateSponsorship = async (req, res, next) => {
    try {
        req.body.paid = false;
        const sponsorship = await SponsorshipModel.findOneAndUpdate({_id: req.params.id}, req.body, { new: true });
        if (sponsorship) {
            res.status(200).json(sponsorship)
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const deleteSponsorship = async (req, res, next) => {
    try {
        const sponsorship = await SponsorshipModel.deleteOne({_id: req.params.id})
        if (sponsorship) {
            res.status(204).json(sponsorship)
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

const paySponsorship = async (req, res, next) => {
    try {
        const sponsorship = await SponsorshipModel.findOneAndUpdate({_id: req.params.id}, { paid: true }, { new: true });
        if (sponsorship) {
            res.status(200).json(sponsorship)
        } else {
            res.status(404).send('Sponsorship not found')
        }
    } catch (err) {
        req.err = err;
        next()
    }
}

export { getPaidSponsorship as getSponsorship, createSponsorship, updateSponsorship, deleteSponsorship, paySponsorship }
