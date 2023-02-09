import { check } from 'express-validator';

const createSponsorshipValidator = [
    check('landingPage').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The landing page must be a string').trim().notEmpty().withMessage('The landing page is required').escape(),
    check('banner').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The banner must be a string').trim().notEmpty().withMessage('The banner is required').escape(),
    check('sponsor').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The sponsor must be a string').trim().notEmpty().withMessage('The sponsor is required').escape(),
    check('trip').exists({ checkNull: true, checkFalsy: true }).isString().withMessage('The trip must be a string').trim().notEmpty().withMessage('The trip is required').escape(),
];

const updateSponsorshipValidator = [
    check('landingPage').optional().isString().withMessage('The landing page must be a string').trim().notEmpty().withMessage('The landing page is required').escape(),
    check('banner').optional().isString().withMessage('The banner must be a string').trim().notEmpty().withMessage('The banner is required').escape(),
    check('sponsor').optional().isString().withMessage('The sponsor must be a string').trim().notEmpty().withMessage('The sponsor is required').escape(),
    check('trip').optional().isString().withMessage('The trip must be a string').trim().notEmpty().withMessage('The trip is required').escape(),
];

export { createSponsorshipValidator, updateSponsorshipValidator };