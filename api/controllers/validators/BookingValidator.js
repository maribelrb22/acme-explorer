import { check } from 'express-validator'

const creationBookingValidator = [
  
  check('comment').optional().isString().withMessage('The comment must be a string').escape(),
  check('trip').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The trip must be a valid mongo id').trim().notEmpty().withMessage('The trip is required').escape(),
  check('explorer').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage('The explorer must be a valid mongo id').trim().notEmpty().withMessage('The explorer is required').escape(),
  
]

export { creationBookingValidator }