'use strict'
import express from 'express'

import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import cacheFinderResponse from '../middlewares/CacheResponse.js'
import { createFinder, getFinder, updateFinder, deleteFinder, searchTrips} from "../controllers/FinderController.js"

const v1 = express.Router();

v1.route('/')
    .post(createFinder, sendErrors)

v1.route('/:explorerId')
    .get(getFinder, sendErrors)
    .delete(deleteFinder, sendErrors)
    .patch(updateFinder, sendErrors)

v1.route('/:explorerId/search')
    .get(cacheFinderResponse, searchTrips, sendErrors)

const v2 = express.Router();

export const findersV1 = v1;
export const findersV2 = v2;