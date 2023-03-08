/**
 * @swagger
 * /configurations:
 *   get:
 *     summary: Get configuration
 *     description: This method is used to get the actual configuration options. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Configuration
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
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 flatRate:
 *                   type: number
 *                 finderCacheSeconds:
 *                   type: number    
 *                 finderSearchLimit:
 *                   type: number
 *       '500':
 *         description: Internal server error
* */

/**
 * @swagger
 * /configurations/{id}:
 *   put:
 *     summary: Update configuration
 *     description: This method is used to update the actual configuration options. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Configuration
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: [v1, v2]
 *       - name: id
 *         in: path
 *         description: Configuration ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               flatRate:
 *                 type: number
 *               finderCacheSeconds:
 *                 type: number
 *               finderSearchLimit:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 flatRate:
 *                   type: number
 *                 finderCacheSeconds:
 *                   type: number
 *                 finderSearchLimit:
 *                   type: number
 *       '404':
 *         description: Configuration not found
 *       '500':
 *         description: Internal server error
 * */