'use strict'
import express from 'express'
import sendErrors from "../middlewares/ErrorHandlingMiddleware.js";
import { getPriceByExplorer, getExplorers } from "../controllers/CubeController.js";

const v1 = express.Router();

v1.route("/price").post(
    getPriceByExplorer,
    sendErrors);

v1.route("/explorers").post(
    getExplorers,
    sendErrors);

export const cubeV1 = v1;