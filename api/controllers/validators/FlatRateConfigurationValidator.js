import { check } from "express-validator";

const createOrUpdateFlatRateValidator = [
    check("flatRate").optional({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The flat rate must be a number")
];

const objectIdValidator = [
    check("id").exists().isMongoId().trim().escape(),
]
export { createOrUpdateFlatRateValidator, objectIdValidator };