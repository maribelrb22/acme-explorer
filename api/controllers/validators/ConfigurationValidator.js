import { check } from "express-validator";

const updateValidator = [
    check("flatRate").optional({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The flat rate must be a number")
];

export { updateValidator };