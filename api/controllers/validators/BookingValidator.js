import { check } from 'express-validator'

const creationBookingValidator = [
  check('moment').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The date must be in this format 2019-04-11T00:00:00.000+00:00').trim().notEmpty().withMessage('The date is required').escape(),
  check('status').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The status must be a string').trim().notEmpty().withMessage('The status is required').isIn(['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED']).escape(),
  check('coment').optional().isString().withMessage('The coment must be a string'),
  check('trip').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The trip must be a string').trim().notEmpty().withMessage('The trip is required').escape(),
  check('explorer').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The explroer must be a string').trim().notEmpty().withMessage('The explorer is required').escape(),
  
]


const updateBookingValidator = [
    check('moment').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The date must be in this format 2019-04-11T00:00:00.000+00:00').trim().notEmpty().withMessage('The date is required').escape(),
    check('status').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The status must be a string').trim().notEmpty().withMessage('The status is required').isIn(['PENDING', 'REJECTED', 'DUE', 'ACCEPTED', 'CANCELLED']).escape(),
    check('coment').optional().isString().withMessage('The coment must be a string'),
    check('trip').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The trip must be a string').trim().notEmpty().withMessage('The trip is required').escape(),
    check('explorer').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The explroer must be a string').trim().notEmpty().withMessage('The explorer is required').escape(),
    
  ]

export { creationBookingValidator, updateBookingValidator }