const express = require("express");
const prestatairesController =
    require("../controllers/prestataires.controller");

var router = express.Router();

router.get('/', prestatairesController.getAllPrestataire)
/**
 * @swagger
 * /api/prestataires/:
 *   get:
 *     description: Retrieves a list of all service providers (prestataires).
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of service providers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       nom:
 *                         type: string
 *                         example: "Jeux et Divertissements"
 *                       description:
 *                         type: string
 *                         example: "Espace dédié aux jeux pour enfants et adultes avec diverses animations, telles que des ateliers créatifs, des jeux de société géants, et des parcours d'obstacles pour toute la famille. C'est l'endroit idéal pour se détendre et s'amuser, que vous soyez enfant ou adulte."
 *                       description_accueil:
 *                         type: string
 *                         example: "Jeux et animations pour tous."
 *                       categorie:
 *                         type: string
 *                         example: "Activité"
 *                       id_emplacement:
 *                         type: integer
 *                         example: 1
 *                       id_evenement:
 *                         type: integer
 *                         example: 1
 *                       page_route:
 *                         type: string
 *                         example: "/prestataire/1"
 *                       image:
 *                         type: string
 *                         example: "jeu_divertissement.jpg"
 *                       id_utilisateur:
 *                         type: integer
 *                         example: 1
 *       '500':
 *         description: Internal server error.
 */

router.get("/getAvis/:id", prestatairesController.getAvis)
/**
 * @swagger
 * /api/prestataires/getAvis/{id}:
 *   get:
 *     description: Used to retrieve reviews (avis) for a specific service provider (prestataire) based on the provided ID in the URL path
 *     tags:
 *       - Prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the service provider (prestataire) to get reviews for
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Successfully retrieved the reviews for the service provider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id_prestataire:
 *                       type: integer
 *                       description: The ID of the service provider
 *                       example: 123
 *                     id_utilisateur:
 *                       type: integer
 *                       description: The ID of the user who gave the review
 *                       example: 456
 *                     texte:
 *                       type: string
 *                       description: The review text
 *                       example: "Excellent service, very satisfied!"
 *                     note:
 *                       type: integer
 *                       description: The rating given by the user (1-5)
 *                       example: 5
 *       '404':
 *         description: Reviews not found for the provided service provider ID
 *       '500':
 *         description: Internal server error
 */

router.post('/sendFormPrestataire', prestatairesController.sendFormPrestataire)


module.exports = router;