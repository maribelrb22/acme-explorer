import { check } from 'express-validator'
import mongoose from 'mongoose'
import Trip from '../../models/TripModel.js'


const _validateTrip = async (value) => {
  const trip = await Trip.findById(value);

  if (!trip) {
    throw new Error('El trip no existe');
  }

  if (trip.published !== true) {
    throw new Error('El trip no está publicado');
  }

  if (trip.cancel === true  ) {
    throw new Error('El trip ha sido cancelado');
  }

  if (trip.startDate < Date.now()) {
    throw new Error('El trip ya ha comenzado');
  }

  return true;
};


const creationBookingValidator = [
  
  check('comment').optional().isString().withMessage('The comment must be a string').escape(),
  check('trip').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The trip must be a valid mongo id').trim().notEmpty().withMessage('The trip is required').escape().custom(_validateTrip),
  check('explorer').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The explorer must be a valid mongo id').trim().notEmpty().withMessage('The explorer is required').escape(),
  
]






export { creationBookingValidator }