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

router.get("/getAllBalades", prestatairesController.getAllBalades)
/**
 * @swagger
 * /api/prestataires/getAllBalades:
 *   get:
 *     description: Retrieves a list of all balade type reservations.
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of balade type reservations.
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
 *                       id_prestataire:
 *                         type: integer
 *                         example: 1
 *                       date:
 *                         type: string
 *                         format: date
 *                         example: "2023-10-10"
 *                       heure:
 *                         type: string
 *                         format: time
 *                         example: "14:00:00"
 *                       type_service:
 *                         type: string
 *                         example: "balade"
 *                       reserved_user_id:
 *                         type: integer
 *                         example: 1
 *       '500':
 *         description: Internal server error.
 */

router.get("/getbaladesfromUid", utilisateurMiddleware.isLogin, prestatairesController.getbaladesfromUid)
/**
 * @swagger
 * /api/prestataires/getbaladesfromUid:
 *  get:
 *       summary: Obtenir les balades d'un utilisateur
 *       description: Récupère toutes les balades réservées pour un utilisateur connecté.
 *       tags:
 *         - Prestataires
 *       responses:
 *         '200':
 *           description: Liste des balades récupérée avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Reservation'
 *         '401':
 *           description: Utilisateur non connecté.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Vous n'êtes pas connecté
 *         '500':
 *           description: Erreur serveur interne.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: Erreur lors de la récupération des balades.
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 *   schemas:
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID unique de la réservation.
 *         id_prestataire:
 *           type: integer
 *           description: ID du prestataire associé à cette réservation.
 *         date:
 *           type: string
 *           format: date
 *           description: Date de la réservation.
 *         heure:
 *           type: string
 *           format: time
 *           description: Heure de la réservation.
 *         type_service:
 *           type: string
 *           description: Type de service réservé (balade ou restaurant).
 *           enum:
 *             - balade
 *             - restaurant
 *         reserved_user_id:
 *           type: integer
 *           description: ID de l'utilisateur ayant réservé.
 *       required:
 *         - id
 *         - id_prestataire
 *         - date
 *         - heure
 *         - type_service
 *       example:
 *         id: 1
 *         id_prestataire: 10
 *         date: "2025-01-10"
 *         heure: "14:00:00"
 *         type_service: "balade"
 *         reserved_user_id: 5
 */

router.get("/getTotalDonsOf/:id", prestatairesController.getTotalDonsOf)
/**
 * @swagger
 * /api/prestataires/getTotalDonsOf/{id}:
 *  get:
 *       summary: Récupère le total des dons pour un prestataire donné
 *       description: Cette route retourne le total des dons effectués pour un prestataire spécifié par son id.
 *       tags:
 *         - Prestataires
 *       parameters:
 *         - name: id
 *           in: path
 *           description: L'ID du prestataire pour lequel on souhaite obtenir le total des dons.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Succès - Le total des dons est renvoyé dans la réponse.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: number
 *                     description: Le total des dons effectués pour ce prestataire.
 *                     example: 1500.50
 *         '500':
 *           description: Erreur interne du serveur. Cela peut se produire si une erreur se produit lors du calcul du total des dons.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description de l'erreur.
 *                     example: "Erreur lors du calcul du total des dons"
 *         '400':
 *           description: Mauvaise requête - L'ID du prestataire n'est pas valide.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description de l'erreur.
 *                     example: "ID invalide"
 */


router.get("/getAllAvis",prestatairesController.getAllAvis)
/**
 * @swagger
 * /api/prestataires/getAllAvis:
 *   get:
 *     description: Used to retrieve all reviews (avis) for all service providers (prestataires)
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Successfully retrieved all reviews for all service providers
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
 *                       id_prestataire:
 *                         type: integer
 *                         description: The ID of the service provider
 *                         example: 123
 *                       id_utilisateur:
 *                         type: integer
 *                         description: The ID of the user who gave the review
 *                         example: 456
 *                       texte:
 *                         type: string
 *                         description: The review text
 *                         example: "Excellent service, very satisfied!"
 *                       note:
 *                         type: integer
 *                         description: The rating given by the user (1-5)
 *                         example: 5
 *       '404':
 *         description: Reviews not found for any service provider
 *       '500':
 *         description: Internal server error
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
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 */


router.post('/sendFormPrestataire', utilisateurMiddleware.isLogin, prestatairesMiddleware.alreadyExists, prestatairesController.sendFormPrestataire)
/**
 * @swagger
 * /api/prestataires/sendFormPrestataire:
 *  post:
 *       summary: Envoie un formulaire pour créer un prestataire avec ses services associés.
 *       description: Cette route permet de soumettre les détails d'un prestataire et ses services associés pour enregistrement dans la base de données.
 *       tags:
 *         - Prestataires
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
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 */

router.post("/makeDonation/:prestId", utilisateurMiddleware.isLogin, prestatairesController.makeDonation)
/**
 * @swagger
 * /api/prestataires/makeDonation/{prestId}:
 *  post:
 *       summary: Enregistrer un don pour un prestataire donné
 *       description: Cette route permet à un utilisateur de faire un don à un prestataire spécifique. L'utilisateur doit être connecté et fournir le montant et un message pour la donation.
 *       tags:
 *         - Prestataires
 *       parameters:
 *         - name: prestId
 *           in: path
 *           description: L'ID du prestataire à qui l'utilisateur souhaite faire un don.
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         description: Les informations concernant le don, y compris le montant et le message de l'utilisateur.
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 amount:
 *                   type: number
 *                   format: float
 *                   description: Le montant du don.
 *                   example: 100.50
 *                 message:
 *                   type: string
 *                   description: Un message optionnel associé au don.
 *                   example: "Merci pour votre service !"
 *       responses:
 *         '200':
 *           description: Succès - Le don a été enregistré avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     description: Message de confirmation du don.
 *                     example: "Donation enregistrée avec succès"
 *         '400':
 *           description: Mauvaise requête - Le montant du don est requis.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     description: Message d'erreur concernant la requête.
 *                     example: "Le montant du don est requis"
 *         '500':
 *           description: Erreur interne du serveur - Une erreur est survenue lors de l'enregistrement du don.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Description de l'erreur.
 *                     example: "Erreur lors de l'enregistrement du don"
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 */


router.put("/reservebalade/:balade_id", utilisateurMiddleware.isLogin, prestatairesController.reservebalade)
/**
 * @swagger
 * /api/prestataires/reservebalade/{balade_id}:
 *  put:
 *       summary: Réserver une balade
 *       description: Réserve une balade pour l'utilisateur actuellement connecté.
 *       tags:
 *         - Prestataires
 *       parameters:
 *         - name: balade_id
 *           in: path
 *           required: true
 *           description: ID de la balade à réserver.
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Réservation réussie.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     example: "Balade réservée avec succès"
 *         '401':
 *           description: L'utilisateur n'est pas connecté.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Vous n'êtes pas connecté"
 *         '404':
 *           description: Balade introuvable.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Balade introuvable"
 *         '500':
 *           description: Erreur serveur.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Une erreur s'est produite sur le serveur"
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 */

router.put("/cancelbalade/:balade_id", utilisateurMiddleware.isLogin, prestatairesController.cancelbalade)
/**
 * @swagger
 * /api/prestataires/cancelbalade/{balade_id}:
 *  put:
 *       summary: Annuler une réservation de balade
 *       description: Permet à l'utilisateur connecté d'annuler la réservation d'une balade.
 *       tags:
 *         - Prestataires
 *       parameters:
 *         - name: balade_id
 *           in: path
 *           required: true
 *           description: ID de la balade dont la réservation doit être annulée.
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Réservation annulée avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     example: "Réservation annulée avec succès"
 *         '401':
 *           description: L'utilisateur n'est pas connecté.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Vous n'êtes pas connecté"
 *         '404':
 *           description: Balade introuvable.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Balade introuvable"
 *         '500':
 *           description: Erreur serveur.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Une erreur s'est produite sur le serveur"
 *       security:
 *         - sessionAuth: []
 *
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: session_id
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Prestataire:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nom:
 *           type: string
 *         description:
 *           type: string
 *         description_accueil:
 *           type: string
 *         categorie:
 *           type: string
 *         id_emplacement:
 *           type: integer
 *         id_evenement:
 *           type: integer
 *         page_route:
 *           type: string
 *         image:
 *           type: string
 *         id_utilisateur:
 *           type: integer
 *     Don:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_utilisateur:
 *           type: integer
 *         id_prestataire:
 *           type: integer
 *         message:
 *           type: string
 *         montant:
 *           type: number
 *     Avis:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_prestataire:
 *           type: integer
 *         id_utilisateur:
 *           type: integer
 *         texte:
 *           type: string
 *         note:
 *           type: integer
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         id_prestataire:
 *           type: integer
 *         date:
 *           type: string
 *         heure:
 *           type: string
 *         type_service:
 *           type: string
 */

module.exports = router;
