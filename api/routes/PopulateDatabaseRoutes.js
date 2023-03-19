'use strict'
import express from 'express'
import { populateDatabase } from '../controllers/PopulateDatabaseController.js'
import sendErrors from '../middlewares/ErrorHandlingMiddleware.js'

const v1 = express.Router();

//This endpoint is only for testing purposes
v1.route('/')
    .post(populateDatabase, sendErrors);

export const populateDatabaseV1 = v1;
