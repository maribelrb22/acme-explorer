'use strict'
import express from 'express'

import { FINDER_CACHE_TIME_MS } from '../config/cache.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import cacheResponse from '../middlewares/CacheResponse.js'
import { createFinder, getFinder, updateFinder, deleteFinder, searchTripsWithFinder} from "../controllers/FinderController.js"

const v1 = express.Router();

v1.route('/')
    .post(createFinder, sendErrors)

v1.route('/:explorerId')
    .get(getFinder, sendErrors)
    .delete(deleteFinder, sendErrors)
    .patch(updateFinder, sendErrors)

v1.route('/:explorerId/search')
    .get(cacheResponse(FINDER_CACHE_TIME_MS), searchTripsWithFinder, sendErrors)

const v2 = express.Router();

export const findersV1 = v1;
export const findersV2 = v2;