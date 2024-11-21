const express = require("express");
const userController =
    require("../controllers/users.controller");
const userMiddleware =
    require("../middlewares/users.middleware");
var router = express.Router();

router.get("/",userController.getUsers);
/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: Used to retrieve all users
 *     tags:
 *       - users
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   [Define user properties here, like id, name, etc.]
 *       '500':
 *         description: Internal server error
 */

router.post("/connexion" ,userMiddleware.validateLogin, userController.connexion);
/**
 * @swagger
 * /api/users/connexion:
 *   post:
 *     description: Used to get a specific user by login and password
 *     tags:
 *       - users
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User login
 *         schema:
 *           type: object
 *           required:
 *             - login
 *             - mdp
 *           properties:
 *             login:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: alice.dupont@example.com
 *             mdp:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: user1
 *     responses:
 *       '200':
 *         description: Successfully user found
 *       '400':
 *         description: Bad request - Login or password missing or invalid
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */

router.post("/signup" ,userMiddleware.validateSignUp, userController.signup);
/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     description: Used to register a user
 *     tags:
 *       - users
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User login
 *         schema:
 *           type: object
 *           required:
 *             - login
 *             - mdp
 *           properties:
 *             login:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: a.dupont@example.com
 *             mdp:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: user1
 *             numero:
 *               type: string
 *               minLength: 10
 *               maxLength: 11
 *               example: 1020304050
 *             username:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: DedeCasqueDargent
 *             adresse:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: 70 rue la brouette
 *             codePrest:
 *               type: int
 *               minLength: 1
 *               maxLength: 10
 *               example: 497
 *             signUp:
 *               type: string
 *               minLength: 1
 *               maxLength: 45
 *               example: Prestataire
 *     responses:
 *       '200':
 *         description: Successfully register user
 *       '400':
 *         description: Bad request - password missing or invalid or codePrestataire invalid
 *       '500':
 *         description: Internal server error
 */


module.exports = router;