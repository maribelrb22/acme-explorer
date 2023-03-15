'use strict'
import express from 'express'

import { pricePerExplorerValidator, explorersInPeriodValidator } from "../controllers/validators/DashboardValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { getLastIndicator, getPriceByExplorer, getExplorers } from "../controllers/DashboardController.js"
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";
import { verifyUser } from "../controllers/AuthController.js";

const v1 = express.Router();
v1.route('/last')
    .get(getLastIndicator)

v1.route("/total-spent-in-period").post(
    pricePerExplorerValidator,
    handleExpressValidation,
    getPriceByExplorer,
    sendErrors);

v1.route("/explorers-in-period").post(
    explorersInPeriodValidator,
    handleExpressValidation,
    getExplorers,
    sendErrors);

export const dashboardV1 = v1;
const v2 = express.Router();

v2.route('/last')
    .get(verifyUser(['ADMIN']), getLastIndicator)

v2.route("/total-spent-in-period").post(
    verifyUser(['ADMIN']),
    pricePerExplorerValidator,
    handleExpressValidation,
    getPriceByExplorer,
    sendErrors);

v2.route("/explorers-in-period").post(
    verifyUser(['ADMIN']),
    explorersInPeriodValidator,
    handleExpressValidation,
    getExplorers,
    sendErrors);
    
export const dashboardV2 = v2;
