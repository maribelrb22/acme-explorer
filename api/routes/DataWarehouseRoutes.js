'use strict'
import express from 'express'

import { getLastIndicator } from "../controllers/DataWarehouseController.js"

const v1 = express.Router();

//Authenticated as ADMIN
v1.route('/last')
    .get(getLastIndicator)

export const dataWarehouseV1 = v1;
