import { check } from "express-validator";

const _validFinderCache = (value) => {
    if (value < (60*60)) {
        throw new Error("The finder cache seconds must be at least 1 hour");
    }
    if (value > (60*60*24)) {
        throw new Error("The finder cache seconds must be at most 1 day");
    }
    return true;
};

const _validSearchLimit = (value) => {
    if (value < 0) {
        throw new Error("The finder search limit must be at least 0");
    }
    if (value > 100) {
        throw new Error("The finder search limit must be at most 100");
    }   
    return true;
};

const updateValidator = [
    check("flatRate").optional({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The flat rate must be a number"),
    check("finderCacheSeconds").optional({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The finder cache seconds must be a number").custom(_validFinderCache),
    check("finderSearchLimit").optional({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The finder search limit must be a number").custom(_validSearchLimit),
];

export { updateValidator };