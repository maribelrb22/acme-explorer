import { check } from 'express-validator';

const _checkPrice = (value) => {
    if (value < 0) {
        throw new Error('The price must be greater than or equal to 0');
    }
    return true;
};

const cancelTripValidator = [
    check('cancelReason').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The cancel reason must be a string').trim().notEmpty().withMessage('The cancel reason is required').escape(),
];

const createTripValidator = [
    check('title').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The title must be a string').trim().notEmpty().withMessage('The title is required').escape(),
    check('description').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The description must be a string').trim().notEmpty().withMessage('The description is required').escape(),
    check('startDate').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The start date must be a string').trim().notEmpty().withMessage('The start date is required').escape(),
    check('endDate').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The end date must be a string').trim().notEmpty().withMessage('The end date is required').escape(),
    check('requirements').exists({ checkNull: true, checkFalsy: true }).withMessage('The requirements are required').isArray().withMessage('The requirements must be an array'),
    check('manager').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The manager must be a string').trim().notEmpty().withMessage('The manager is required').escape(),
    check('stages').exists({ checkNull: true, checkFalsy: true }).withMessage('The stages are required').isArray().withMessage('The stages must be an array'),
    check('stages.*.title').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The title must be a string').trim().notEmpty().withMessage('The title is required').escape(),
    check('stages.*.description').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The description must be a string').trim().notEmpty().withMessage('The description is required').escape(),
    check('stages.*.price').exists({ checkNull: true, checkFalsy: true }).isNumeric().withMessage('The price must be a number').custom(_checkPrice).notEmpty().withMessage('The price is required')
];

const updateTripValidator = [
    check('title').optional().isString().withMessage('The title must be a string').trim().notEmpty().withMessage('The title is required').escape(),
    check('description').optional().isString().withMessage('The description must be a string').trim().notEmpty().withMessage('The description is required').escape(),
    check('startDate').optional().isString().withMessage('The start date must be a string').trim().notEmpty().withMessage('The start date is required').escape(),
    check('endDate').optional().isString().withMessage('The end date must be a string').trim().notEmpty().withMessage('The end date is required').escape(),
    check('requirements').optional().isArray().withMessage('The requirements must be an array').notEmpty().withMessage('The requirements are required'),
    check('manager').optional().isString().withMessage('The manager id must be a string').trim().notEmpty().withMessage('The manager id is required').escape(),
    check('stages').optional().isArray().withMessage('The stages must be an array').notEmpty().withMessage('The stages are required'),
    check('stages.*.title').exists().isString().withMessage('The title must be a string').trim().notEmpty().withMessage('The title is required').escape(),
    check('stages.*.description').exists().isString().withMessage('The description must be a string').trim().notEmpty().withMessage('The description is required').escape(),
    check('stages.*.price').exists().isNumeric().withMessage('The price must be a number').trim().notEmpty().withMessage('The price is required').escape(),
];

export { cancelTripValidator, createTripValidator, updateTripValidator };