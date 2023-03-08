/**
 * @swagger
 * /sponsorships:
 *   post:
 *     tags:
 *       - Sponsorships
 *     summary: Create a sponsorship
 *     description: Create a sponsorship. It can only be used by sponsors.
 *     produces:
 *       - application/json
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
 *             required:
 *               - sponsor
 *               - trip
 *               - landingPage
 *               - banner
 *             properties:
 *               sponsor:
 *                 type: string
 *               trip:
 *                 type: string
 *               landingPage:
 *                 type: string
 *               banner:
 *                 type: string
 *             example:
 *               sponsor: 5e9f1c8e3b0e2d2f2c5f5b8c
 *               trip: 5e9f1c8e3b0e2d2f2c5f5b8c
 *               landingPage: 5e9f1c8e3b0e2d2f2c5f5b8c
 *               banner: 5e9f1c8e3b0e2d2f2c5f5b8c
 *     responses:
 *       201:
 *         description: The sponsorship was created in the trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Trip not found
 *       500:
 *         description: Internal server error
* */

/**
 * @swagger
 * /sponsorships/{id}:
 *   get:
 *     tags:
 *       - Sponsorships
 *     summary: Get a sponsorship
 *     description: Get a sponsorship. It can only be used by sponsors and return each trip that the sponsor has sponsored.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *       - name: id
 *         description: Sponsor id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: All trips sponsored by the sponsor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TripList'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Sponsorship not found
 *       500:
 *         description: Internal server error
 *   put:
 *     tags:
 *       - Sponsorships
 *     summary: Update a sponsorship
 *     description: Update a sponsorship. It can only be used by sponsors.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *       - name: id
 *         description: Sponsorship id
 *         in: path
 *         required: true
 *         type: string 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               landingPage:
 *                 type: string
 *               banner:
 *                 type: string
 *             example:
 *               landingPage: 5e9f1c8e3b0e2d2f2c5f5b8c
 *               banner: 5e9f1c8e3b0e2d2f2c5f5b8c
 *     responses:
 *       200:
 *         description: The sponsorship was updated in the trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Sponsorship not found
 *       500:
 *         description: Internal server error
 *   delete:
 *     tags:
 *       - Sponsorships
 *     summary: Delete a sponsorship
 *     description: Delete a sponsorship. It can only be used by sponsors.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *       - name: id
 *         description: Sponsorship id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: The sponsorship was deleted in the trip
 *       400:
 *         description: Bad request
 *       404:
 *         description: Sponsorship not found
 *       500:
 *         description: Internal server error
 *   patch:
 *     tags:
 *       - Sponsorships
 *     summary: Pay a sponsorship
 *     description: Pay a sponsorship. It can only be used by sponsors.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *       - name: id
 *         description: Sponsorship id
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: The sponsorship was paid in the trip
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trip'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Sponsorship not found
 *       500:
 *         description: Internal server error
* */