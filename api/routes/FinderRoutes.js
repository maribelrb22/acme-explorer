'use strict'
import express from 'express'

import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'
import { createFinder, getFinder, updateFinder, deleteFinder } from "../controllers/FinderController.js"

const v1 = express.Router();

v1.route('/')
    .post(createFinder, sendErrors)

v1.route('/:explorerId')
    .get(getFinder, sendErrors)
    .delete(deleteFinder, sendErrors)
    .patch(updateFinder, sendErrors)

const v2 = express.Router();

export const findersV1 = v1;
export const findersV2 = v2;