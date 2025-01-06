const express = require("express");
const prestatairesController =
    require("../controllers/prestataires.controller");
const prestatairesMiddleware = require("../middlewares/prestataires.middleware");
const utilisateurMiddleware = require("../middlewares/users.middleware");

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

router.post('/sendFormPrestataire', utilisateurMiddleware.isLogin, prestatairesMiddleware.alreadyExists, prestatairesController.sendFormPrestataire)
/**
 * @swagger
 * /api/prestataires/sendFormPrestataire:
 *  post:
 *       summary: Envoie un formulaire pour créer un prestataire avec ses services associés.
 *       description: Cette route permet de soumettre les détails d'un prestataire et ses services associés pour enregistrement dans la base de données.
 *       tags:
 *         - Prestataire
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nom:
 *                   type: string
 *                   description: Nom du prestataire.
 *                   example: "Pêche aux canards"
 *                 description:
 *                   type: string
 *                   description: Description complète du prestataire.
 *                   example: "Espace dédié aux jeux pour enfants et adultes avec diverses animations..."
 *                 description_accueil:
 *                   type: string
 *                   description: Courte description pour l'accueil.
 *                   example: "Jeux et animations pour tous."
 *                 categorie:
 *                   type: string
 *                   description: Catégorie du prestataire.
 *                   example: "Activité"
 *                 id_emplacement:
 *                   type: string
 *                   description: Identifiant de l'emplacement associé au prestataire.
 *                   example: "1"
 *                 id_evenement:
 *                   type: string
 *                   description: Identifiant de l'événement associé au prestataire.
 *                   example: "1"
 *                 page_route:
 *                   type: string
 *                   description: Route de la page associée au prestataire.
 *                   example: "/prestataire/1"
 *                 image:
 *                   type: string
 *                   description: Nom du fichier image représentant le prestataire.
 *                   example: "jeu_divertissement.jpg"
 *                 id_utilisateur:
 *                   type: string
 *                   description: Identifiant de l'utilisateur soumis.
 *                   example: "2"
 *                 services:
 *                   type: array
 *                   description: Liste des services associés au prestataire.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_service:
 *                         type: string
 *                         description: Identifiant unique du service.
 *                         example: "1"
 *                       nom_service:
 *                         type: string
 *                         description: Nom du service.
 *                         example: "service1"
 *                       description_service:
 *                         type: string
 *                         description: Description du service.
 *                         example: "description"
 *                       lien_service:
 *                         type: string
 *                         description: Lien du service.
 *                         example: "lien_service1"
 *                       statut_service:
 *                         type: string
 *                         description: Statut du service.
 *                         example: "actif"
 *               required:
 *                 - nom
 *                 - description
 *                 - categorie
 *                 - id_emplacement
 *                 - services
 *       responses:
 *         '200':
 *           description: Prestataire et ses services ont été créés avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     description: Données du prestataire créé.
 *         '400':
 *           description: Un prestataire avec le même nom existe déjà.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Un prestataire avec le même nom existe déjà."
 *         '401':
 *           description: L'utilisateur n'est pas connecté.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Vous n'êtes pas connecté"
 *         '500':
 *           description: Erreur lors de la création du prestataire ou des services associés.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur.
 */


module.exports = router;