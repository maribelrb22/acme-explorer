'use strict'
import express from 'express'

import { getDashboard } from "../controllers/DashboardController.js"


const v1 = express.Router();

v1.route('/latest').get(getDashboard)

const v2 = express.Router();

export const dashboardsV1 = v1;
export const dashboardsV2 = v2;