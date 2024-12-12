const express = require("express");
const prestatairesController =
    require("../controllers/prestataires.controller");

var router = express.Router();


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


module.exports = router;