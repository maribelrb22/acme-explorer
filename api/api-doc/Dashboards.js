/**
 * @swagger
 * components:
 *   schemas:
 *     Dashboard:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tripsPerManagerStats:
 *           type: object
 *           description: Statistics about the number of trips per manager
 *         applicationsPerTripStats:
 *           type: object
 *           description: Statistics about the number of applications per trip
 *         tripPriceStats:
 *           type: object
 *           description: Statistics about the price of the trips
 *         statusRatios:
 *           type: array
 *           items: {}
 *           description: Statistics about the status of the trips
 *         avgFinderPrice:
 *           type: number
 *           description: Average price of the trips
 *         top10FinderKeywords:
 *           type: array
 *           items: {}
 *           description: Top 10 keywords of the trips 
 *         computationMoment:
 *           type: string
 *           format: date-time
 *           description: The moment when the dashboard was computed
 */

/**
 * @swagger
 * /dashboard/last:
 *   get:
 *     summary: Get last indicator
 *     description: This method is used to get last indicator of dashboard. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dashboard'
 *       '500':
 *         description: Internal server error
 * */

/**
 * @swagger
 * /dashboard/total-spent-in-period:
 *   post:
 *     summary: Get total spent in period
 *     description: This method is used to get total spent in a period by an explorer. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *                 description: Period to get the total spent. It can be defined as a month or a year. If it is a month, it could be M01-M07 which means the last 7 months. If it is a year, it could be Y01-Y05 which means the last 5 years.
 *               explorer:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalMoneySpentByExplorer:
 *                   type: number
 * 
 *       '500':
 *         description: Internal server error
 * */

/**
 * @swagger
 * /dashboard/explorers-in-period:
 *   post:
 *     summary: Get explorers in period
 *     description: This method is used to get explorers in a period by establishing a price and an operator. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Dashboard
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               period:
 *                 type: string
 *                 description: Period to get the total spent. It can be defined as a month or a year. If it is a month, it could be M01-M07 which means the last 7 months. If it is a year, it could be Y01-Y05 which means the last 5 years.
 *               price:
 *                 type: number
 *               operator:
 *                 type: string
 *                 description: Operator to compare the price. It can be equal, not equal, greater than, greater than or equal,smaller than or equal, smaller than.
*     responses:
 *       200:
 *         description: The actors were obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       '500':
 *         description: Internal server error
 * */