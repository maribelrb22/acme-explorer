import { check } from 'express-validator';

/**
 * isStrongPassword set default:
 * {
 *    minLength: 8,
 *    minLowercase: 1,
 *    minUppercase: 1,
 *    minNumbers: 1,
 *    minSymbols: 1,
**/

const creationValidator = [
    check('name').exists({ checkNull: true, checkFalsy: true }).isString().trim().escape(),
    check('surname').exists({ checkNull: true, checkFalsy: true }).isString().trim().escape(),
    check('email').exists({ checkNull: true, checkFalsy: true }).isString().isEmail().trim().escape(),
    check('password').exists({ checkNull: true, checkFalsy: true }).isString().isStrongPassword({ minLength: 5 }).withMessage('Is not a valid password!, it must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    check('role').exists({ checkNull: true, checkFalsy: true }).isString().isIn(['ADMINISTRATOR', 'MANAGER', 'EXPLORER'])
];

export {creationValidator};