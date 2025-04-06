const express = require("express");
const prestatairesController =
    require("../controllers/prestataires.controller");
const prestatairesMiddleware = require("../middlewares/prestataires.middleware");
const utilisateurMiddleware = require("../middlewares/users.middleware");

const router = express.Router();

/**
 * @swagger
 * /api/prestataires/:
 *   get:
 *     summary: Récupérer tous les prestataires
 *     description: Permet de récupérer tous les prestataires avec leurs services et catégories associés.
 *     tags:
 *       - Prestataire
 *     responses:
 *       200:
 *         description: Liste des prestataires récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur, 0 si succès.
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Prestataire'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur.
 *                   example: 1
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Erreur interne du serveur."
 */
router.get('/', prestatairesController.getAllPrestataire);

/**
 * @swagger
 * /api/prestataires/getTotalDons:
 *   get:
 *     summary: Récupérer le total des dons
 *     description: Permet de récupérer le montant total des dons effectués aux prestataires.
 *     tags:
 *       - Prestataire
 *     responses:
 *       200:
 *         description: Total des dons récupéré avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur, 0 si succès.
 *                   example: 0
 *                 data:
 *                   type: number
 *                   description: Total des dons.
 *                   example: 15000.00
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur.
 *                   example: 1
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Erreur interne du serveur."
 */
router.get("/getTotalDons", prestatairesController.getTotalDons);

/**
 * @swagger
 * /api/prestataires/getAllCategories:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     description: Permet de récupérer toutes les catégories disponibles pour les prestataires.
 *     tags:
 *       - Prestataire
 *     responses:
 *       200:
 *         description: Liste des catégories récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur, 0 si succès.
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Categorie'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur.
 *                   example: 1
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Erreur interne du serveur."
 */
router.get("/getAllCategories", prestatairesController.getAllCategories);

/**
 * @swagger
 * /api/prestataires/getAllBalades:
 *   get:
 *     summary: Récupérer toutes les balades
 *     description: Permet de récupérer toutes les balades réservées par les utilisateurs.
 *     tags:
 *       - Prestataire
 *     responses:
 *       200:
 *         description: Liste des balades récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur, 0 si succès.
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Reservation'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   description: Code d'erreur.
 *                   example: 1
 *                 message:
 *                   type: string
 *                   description: Message d'erreur.
 *                   example: "Erreur interne du serveur."
 */
router.get("/getAllBalades", prestatairesController.getAllBalades);



router.get("/getTotalDonsOf/:id", prestatairesController.getTotalDonsOf)
/**
 * @swagger
 * api/prestataires/getTotalDonsOf/{id}:
 *     get:
 *       summary: "Obtenir le total des dons pour un prestataire"
 *       tags:
 *         - Prestataire
 *       description: "Récupère la somme totale des dons pour un prestataire donné, identifié par son ID."
 *       operationId: "getTotalDonsOf"
 *       parameters:
 *         - $ref: '#/components/parameters/idParam'
 *       responses:
 *         200:
 *           description: "Total des dons récupéré avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: number
 *                     format: float
 *                     example: 1500.00
 *         400:
 *           description: "L'ID du prestataire est requis"
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */


router.get("/getAllAvis", prestatairesController.getAllAvis)
/**
 * @swagger
 * /api/prestataires/getAllAvis:
 *   get:
 *       summary: "Obtenir tous les avis"
 *       tags:
 *         - Avis
 *       description: "Récupère tous les avis sur les prestataires."
 *       operationId: "getAllAvis"
 *       responses:
 *         200:
 *           description: "Liste des avis récupérée avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Avis'
 *         404:
 *           $ref: '#/components/responses/EmptyResponse'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */


router.get("/getPrestGastro", prestatairesController.getPrestGastro)
/**
 * @swagger
 * /api/prestataires/getPrestGastro:
 *  get:
 *       summary: "Obtenir tous les prestataires de catégorie gastronomique"
 *       tags:
 *         - Prestataire
 *       description: "Récupère tous les prestataires ayant la catégorie 'gastronomique'."
 *       operationId: "getPrestGastro"
 *       responses:
 *         200:
 *           description: "Liste des prestataires gastronomiques récupérée avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Prestataire'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */

router.get("/getAllDisponibiliteResto/:id", prestatairesController.getAllDisponibiliteResto)
/**
 * @swagger
 * /api/prestataires/getAllDisponibiliteResto/{id}:
 *   get:
 *       summary: "Obtenir les disponibilités d'un restaurant"
 *       tags:
 *         - Prestataire
 *       description: "Récupère toutes les disponibilités pour un prestataire restaurant donné, identifié par son ID."
 *       operationId: "getAllDisponibiliteResto"
 *       parameters:
 *         - $ref: '#/components/parameters/idParam'
 *       responses:
 *         200:
 *           description: "Disponibilités du restaurant récupérées avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Reservation'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */

router.get("/getAvis/:id", prestatairesController.getAvis)
/**
 * @swagger
 * /api/prestataires/getAvis/{id}:
 *   get:
 *       summary: "Obtenir les avis pour un prestataire spécifique"
 *       tags:
 *         - Avis
 *       description: "Récupère les avis pour un prestataire donné, identifié par son ID."
 *       operationId: "getAvis"
 *       parameters:
 *         - $ref: '#/components/parameters/idParam'
 *       responses:
 *         200:
 *           description: "Avis récupérés avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Avis'
 *         404:
 *           description: "Aucun avis trouvé pour ce prestataire"
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */


router.post('/sendFormPrestataire', utilisateurMiddleware.isLoggedIn, prestatairesMiddleware.alreadyExists, prestatairesController.sendFormPrestataire)
/**
 * @swagger
 * /api/prestataires/sendFormPrestataire:
 *  post:
 *       summary: "Envoyer un formulaire pour un prestataire"
 *       tags:
 *         - Prestataire
 *       description: "Permet à un utilisateur d'envoyer un formulaire pour créer un nouveau prestataire."
 *       operationId: "sendFormPrestataire"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_utilisateur:
 *                   type: integer
 *                   example: 1
 *                 form:
 *                   type: object
 *                   properties:
 *                     nom:
 *                       type: string
 *                       example: "Restaurant Gourmet"
 *                     description:
 *                       type: string
 *                       example: "Un restaurant gastronomique exceptionnel."
 *                     image:
 *                       type: string
 *                       example: "image_url_here"
 *                     services:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_service:
 *                             type: integer
 *                             example: 1
 *                           nom_service:
 *                             type: string
 *                             example: "Service gastronomique"
 *                           description_service:
 *                             type: string
 *                             example: "Un service haut de gamme."
 *                           lien_service:
 *                             type: string
 *                             example: "http://example.com/service"
 *                           statut_service:
 *                             type: string
 *                             example: "Actif"
 *       responses:
 *         200:
 *           description: "Formulaire de prestataire envoyé avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     $ref: '#/components/schemas/Prestataire'
 *         400:
 *           $ref: '#/components/responses/BadRequestError'
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */

router.post("/makeReservation" ,utilisateurMiddleware.isLoggedIn, prestatairesController.makeReservation)
/**
 * @swagger
 * /api/prestataires/makeReservation:
 *  post:
 *       summary: "Faire une réservation"
 *       tags:
 *         - Prestataire
 *       description: "Permet à un utilisateur de faire une réservation pour un prestataire spécifique."
 *       operationId: "makeReservation"
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                   example: 1
 *                 date:
 *                   type: string
 *                   format: date
 *                   example: "2025-04-12"
 *                 hour:
 *                   type: string
 *                   format: time
 *                   example: "19:00"
 *                 prestataire_id:
 *                   type: integer
 *                   example: 1
 *                 options:
 *                   type: object
 *                   additionalProperties: true
 *                   example: { "extra_seating": true }
 *       responses:
 *         200:
 *           description: "Réservation effectuée avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     example: 0
 *                   data:
 *                     type: string
 *                     example: "Réservation effectuée avec succès"
 *         400:
 *           description: "Les informations nécessaires sont manquantes"
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         404:
 *           $ref: '#/components/responses/NotFoundError'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */

router.post("/makeDonation/:prestId", utilisateurMiddleware.isLoggedIn, prestatairesController.makeDonation)
/**
 * @swagger
 * /api/prestataires/makeDonation/{prestId}:
 *  post:
 *       summary: "Faire un don à un prestataire"
 *       tags:
 *         - Prestataire
 *       description: "Permet à un utilisateur de faire un don à un prestataire spécifique."
 *       operationId: "makeDonation"
 *       parameters:
 *         - name: prestId
 *           in: path
 *           description: L'ID du prestataire à qui l'utilisateur souhaite faire un don.
 *           required: true
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 amount:
 *                   type: number
 *                   format: float
 *                   example: 100.00
 *                 message:
 *                   type: string
 *                   example: "Merci pour votre service!"
 *       responses:
 *         200:
 *           description: "Don effectué avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     example: "Donation enregistrée avec succès"
 *         400:
 *           description: "Montant du don manquant"
 *         401:
 *           $ref: '#/components/responses/UnauthorizedError'
 *         500:
 *           $ref: '#/components/responses/InternalServerError'
 */



router.patch("/reservebalade/:balade_id", utilisateurMiddleware.isLoggedIn, prestatairesController.reservebalade)
/**
 * @swagger
 * /api/prestataires/reservebalade/{balade_id}:
 *   patch:
 *       summary: "Réserver une balade"
 *       tags:
 *         - Prestataire
 *       description: "Réserve une balade pour un utilisateur donné."
 *       parameters:
 *         - in: path
 *           name: balade_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: "L'ID de la balade à réserver"
 *         - in: body
 *           name: user_id
 *           required: true
 *           description: "ID de l'utilisateur qui réserve la balade"
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *       responses:
 *         200:
 *           description: "Balade réservée avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     description: Code d'erreur
 *                   data:
 *                     type: string
 *                     description: "Message confirmant la réservation"
 *         404:
 *           description: "Balade introuvable"
 *         500:
 *           description: "Erreur interne du serveur"
 */

router.patch("/cancelbalade/:balade_id", utilisateurMiddleware.isLoggedIn, prestatairesController.cancelbalade)
/**
 * @swagger
 * /api/prestataires/cancelbalade/{balade_id}:
 *  patch:
 *       summary: "Annuler une réservation de balade"
 *       tags:
 *         - Prestataire
 *       description: "Annule une réservation pour une balade."
 *       parameters:
 *         - in: path
 *           name: balade_id
 *           required: true
 *           schema:
 *             type: integer
 *           description: "L'ID de la balade à annuler"
 *       responses:
 *         200:
 *           description: "Réservation annulée avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     description: Code d'erreur
 *                   data:
 *                     type: string
 *                     description: "Message confirmant l'annulation"
 *         404:
 *           description: "Balade introuvable"
 *         500:
 *           description: "Erreur interne du serveur"
 */

router.patch('/modifyDataPrest', utilisateurMiddleware.isLoggedIn, prestatairesController.changeDataPrest)
/**
 * @swagger
 * /api/prestataires/modifyDataPrest:
 *  patch:
 *       summary: "Modifier les données du prestataire"
 *       tags:
 *         - Prestataire
 *       description: "Permet de modifier les données du prestataire, y compris les services."
 *       parameters:
 *         - in: body
 *           name: data
 *           required: true
 *           description: "Les données à mettre à jour pour le prestataire"
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: "L'ID du prestataire à modifier"
 *               nom:
 *                 type: string
 *                 description: "Nom du prestataire"
 *               description:
 *                 type: string
 *                 description: "Description du prestataire"
 *               description_accueil:
 *                 type: string
 *                 description: "Description de l'accueil du prestataire"
 *               id_categorie:
 *                 type: integer
 *                 description: "ID de la catégorie du prestataire"
 *               id_emplacement:
 *                 type: integer
 *                 description: "ID de l'emplacement du prestataire"
 *               image:
 *                 type: string
 *                 description: "URL de l'image du prestataire"
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id_service:
 *                       type: integer
 *                     nom_service:
 *                       type: string
 *                     description_service:
 *                       type: string
 *                     statut_service:
 *                       type: string
 *                     lien_service:
 *                       type: string
 *       responses:
 *         200:
 *           description: "Données du prestataire modifiées avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: integer
 *                     description: Code d'erreur
 *                   data:
 *                     type: string
 *                     description: "Message confirmant la modification"
 *         500:
 *           description: "Erreur interne du serveur"
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     # Définition du modèle Utilisateur
 *     Utilisateur:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nom_utilisateur:
 *           type: string
 *           example: "Jean Dupont"
 *         email_utilisateur:
 *           type: string
 *           example: "jean.dupont@email.com"
 *         mot_de_passe:
 *           type: string
 *           example: "MotDePasse123!"
 *         telephone:
 *           type: string
 *           example: "0123456789"
 *         adresse_utilisateur:
 *           type: string
 *           example: "10 Rue de la Paix, Paris"
 *       required:
 *         - nom_utilisateur
 *         - email_utilisateur
 *         - mot_de_passe
 *
 *     # Définition du modèle Catégorie
 *     Categorie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nom:
 *           type: string
 *           example: "Loisirs"
 *       required:
 *         - nom
 *
 *     # Définition du modèle Prestataire
 *     Prestataire:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nom:
 *           type: string
 *           example: "Canard Sauvage"
 *         nom_en:
 *           type: string
 *           example: "Wild Duck"
 *         description:
 *           type: string
 *           example: "Un prestataire pour des balades en canoë."
 *         description_en:
 *           type: string
 *           example: "A provider for canoe rides."
 *         description_accueil:
 *           type: string
 *           example: "Venez découvrir notre passion!"
 *         description_accueil_en:
 *           type: string
 *           example: "Come discover our passion!"
 *         id_categorie:
 *           type: integer
 *           example: 1
 *         id_emplacement:
 *           type: integer
 *           example: 2
 *         id_evenement:
 *           type: integer
 *           example: 3
 *         page_route:
 *           type: string
 *           example: "/prestataire/canard-sauvage"
 *         image:
 *           type: string
 *           example: "https://image.url"
 *         accepted:
 *           type: boolean
 *           example: true
 *         id_utilisateur:
 *           type: integer
 *           example: 1
 *       required:
 *         - nom
 *         - description
 *         - id_categorie
 *
 *     Don:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant unique du don
 *         id_utilisateur:
 *           type: integer
 *           description: L'identifiant de l'utilisateur qui fait le don
 *         id_prestataire:
 *           type: integer
 *           description: L'identifiant du prestataire qui reçoit le don
 *         message:
 *           type: string
 *           description: Un message facultatif accompagnant le don
 *         montant:
 *           type: number
 *           format: float
 *           description: Le montant du don
 *         date:
 *           type: string
 *           format: date-time
 *           description: La date et l'heure du don
 *       required:
 *         - id
 *         - id_utilisateur
 *         - id_prestataire
 *         - montant
 *         - date
 *
 *     # Définition du modèle Reservation
 *     Reservation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         id_prestataire:
 *           type: integer
 *           example: 1
 *         date:
 *           type: string
 *           format: date
 *           example: "2025-05-12"
 *         heure:
 *           type: string
 *           format: time
 *           example: "14:30"
 *         type_service:
 *           type: string
 *           enum: ['balade', 'restaurant']
 *           example: "balade"
 *         reserved_user_id:
 *           type: integer
 *           example: 1
 *         options:
 *           type: object
 *           additionalProperties: true
 *           example: { "extra_tour": true }
 *       required:
 *         - id_prestataire
 *         - date
 *         - heure
 *         - type_service
 *
 *   responses:
 *     UnauthorizedError:
 *       description: "Non authentifié"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Non authentifié"
 *
 *     InternalServerError:
 *       description: "Erreur serveur interne"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Une erreur est survenue"
 *
 *     NotFoundError:
 *       description: "Ressource non trouvée"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               error:
 *                 type: string
 *                 example: "Ressource non trouvée"
 *
 *     EmptyResponse:
 *       description: "Aucun résultat trouvé"
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Aucun avis trouvé"
 *   parameters:
 *     idParam:
 *       name: id
 *       in: path
 *       required: true
 *       description: "L'ID de l'entité"
 *       schema:
 *         type: integer
 *         example: 1
 */



module.exports = router;
