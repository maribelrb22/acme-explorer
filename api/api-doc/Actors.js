/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterActor:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - email
 *         - password
 *         - role
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the actor.
 *           example: John Doe
 *         surname:
 *           type: string
 *           description: The surname of the actor.
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the actor.
 *           example: john@mail.com
 *         password:
 *           type: string
 *           description: The password of the actor, it must be at least 5 characters long, and it must be at least 5 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character
 *           example: Password123%
 *         role:
 *           type: string
 *           description: The role of the actor.
 *           example: EXPLORER
 *         phone:
 *           type: string
 *           description: The phone of the actor.
 *           example: 123456789
 *         address:
 *           type: string
 *           description: The address of the actor.
 *           example: Calle sa 123
 *     UpdateActor:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the actor.
 *           example: John Doe
 *         surname:
 *           type: string
 *           description: The surname of the actor.
 *           example: Doe
 *         email:
 *           type: string
 *           format: email
 *           description: The email of the actor.
 *           example: john@mail.com
 *         password:
 *           type: string
 *           description: The password of the actor, it must be at least 5 characters long, and it must be at least 5 characters long and must contain at least one uppercase letter, one lowercase letter, one number and one special character.
 *           example: Password123%
 *         role:
 *           type: string
 *           description: The role of the actor.
 *           example: EXPLORER
 *         phone:
 *           type: string
 *           description: The phone of the actor.
 *           example: 123456789
 *         address:
 *           type: string
 *           description: The address of the actor.
 *           example: Calle sa 123
 *     Actor:
 *       allOf:
 *         - $ref: '#/components/schemas/RegisterActor'
 *         - type: object
 *           properties:
 *             _id:
 *               type: string
 *               description: The unique identifier of the actor.
 *               example: 61f7c0a8839b7c3d3f0baea6
 *             banned:
 *               type: boolean
 *               description: Indicates if the actor is banned or not.
 *               example: false
 *
* */

/**
 * @swagger
 * /actors:
 *   get:
 *     summary: Get all actors
 *     description: Retrieve a list of all actors. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
 *     parameters:
 *       - name: X-API-Version
 *         in: header
 *         required: true
 *         type: string
 *         default: v1
 *         enum: 
 *           - v1
 *           - v2
 *     responses:
 *       200:
 *         description: The actors were obtained
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Register an actor
 *     description: This method is used to create an actor, it returns the created actor. Managers can only be created by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
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
 *             $ref: '#/components/schemas/RegisterActor'
 *     responses:
 *       '201':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Actor'
 *       '400':
 *         description: Invalid input
 *       '500':
 *         description: Internal server error
* */

/**
 * @swagger
 * /actors/{id}:
 *   put:
 *     summary: Update an actor
 *     description: This method is used to update an actor by its ID. An actor can only update its own data.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
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
 *         description: ID of the actor to update
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     requestBody:
 *       description: Actor object to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateActor'
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error
* */

/**
 * @swagger
 * /actors/{id}/ban:
 *   patch:
 *     summary: Ban an actor
 *     description: This method is used to ban an actor by its ID. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
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
 *         description: ID of the actor to ban
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error 
* */ 

/**
 * @swagger
 * /actors/{id}/unban:
 *   patch:
 *     summary: Unban an actor
 *     description: This method is used to unban an actor by its ID. It can only be used by administrators.
 *     produces:
 *       - application/json
 *     tags:
 *       - Actor
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
 *         description: ID of the actor to unban
 *         required: true
 *         type: string
 *         example: 5fdecbcc7a68f5468d5b27f4
 *     responses:
 *       200:
 *         description: Successful operation
 *         schema:
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Actor'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Actor not found
 *       500:
 *         description: Internal server error 
* */