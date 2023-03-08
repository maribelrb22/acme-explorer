/**
 * @swagger
 * components:
 *   schemas:
 *    CreateTrip:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - startDate
 *         - endDate
 *         - stages
 *         - manager
 *         - stages
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the trip.
 *           example: Trip to the moon
 *         description:
 *           type: string
 *           description: The description of the trip.
 *           example: Trip to the moon
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the trip.
 *           example: 2020-01-01
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the trip.
 *           example: 2020-01-01
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           description: The requirements of the trip.
 *           example: ["Be able to swim", "Be able to fly"]
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *           description: The pictures of the trip.
 *           example: ["https://www.google.com", "https://www.google.com"]
 *         stages:
 *           type: array
 *           description: The stages of the trip
 *           items:
*              type: object
*              properties:
*                title:
*                  type: string
*                  description: The title of the stage
*                  example: "Stage 1"
*                description:
*                  type: string
*                  description: The description of the stage
*                  example: "Stage 1 description"
*                price:
*                  type: number
*                  description: The price of the stage
*                  example: 100
*         manager:
*           type: string
*           description: The manager of the trip.
*           example: 5e6c1c2e2b6f2b0c7c6a1f6d
* */

/**
 * @swagger
 * components:
 *   schemas:
 *    UpdateTrip:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the trip.
 *           example: Trip to the moon
 *         description:
 *           type: string
 *           description: The description of the trip.
 *           example: Trip to the moon
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the trip.
 *           example: 2020-01-01
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the trip.
 *           example: 2020-01-01
 *         requirements:
 *           type: array
 *           items:
 *             type: string
 *           description: The requirements of the trip.
 *           example: ["Be able to swim", "Be able to fly"]
 *         pictures:
 *           type: array
 *           items:
 *             type: string
 *           description: The pictures of the trip.
 *           example: ["https://www.google.com", "https://www.google.com"]
 *         stages:
 *           type: array
 *           description: The stages of the trip
 *           items:
*              type: object
*              properties:
*                title:
*                  type: string
*                  description: The title of the stage
*                  example: "Stage 1"
*                description:
*                  type: string
*                  description: The description of the stage
*                  example: "Stage 1 description"
*                price:
*                  type: number
*                  description: The price of the stage
*                  example: 100
*         manager:
*           type: string
*           description: The manager of the trip.
*           example: 5e6c1c2e2b6f2b0c7c6a1f6d
* */

/**
* @swagger
* components:
*  schemas:
*     Sponsorship:
*       type: object
*       properties:
*         sponsor:
*           type: string
*           description: The ID of the sponsor.
*           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
*         landingPage:
*           type: string
*           description: The landing page of the sponsorship.
*           example: "https://www.google.com"
*         banner:
*           type: string
*           description: The banner of the sponsorship.
*           example: "https://www.google.com/banner.png"
*         paid:
*           type: boolean
*           description: The paid status of the sponsorship.
*           example: false
*
*     Trip:
*       type: object
*       properties:
*         _id:
*           type: string
*           description: The ID of the trip.
*           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
*         ticker:
*           type: string
*           description: The ticker of the trip.
*           example: "ABCD"
*         title:
*           type: string
*           description: The title of the trip.
*           example: "Trip to the moon"
*         description:
*           type: string
*           description: The description of the trip.
*           example: "This is a trip to the moon"
*         startDate:
*           type: string
*           format: date
*           description: The start date of the trip.
*           example: "2020-01-01"
*         endDate:
*           type: string
*           format: date
*           description: The end date of the trip.
*           example: "2020-01-01"
*         requirements:
*           type: array
*           items:
*             type: string
*           description: The requirements of the trip.
*           example: ["Be able to swim", "Be able to fly"]
*         pictures:
*           type: array
*           items:
*             type: string
*             description: The pictures of the trip.
*             example: ["https://www.google.com", "https://www.google.com"]
*         stages:
*           type: array
*           description: The stages of the trip.
*           items:
*              type: object
*              properties:
*                title:
*                  type: string
*                  description: The title of the stage.
*                  example: "Stage 1"
*                description:
*                  type: string
*                  description: The description of the stage.
*                  example: "This is the first stage of the trip"
*                price:
*                  type: number
*                  description: The price of the stage.
*                  example: 100
*         sponsorships:
*           type: array
*           description: The sponsorships of the trip.
*           items:
*              $ref: '#/components/schemas/Sponsorship'
*         manager:
*           type: string
*           description: The manager of the trip.
*           example: "5e6c1c2e2b6f2b0c7c6a1f6d"
*         published:
*           type: boolean
*           description: The published status of the trip.
*           example: true
*         cancel:
*           type: boolean
*           description: The
*           example: false
*         cancelReason:
*           type: string
*           description: The reason of the cancellation of the trip.
*           example: "The trip was cancelled due to the COVID-19 pandemic"
*     TripList:
*       type: object
*       properties:
*         _id:
*           type: string
*           description: The ID of the trip.
*           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
*         ticker:
*           type: string
*           description: The ticker of the trip.
*           example: "ABCD"
*         title:
*           type: string
*           description: The title of the trip.
*           example: "Trip to the moon"
*         description:
*           type: string
*           description: The description of the trip.
*           example: "This is a trip to the moon"
*         startDate:
*           type: string
*           format: date
*           description: The start date of the trip.
*           example: "2020-01-01"
*         endDate:
*           type: string
*           format: date
*           description: The end date of the trip.
*           example: "2020-01-01"
*         requirements:
*           type: array
*           items:
*             type: string
*           description: The requirements of the trip.
*           example: ["Be able to swim", "Be able to fly"]
*         pictures:
*           type: array
*           items:
*             type: string
*             description: The pictures of the trip.
*             example: ["https://www.google.com", "https://www.google.com"]
*         stages:
*           type: array
*           description: The stages of the trip.
*           items:
*              type: object
*              properties:
*                title:
*                  type: string
*                  description: The title of the stage.
*                  example: "Stage 1"
*                description:
*                  type: string
*                  description: The description of the stage.
*                  example: "This is the first stage of the trip"
*                price:
*                  type: number
*                  description: The price of the stage.
*                  example: 100
*         sponsorships:
*           type: object
*           description: The sponsorships of the trip.
*           items:
*              $ref: '#/components/schemas/Sponsorship'
*         manager:
*           type: string
*           description: The manager of the trip.
*           example: "5e6c1c2e2b6f2b0c7c6a1f6d"
*         published:
*           type: boolean
*           description: The published status of the trip.
*           example: true
*         cancel:
*           type: boolean
*           description: The
*           example: false
*         cancelReason:
*           type: string
*           description: The reason of the cancellation of the trip.
*           example: "The trip was cancelled due to the COVID-19 pandemic"
*         price:
*           type: number
*           description: The price of the trip.
*           example: 100
*     TripComplete:
*       type: object
*       properties:
*         _id:
*           type: string
*           description: The ID of the trip.
*           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
*         ticker:
*           type: string
*           description: The ticker of the trip.
*           example: "ABCD"
*         title:
*           type: string
*           description: The title of the trip.
*           example: "Trip to the moon"
*         description:
*           type: string
*           description: The description of the trip.
*           example: "This is a trip to the moon"
*         startDate:
*           type: string
*           format: date
*           description: The start date of the trip.
*           example: "2020-01-01"
*         endDate:
*           type: string
*           format: date
*           description: The end date of the trip.
*           example: "2020-01-01"
*         requirements:
*           type: array
*           items:
*             type: string
*           description: The requirements of the trip.
*           example: ["Be able to swim", "Be able to fly"]
*         pictures:
*           type: array
*           items:
*             type: string
*             description: The pictures of the trip.
*             example: ["https://www.google.com", "https://www.google.com"]
*         stages:
*           type: array
*           description: The stages of the trip.
*           items:
*              type: object
*              properties:
*                title:
*                  type: string
*                  description: The title of the stage.
*                  example: "Stage 1"
*                description:
*                  type: string
*                  description: The description of the stage.
*                  example: "This is the first stage of the trip"
*                price:
*                  type: number
*                  description: The price of the stage.
*                  example: 100
*         sponsorships:
*           type: object
*           description: The sponsorships of the trip.
*           items:
*              $ref: '#/components/schemas/Sponsorship'
*         manager:
*           type: string
*           description: The manager of the trip.
*           example: "5e6c1c2e2b6f2b0c7c6a1f6d"
*         published:
*           type: boolean
*           description: The published status of the trip.
*           example: true
*         cancel:
*           type: boolean
*           description: The cancellation status of the trip.
*           example: false
*         cancelReason:
*           type: string
*           description: The reason of the cancellation of the trip.
*           example: "The trip was cancelled due to the COVID-19 pandemic"
*         price:
*           type: number
*           description: The price of the trip.
*           example: 100
*         bookings:
*           type: array
*           description: The bookings of the trip.
*           items:
*              $ref: '#/components/schemas/Booking'
* */

/**
 * @swagger
 * /trips:
 *   get:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *     description: Returns all trips that are published, not cancelled and not expired. For each trip, a random paid sponsorship is returned. It can be used either by authenticated or not authenticated users.
 *     summary: Returns all trips
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripList'
 *       500:
 *         description: Internal Server Error
 *   post:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *     description: Creates a new trip. It can be used by authenticated users with MANAGER role.
 *     summary: Creates a new trip
 *     produces:
 *       - application/json
 *     requestBody:
 *       description: The trip to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTrip'
 *     responses:
 *       201:
 *         description: The trip was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */


/**
 * @swagger
 * /trips/me/{id}:
 *   get:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the manager
 *     description: Returns all trips of a manager. It can be used only by manager.
 *     summary: Returns all trips of a manager
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trip'
 *       500:
 *         description: Internal Server Error
 */


/**
 * @swagger
 *  /trips/search:
 *   get:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: keyword
 *         in: query
 *         required: false
 *         type: string
 *         description: The keyword to search
 *       - name: minPrice
 *         in: query
 *         required: false
 *         type: integer
 *         description: The minimum price to search
 *       - name: maxPrice
 *         in: query
 *         required: false
 *         type: integer
 *         description: The maximum price to search
 *       - name: minDate
 *         in: query
 *         required: false
 *         type: string
 *         format: date
 *         description: The minimum date to search
 *       - name: maxDate
 *         in: query
 *         required: false
 *         type: string
 *         format: date
 *         description: The maximum date to search 
 *     description: Returns all matching trips. It should be used by non authenticated users.
 *     summary: Returns all matching trips
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripList'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */
/**
 * @swagger
 *  /trips/search/{explorerId}:
 *   get:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: explorerId
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the explorer who is searching
 *       - name: keyword
 *         in: query
 *         required: false
 *         type: string
 *         description: The keyword to search
 *       - name: minPrice
 *         in: query
 *         required: false
 *         type: integer
 *         description: The minimum price to search
 *       - name: maxPrice
 *         in: query
 *         required: false
 *         type: integer
 *         description: The maximum price to search
 *       - name: minDate
 *         in: query
 *         required: false
 *         type: string
 *         format: date
 *         description: The minimum date to search
 *       - name: maxDate
 *         in: query
 *         required: false
 *         type: string
 *         format: date
 *         description: The maximum date to search 
 *     description: Returns all matching trips. It should be used by authenticated users and the response will be cached.
 *     summary: Returns all matching trips
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The list of trips
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TripList'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */


/**
 * @swagger
 * /trips/{id}:
 *   get:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the trip
 *     description: Returns the trip with the given id
 *     summary: Returns the trip with the given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripComplete'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
*   put:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the trip
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateTrip'
 *     description: Updates the trip with the given id. It can be used only by the manager.
 *     summary: Updates the trip with the given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 *   delete:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the trip
 *     description: Deletes the trip with the given id. It can be used only by the manager.
 *     summary: Deletes the trip with the given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
* */

/** 
 * @swagger
 *  /trips/{id}/cancel:
 *   patch:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the trip
 *     description: Cancels the trip with the given id. It can be used only by the manager.
 *     summary: Cancels the trip with the given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
* */

/**
 * @swagger
 * /trips/{id}/publish:
 *   patch:
 *     tags:
 *       - Trips
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2 
 *       - name: id 
 *         in: path
 *         required: true
 *         type: string
 *         description: The id of the trip
 *     description: Publishes the trip with the given id. It can be used only by the manager.
 *     summary: Publishes the trip with the given id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
* */