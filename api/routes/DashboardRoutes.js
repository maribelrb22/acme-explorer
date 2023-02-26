'use strict'
import express from 'express'

import { pricePerExplorerValidator, explorersInPeriodValidator } from "../controllers/validators/DashboardValidator.js";
import handleExpressValidation from "../middlewares/ValidationHandlingMiddleware.js";
import { getLastIndicator, getPriceByExplorer, getExplorers } from "../controllers/DashboardController.js"
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";

const v1 = express.Router();

//Authenticated as ADMIN
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
