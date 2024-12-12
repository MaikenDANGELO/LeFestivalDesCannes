const express = require("express");
const userController =
    require("../controllers/users.controller");
const userMiddleware =
    require("../middlewares/users.middleware");
var router = express.Router();

router.get("/", userController.home)
/**
 * @swagger
 * /api/users/:
 *   get:
 *     description: Used to know if the user is in the session
 *     tags:
 *       - Users
 *     responses:
 *       '200':
 *         description: A user object associated with the session
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The unique identifier for the user.
 *                 name:
 *                   type: string
 *                   description: The name of the user.
 *                 email:
 *                   type: string
 *                   description: The email address of the user.
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: The date and time when the user was created.
 *       '401':
 *         description: User is not connected (no session available)
 *       '500':
 *         description: Internal server error
 */


router.get("/getAllUser",userController.getUsers);
/**
 * @swagger
 * /api/users/getAllUser:
 *   get:
 *     description: Used to retrieve all users
 *     tags:
 *       - Users
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
 *                   id:
 *                     type: integer
 *                     description: The unique identifier for the user.
 *                   name:
 *                     type: string
 *                     description: The name of the user.
 *                   email:
 *                     type: string
 *                     description: The email address of the user.
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
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - mdp
 *             properties:
 *               login:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: alice.dupont@example.com
 *               mdp:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: user1
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
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - mdp
 *             properties:
 *               login:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: a.dupont@example.com
 *               mdp:
 *                 type: string
 *                 minLength: 8
 *                 maxLength: 45
 *                 example: Userdede1234*
 *               numero:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 11
 *                 example: 1020304050
 *               username:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: DedeCasqueDargent
 *               adresse:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: 70 rue la brouette
 *               codePrest:
 *                 type: integer
 *                 minLength: 1
 *                 maxLength: 10
 *                 example: 497
 *               signUp:
 *                 type: string
 *                 minLength: 1
 *                 maxLength: 45
 *                 example: Prestataire
 *     responses:
 *       '200':
 *         description: Successfully registered user
 *       '400':
 *         description: Bad request - password or codePrestataire invalid
 *       '500':
 *         description: Internal server error
 */


router.post('/sendAvis', userController.sendAvis)
/**
 * @swagger
 * /api/users/sendAvis:
 *   post:
 *     description: Used to send a review (avis) for a service provider (prestataire)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_prestataire
 *               - id_utilisateur
 *               - texte
 *               - note
 *             properties:
 *               id_prestataire:
 *                 type: integer
 *                 description: The ID of the service provider (prestataire)
 *                 example: 1
 *               id_utilisateur:
 *                 type: integer
 *                 description: The ID of the user (utilisateur) submitting the review
 *                 example: 1
 *               texte:
 *                 type: string
 *                 description: The content of the review (text)
 *                 example: "Très bon service, je recommande !"
 *               note:
 *                 type: integer
 *                 description: The rating for the service, typically a number between 1 and 5
 *                 example: 5
 *     responses:
 *       '200':
 *         description: The review has been successfully posted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "L'avis a été publié avec succès"
 *       '400':
 *         description: Bad request (e.g., missing or invalid fields)
 *       '500':
 *         description: Internal server error
 */

router.delete('/deleteAvis', userController.deleteAvis)
/**
 * @swagger
 * /api/users/deleteAvis:
 *   delete:
 *     description: Used to delete an avis (review) by its ID
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The ID of the avis to delete
 *                 example: 2
 *     responses:
 *       '200':
 *         description: Avis has been successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "L'avis a été supprimé avec succès"
 *       '400':
 *         description: Bad request (e.g., missing or invalid ID)
 *       '500':
 *         description: Internal server error
 */


router.put('/modifyAvis', userController.modifyAvis)
/**
 * @swagger
 * /api/users/modifyAvis:
 *   put:
 *     description: Used to modify an existing review (avis) for a service provider (prestataire)
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - texte
 *               - note
 *               - id
 *             properties:
 *               texte:
 *                 type: string
 *                 description: The updated content of the review (text)
 *                 example: "Service de qualité, très satisfait !"
 *               note:
 *                 type: integer
 *                 description: The updated rating for the service, typically a number between 1 and 5
 *                 example: 4
 *               id:
 *                 type: integer
 *                 description: The ID of the review to modify
 *                 example: 2
 *     responses:
 *       '200':
 *         description: The review has been successfully modified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "L'avis a été modifié avec succès"
 *       '400':
 *         description: Bad request (e.g., missing or invalid fields)
 *       '404':
 *         description: Review not found (e.g., the provided review ID does not exist)
 *       '500':
 *         description: Internal server error
 */


module.exports = router;