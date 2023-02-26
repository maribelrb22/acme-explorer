import { check } from 'express-validator'
import Trip from '../../models/TripModel.js'
import Actor from '../../models/ActorModel.js'

const _validateTrip = async (value) => {
  const trip = await Trip.findById(value);

  if (!trip) {
    throw new Error('The trip does not exist');
  }

  if (trip.published !== true) {
    throw new Error('The trip is not published');
  }

  if (trip.cancel === true  ) {
    throw new Error('The trip is cancelled');
  }

  if (trip.startDate < Date.now()) {
    throw new Error('The trip has already started');
  }
  return true;
};

const _validateExplorer = async (value) => {
  const explorers = await Actor.find({ _id: value, role: 'EXPLORER' });
    if (explorers.length === 0) {
        throw new Error('The explorer does not exist');
    } 
};

const _validateManager = async (value) => {
  const explorers = await Actor.find({ _id: value, role: 'MANAGER' });
    if (explorers.length === 0) {
        throw new Error('The manager does not exist');
    } 
};

const creationBookingValidator = [
  check('comment').optional().isString().withMessage('The comment must be a string').escape(),
  check('trip').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The trip must be a valid mongo id').trim().notEmpty().withMessage('The trip is required').escape().custom(_validateTrip),
  check('explorer').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The explorer must be a valid mongo id').trim().notEmpty().withMessage('The explorer is required').escape().custom(_validateExplorer),
]

const creationRejectValidation = [
  check('rejectReason').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The reject reason must be a string').trim().notEmpty().withMessage('The reject reason is required').escape(),
]

const isExplorerValidator = [
  check('explorerId').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The explorer must be a valid mongo id').trim().notEmpty().withMessage('The explorer is required').escape().custom(_validateExplorer),
];

const isManagerValidator = [
  check('managerId').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The manager must be a valid mongo id').trim().notEmpty().withMessage('The manager is required').escape().custom(_validateManager),
];

export { creationBookingValidator, creationRejectValidation, isExplorerValidator, isManagerValidator }