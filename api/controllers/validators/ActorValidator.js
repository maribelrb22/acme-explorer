import { check } from 'express-validator';

const creationValidator = [
    check('name').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The name must be a string").trim().notEmpty().withMessage("The name is required").escape(),
    check('surname').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The surname must be a string").trim().notEmpty().withMessage("The surname is required"),
    check('email').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The email must be a string").isEmail().withMessage("The email must be a valid email").trim().notEmpty().withMessage("The email is required").escape(),
    check('password').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The password must be a string").isStrongPassword({ minLength: 5 }).withMessage('Is not a valid password!, it must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    check('role').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The role must be a string").trim().notEmpty().withMessage("The role is required").isIn(['ADMINISTRATOR', 'MANAGER', 'EXPLORER','SPONSOR']).withMessage("The role must be a valid role").escape(),

];

const putValidator = [
    check('actorId').exists().isMongoId().trim().escape(),
    check('name').optional().isString().withMessage("The name must be a string").trim().notEmpty().withMessage("If you want to update the name, you must enter a value").escape(),
    check('surname').optional().isString().withMessage("The surname must be a string").trim().notEmpty().withMessage("If you want to update the surname, you must enter a value").escape(),
    check('email').optional().isString().withMessage("The email must be a string").isEmail().withMessage("The email must be a valid email").trim().notEmpty().withMessage("If you want to update the email, you must enter a value").escape(),
    check('password').optional().isString().withMessage("The password must be a string").isStrongPassword({ minLength: 5 }).withMessage('Is not a valid password!, it must be at least 5 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character'),
    check('role').optional().isString().withMessage("The role must be a string").trim().notEmpty().withMessage("If you want to update the role, you must enter a value").isIn(['ADMINISTRATOR', 'MANAGER', 'EXPLORER','SPONSOR']).withMessage("The role must be a valid role").escape()
];

export { creationValidator, putValidator };