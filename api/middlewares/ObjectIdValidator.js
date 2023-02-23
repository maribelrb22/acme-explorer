import { check } from 'express-validator';

const objectIdValidator = [
    check('id').exists().isMongoId().trim().escape(),
];

export { objectIdValidator };