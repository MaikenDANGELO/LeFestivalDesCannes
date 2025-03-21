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
 *     description: Récupère la liste de tous les prestataires.
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Liste des prestataires récupérée avec succès.
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
 *         description: Erreur interne du serveur.
 */

router.get("/getTotalDons", prestatairesController.getTotalDons)


router.get("/getAllBalades", prestatairesController.getAllBalades)
/**
 * @swagger
 * /api/prestataires/getAllBalades:
 *   get:
 *     description: Récupère la liste de toutes les réservations de type balade.
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Liste des réservations de balade récupérée avec succès.
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
 *         description: Erreur interne du serveur.
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


router.get("/getAllAvis", prestatairesController.getAllAvis)
/**
 * @swagger
 * /api/prestataires/getAllAvis:
 *   get:
 *     description: Utiliser pour retrouver tous les avis
 *     tags:
 *       - Prestataires
 *     responses:
 *       '200':
 *         description: Réussite - Les avis ont été récupérés avec succès.
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
 *                         description: L'ID du prestataire
 *                         example: 123
 *                       id_utilisateur:
 *                         type: integer
 *                         description: L'ID de l'utilisateur qui a donné l'avis
 *                         example: 456
 *                       texte:
 *                         type: string
 *                         description: Texte de l'avis
 *                         example: "Excellent service, très satisfait !"
 *                       note:
 *                         type: integer
 *                         description: La note de l'avis (1-5)
 *                         example: 5
 *       '404':
 *         description: Aucun avis trouvé
 *       '500':
 *         description: Erreur interne du serveur
 */


router.get("/getPrestGastro", prestatairesController.getPrestGastro)

router.get("/getAllDisponibiliteResto/:id", prestatairesController.getAllDisponibiliteResto)

router.get("/getAvis/:id", prestatairesController.getAvis)
/**
 * @swagger
 * /api/prestataires/getAvis/{id}:
 *   get:
 *     description: Utilisé pour récupérer les avis (avis) et services pour un prestataire spécifique en fonction de l'ID fourni dans l'URL
 *     tags:
 *       - Prestataires
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: L'ID du prestataire pour lequel obtenir les avis et services
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Les avis et services du prestataire ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prestataire:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: L'ID du prestataire
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       description: Le nom du prestataire
 *                       example: "Jeux et Divertissements"
 *                     description:
 *                       type: string
 *                       description: La description du prestataire
 *                       example: "Espace dédié aux jeux pour enfants et adultes avec diverses animations..."
 *                     services:
 *                       type: array
 *                       description: Liste des services proposés par le prestataire
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: L'ID du service
 *                             example: 1
 *                           nom_service:
 *                             type: string
 *                             description: Le nom du service
 *                             example: "Jeu de société géant"
 *                           description_service:
 *                             type: string
 *                             description: La description du service
 *                             example: "Un grand jeu de société à jouer en famille..."
 *                           statut_service:
 *                             type: string
 *                             description: Le statut du service
 *                             example: "Disponible"
 *       '404':
 *         description: Prestataire ou avis non trouvés pour l'ID fourni
 *       '500':
 *         description: Erreur interne du serveur
 */


router.post('/sendFormPrestataire', utilisateurMiddleware.isLoggedIn, prestatairesMiddleware.alreadyExists, prestatairesController.sendFormPrestataire)
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
 */

router.post("/makeDonation/:prestId", utilisateurMiddleware.isLoggedIn, prestatairesController.makeDonation)
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
 *                     type: object
 *                     description: Données du don effectué.
 *         '400':
 *           description: Mauvais format de demande ou paramètres manquants.
 *         '401':
 *           description: Utilisateur non connecté.
 *         '404':
 *           description: Prestataire non trouvé pour l'ID donné.
 *         '500':
 *           description: Erreur lors de l'enregistrement du don.
 */



router.patch("/reservebalade/:balade_id", utilisateurMiddleware.isLoggedIn, prestatairesController.reservebalade)
/**
 * @swagger
 * /api/prestataires/reservebalade/{balade_id}:
 *  patch:
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
 */

router.patch("/cancelbalade/:balade_id", utilisateurMiddleware.isLoggedIn, prestatairesController.cancelbalade)
/**
 * @swagger
 * /api/prestataires/cancelbalade/{balade_id}:
 *  patch:
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
