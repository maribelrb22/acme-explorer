import { check } from 'express-validator';
import ActorModel from '../../models/ActorModel.js';

const _explorerExists = async (value) => {
    const explorers = await ActorModel.find({ _id: value, role: 'EXPLORER' });
    if (explorers.length === 0) {
        throw new Error('The explorer does not exist');
    }
    return true;
};

const _isValidPeriod = (value) => {
    //a valid period is a string with the format Y01-Y02, where Y01 and Y02 are years or M01-M02, where M01 and M02 are months
    const yearRegex = /^Y\d{2}-Y\d{2}$/;
    const monthRegex = /^M\d{2}-M\d{2}$/;
    if (value.startsWith('Y')) {
        if (!yearRegex.test(value)) {
            throw new Error('The period must be a valid period');
        }
    } else if (value.startsWith('M')) {
        if (!monthRegex.test(value)) {
            console.log(value);
            throw new Error('The period must be a valid period');
        }
    } else {
        throw new Error('The period must be a valid period');
    }
    return true;
};

const validOperators = ['equal', 'not equal', 'smaller than', 'greater than', 'smaller than or equal', 'greater than or equal'];
const _isValidOperator = (value) => {
    if (!validOperators.includes(value)) {
        throw new Error('The operator must be a valid operator');
    }
    return true;
};

const pricePerExplorerValidator = [
    check('explorer').exists({ checkNull: true, checkFalsy: true }).isMongoId().withMessage("The explorer must be a valid id").custom(_explorerExists),
    check('period').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The period must be a string").trim().custom(_isValidPeriod).escape(),
]
const explorersInPeriodValidator = [
    check('period').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The period must be a string").trim().custom(_isValidPeriod).escape(),
    check('operator').exists({ checkNull: true, checkFalsy: true }).isString().withMessage("The operator must be a string").trim().custom(_isValidOperator).escape(),
    check('price').exists({ checkNull: true, checkFalsy: true }).isNumeric().withMessage("The price must be a number").trim().escape(),
]

export { pricePerExplorerValidator, explorersInPeriodValidator };