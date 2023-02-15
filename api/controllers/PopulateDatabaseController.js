'use strict'
import chance from "chance";
import ActorModel from '../models/ActorModel.js'
import TripModel from '../models/TripModel.js'
import BookingModel from '../models/BookingModel.js'
import SponsorshipModel from '../models/SponsorshipModel.js'
import FlatRateConfigurationModel from '../models/FlatRateConfigurationModel.js'
import dateFormat from 'dateformat';
import { customAlphabet } from 'nanoid';

const sequenceTickerGenerator = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 4);
const chanceGenerator = new chance();

const populateDatabase = async (req, res, next) => {
    // Generate 100 actors
    const generateActors = () => {
        return {
            name: chanceGenerator.first(),
            surname: chanceGenerator.last(),
            email: chanceGenerator.email(),
            phone: chanceGenerator.phone(),
            address: chanceGenerator.address(),
            role: chanceGenerator.pickone(['ADMINISTRATOR', 'MANAGER', 'EXPLORER', 'SPONSOR']),
            password: "Aab1@"
        }
    }
    const actors = [];
    for (let i = 0; i < 100; i++) {
        actors.push(generateActors());
    }
    try {
        await ActorModel.insertMany(actors);
    }
    catch (err) {
        req.err = err;
        next()
    }

    // Generate 100 trips
    const generateTrip = async () => {
        const randomManager = chanceGenerator.pickone(await ActorModel.find({ role: 'MANAGER' }));
        const managerId = randomManager._id.toString();

        return {
          ticker: dateFormat(new Date(), "yymmdd") + '-' + sequenceTickerGenerator(),
          title: chanceGenerator.sentence({ words: 3 }),      
          description: chanceGenerator.paragraph({ sentences: 2 }),
          startDate: chanceGenerator.date({ year: 2023 }),
          endDate: chanceGenerator.date({ year: 2024 }),
          cancel: false,
          cancelReason: undefined,
          requirements: Array(3).fill().map(() => chanceGenerator.sentence({ words: 3 })),
          pictures: Array(3).fill().map(() => chanceGenerator.url({ extensions: ['jpg', 'png'] })),
          stages: Array(3).fill().map(() => ({
                title: chanceGenerator.sentence({ words: 3 }),
                description: chanceGenerator.paragraph({ sentences: 2 }),
                price: chanceGenerator.floating({ min: 0, max: 1000, fixed: 2 })
          })),
          manager: managerId,
          published: chanceGenerator.bool()
        }
    }

    const trips = [];
    for (let i = 0; i < 100; i++) {
        trips.push(await generateTrip());
    }
    try {
        await TripModel.insertMany(trips);
    }
    catch (err) {
        req.err = err;
        next()
    }

    // Generate 100 bookings
    const generateBookings = async () => {
        const randomExplorer = chanceGenerator.pickone(await ActorModel.find({ role: 'EXPLORER' }));
        const explorerId = randomExplorer._id.toString()

        const randomTrip = await TripModel.aggregate([{ $sample: { size: 1 } }]);
        const tripId = randomTrip[0]._id.toString();

        return {
            moment: chanceGenerator.date({ year: 2023 }),
            status: chanceGenerator.pickone(['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED']),
            comments: chanceGenerator.sentence({ words: 3 }),
            explorer: explorerId,
            trip: tripId,
        }
    }

    const bookings = [];
    for (let i = 0; i < 100; i++) {
        bookings.push(await generateBookings());
    }
    try {
        await BookingModel.insertMany(bookings);
    }
    catch (err) {
        req.err = err;
        next()
    }

    // Modifies the trips
    const tripsToModify = await TripModel.find({ published: true, cancel: false })
    for (let i = 0; i < tripsToModify.length; i++) {
        const trip = tripsToModify[i]
        const bookings = await BookingModel.find({ trip: trip._id, status: 'ACCEPTED' })
        if (bookings.length == 0 && trip.startDate > new Date()) {
            trip.cancel = true
            trip.cancelReason = chanceGenerator.sentence()
            await trip.save()
        }
    }

    // Generate 100 sponsorships
    const generateSponsorships = async () => {
        const randomSponsor = chanceGenerator.pickone(await ActorModel.find({ role: 'SPONSOR' }));
        const sponsorId = randomSponsor._id.toString()

        const randomTrip = chanceGenerator.pickone(await TripModel.find());
        const tripId = randomTrip._id.toString();

        return {
            landingPage: chanceGenerator.url(),
            banner: chanceGenerator.url({ extensions: ['jpg', 'png'] }),
            sponsor: sponsorId,
            trip: tripId,
            paid: chanceGenerator.bool()
        }
    }

    const sponsorships = [];
    for (let i = 0; i < 100; i++) {
        sponsorships.push(await generateSponsorships());
    }
    try {
        await SponsorshipModel.insertMany(sponsorships);
    }
    catch (err) {
        req.err = err;
        next()
    }

    // Generate a flat rate configuration
    const flatRateConfiguration = await FlatRateConfigurationModel.findOne();
    if (!flatRateConfiguration) {
        const flatRateConfiguration = new FlatRateConfigurationModel({
            flatRate: 1000
        });
        try {
            await flatRateConfiguration.save();
        }
        catch (err) {
            req.err = err;
            next()
        }
    }

    res.status(200).json({ message: 'Database populated' });
}

export { populateDatabase };