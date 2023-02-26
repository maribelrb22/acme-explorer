'use strict'
import chance from "chance";
import ActorModel from '../models/ActorModel.js'
import TripModel from '../models/TripModel.js'
import BookingModel from '../models/BookingModel.js'
import ConfigurationModel from '../models/ConfigurationModel.js'
import FinderModel from '../models/FinderModel.js'
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
        const randomManager = await ActorModel.aggregate([{ $match: { role: 'MANAGER' } }, { $sample: { size: 1 } }]);
        const managerId = randomManager[0]._id.toString();

        const randomSponsor = await ActorModel.aggregate([{ $match: { role: 'SPONSOR' } }, { $sample: { size: 1 } }]);
        const sponsorId = randomSponsor[0]._id.toString();

        return {
          ticker: '220101-' + sequenceTickerGenerator(),
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
          published: chanceGenerator.bool(),
          sponsorships: Array(3).fill().map(() => ({
                banner: chanceGenerator.url({ extensions: ['jpg', 'png'] }),
                landingPage: chanceGenerator.url(),
                paid: chanceGenerator.bool(),
                sponsor: sponsorId
            }))  
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
        const randomExplorer = await ActorModel.aggregate([{ $match: { role: 'EXPLORER' } }, { $sample: { size: 1 } }]);
        const explorerId = randomExplorer[0]._id.toString()

        const randomTrip = await TripModel.aggregate([{ $sample: { size: 1 } }]);
        const tripId = randomTrip[0]._id.toString();

        const status = chanceGenerator.pickone(['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED']);

        return {
            moment: chanceGenerator.date({ year: 2022, month: 0 }),
            status: status,
            comments: chanceGenerator.sentence({ words: 10 }),
            rejectReason: status == 'REJECTED' ? chanceGenerator.sentence({ words: 10 }) : undefined,
            paid: status == 'ACCEPTED' ? chanceGenerator.date({ year: 2022, month: 3 }) : status == 'CANCELLED' ? chanceGenerator.date({ year: 2022, month: 6 }) : undefined,
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
    const tripsToModify =  await TripModel.find({ published: true, cancel: false })
    for (let i = 0; i < tripsToModify.length; i++) {
        const trip = tripsToModify[i]
        const bookings = await BookingModel.find({ trip: trip._id, status: 'ACCEPTED' })
        if (bookings.length == 0 && trip.startDate > new Date()) {
            trip.cancel = true
            trip.cancelReason = chanceGenerator.sentence()
            await TripModel.updateOne({ _id: trip._id }, trip)
        }
    }

    // Generate a configuration
    const configuration = await ConfigurationModel.findOne();
    if (!configuration) {
        const newConfiguration = new ConfigurationModel({
            flatRate: 1000,
            finderCacheSeconds: 60 * 70,
            finderSearchLimit: 10,
        });
        try {
            await newConfiguration.save();
        }
        catch (err) {
            req.err = err;
            next()
        }
    }

    res.status(200).json({ message: 'Database populated' });
}

export { populateDatabase };
