'use strict'

import cron from 'cron'

import DataWareHouseModel from '../models/DataWarehouseModel.js'
import { generateDataWarehouse } from './DataWarehouseGeneratorService.js'

// '0 0 * * * *' una hora
// '*/30 * * * * *' cada 30 segundos
// '*/10 * * * * *' cada 10 segundos
// '* * * * * *' cada segundo
let defaultPeriod = '0 0 * * * *'
let computeDataWareHouseJob

const initDataWarehouseCronJob = () => {
    computeDataWareHouseJob = new cron.CronJob(defaultPeriod, () => {
        console.log('Cron job submitted. Rebuild period: ' + defaultPeriod)
        generateDataWarehouse().then((dataWarehouse) => {
            if (dataWarehouse.tripsPerManagerStats !== undefined &&
                dataWarehouse.applicationsPerTripStats !== undefined &&
                dataWarehouse.tripPriceStats !== undefined &&
                dataWarehouse.statusRatios !== []) {
                const dewDataWarehouse = new DataWareHouseModel(dataWarehouse);
                dewDataWarehouse.save();
            }
        }).catch((err) => {
            console.log(err);
        });
    }, null, true, 'Europe/Madrid')
}

const restartDataWarehouseCronJob = (period) => {
    defaultPeriod = period
    computeDataWareHouseJob.setTime(new cron.CronTime(period))
    computeDataWareHouseJob.start()
}

export { initDataWarehouseCronJob, restartDataWarehouseCronJob }
