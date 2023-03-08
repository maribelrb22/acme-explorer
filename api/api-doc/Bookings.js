/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The id of the booking
 *           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
 *         moment:
 *           type: string
 *           format: date-time
 *           description: The ticker of the trip
 *           example: "2020-12-12T12:12:12Z"
 *         status:
 *           type: string
 *           description: The status of the booking, it must be PENDING, REJECTED, DUE, ACCEPTED, CANCELLED
 *           example: "PENDING"
 *         comment:
 *           type: string
 *           description: The comment for the booking
 *           example: "Trip to the moon"
 *         trip:
 *           type: string
 *           description: The trip
 *           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
 *         explorer:
 *           type: string
 *           description: The explorer of the trip
 *           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
 *         rejectReason:
 *           type: string
 *           description: The reason for the rejection
 *           example: "The explorer is not a good person"
 *     CreateBooking:
 *      type: object
 *      required:
 *        - trip
 *        - explorer
 *      properties:
 *         comment:
 *           type: string
 *           description: The comment for the booking
 *           example: "Trip to the moon"
 *         trip:
 *           type: string
 *           description: The trip
 *           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
 *         explorer:
 *           type: string
 *           description: The explorer of the trip
 *           example: "5f9f1c9b9b9b9b9b9b9b9b9b"
* */

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get bookings of an explorer
 *     description: Get bookings of an explorer. It can only be used by the explorer.
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the explorer
 *     responses:
 *       200:
 *         description: The bookings were obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     description: This method is used by explorers to apply for a trip. It returns the created booking.
 *     produces:
 *       - application/json
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: '#/components/schemas/CreateBooking'
 *     responses:
 *       201:
 *         description: The booking was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */

/**
 * @swagger
 * /bookings/{id}/pay:
 *   patch:
 *     summary: Pay a booking
 *     description: An explorer can use this endpoint for paying a booking after it has been accepted by the manager. It returns the updated booking.
 *     produces:
 *       - application/json
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */

/**
 *  @swagger
 * /bookings/{id}/reject:
 *   patch:
 *     summary: Reject a booking
 *     description: A manager can use this endpoint for rejecting a booking from an explorer. It returns the updated booking.
 *     produces:
 *       - application/json
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rejectReason
 *             properties:
 *               rejectReason:
 *                 type: string
 *                 example: "The booking was rejected because..."
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   patch:
 *     summary: Cancel a booking
 *     description: An explorer can use this endpoint for cancelling a booking. It returns the updated booking.
 *     produces:
 *       - application/json
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */

/**
 * @swagger
 * /bookings/{id}/due:
 *   patch:
 *     summary: Due a booking
 *     description: A manager can use this endpoint for marking a booking as due. It returns the updated booking.
 *     produces:
 *       - application/json
 *     tags:
 *       - Bookings
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum:
 *           - v1
 *           - v2
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the booking
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
* */