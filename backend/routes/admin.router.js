const express = require("express");
const adminController = require("../controllers/admin.controller");
const adminMiddleware = require("../middlewares/admin.middleware");
const userMiddleware = require("../middlewares/users.middleware");

var router = express.Router();

router.get('/demandes', userMiddleware.isLogin, adminMiddleware.logInAdmin, adminController.getDemandesPrest)
/**
 * @swagger
 * /api/administrateur/demandes:
 *  get:
 *       summary: Récupérer toutes les demandes de prestataires non acceptées.
 *       description: Cette route permet à un administrateur de récupérer les demandes de prestataires qui n'ont pas encore été acceptées.
 *       tags:
 *         - Administration
 *       security:
 *         - sessionAuth: []
 *       responses:
 *         '200':
 *           description: Liste des demandes récupérées avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           description: Identifiant unique du prestataire.
 *                           example: 5
 *                         nom:
 *                           type: string
 *                           description: Nom du prestataire.
 *                           example: "Prestataire Example"
 *                         description:
 *                           type: string
 *                           description: Description du prestataire.
 *                           example: "Un prestataire d'exemple pour test."
 *                         categorie:
 *                           type: string
 *                           description: Catégorie du prestataire.
 *                           example: "Activité"
 *                         id_emplacement:
 *                           type: integer
 *                           description: Identifiant de l'emplacement.
 *                           example: 2
 *                         accepted:
 *                           type: boolean
 *                           description: Indique si le prestataire est accepté (toujours `false` ici).
 *                           example: false
 *                         utilisateur:
 *                           type: object
 *                           description: Informations de l'utilisateur associé.
 *                           properties:
 *                             id:
 *                               type: integer
 *                               example: 10
 *                             nom:
 *                               type: string
 *                               example: "Admin Example"
 *                             role:
 *                               type: string
 *                               example: "admin"
 *         '401':
 *           description: L'utilisateur n'est pas autorisé à accéder à cette ressource.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Unauthorized"
 *         '500':
 *           description: Une erreur interne s'est produite lors de la récupération des demandes.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Erreur interne du serveur"
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: sessionId
 */

router.put('/accept/:id', userMiddleware.isLogin, adminMiddleware.logInAdmin, adminController.acceptDemandePrest)
/**
 * @swagger
 * /api/administrateur/accept/{id}:
 *  put:
 *       summary: Accepter une demande de prestataire.
 *       description: Cette route permet à un administrateur d'accepter la demande d'un prestataire. L'utilisateur devient alors un prestataire, et un message de notification lui est envoyé.
 *       tags:
 *         - Administration
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Identifiant du prestataire à accepter.
 *           schema:
 *             type: string
 *             example: "1"
 *       responses:
 *         '200':
 *           description: La demande de prestataire a été acceptée avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     description: Confirmation de l'acceptation.
 *                     example: "Prestataire accepté"
 *         '400':
 *           description: Erreur dans les données envoyées ou dans l'état de la demande.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Prestataire non trouvé"
 *         '401':
 *           description: L'utilisateur n'est pas autorisé à effectuer cette action.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Unauthorized"
 *         '500':
 *           description: Une erreur interne s'est produite lors du traitement de la demande.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur.
 */

router.put('/decline/:id', userMiddleware.isLogin, adminMiddleware.logInAdmin, adminController.declineDemandePrest)
/**
 * @swagger
 * /api/administrateur/decline/{id}:
 *  put:
 *       summary: Refuser une demande de prestataire.
 *       description: Cette route permet à un administrateur de refuser la demande d'un prestataire. Le prestataire est supprimé de la base de données, et une notification est envoyée à l'utilisateur.
 *       tags:
 *         - Administration
 *       parameters:
 *         - name: id
 *           in: path
 *           required: true
 *           description: Identifiant du prestataire à refuser.
 *           schema:
 *             type: string
 *             example: "1"
 *       responses:
 *         '200':
 *           description: La demande de prestataire a été refusée avec succès.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: string
 *                     description: Confirmation du refus.
 *                     example: "Prestataire refusé"
 *         '400':
 *           description: Erreur dans les données envoyées ou dans l'état de la demande.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Prestataire non trouvé"
 *         '401':
 *           description: L'utilisateur n'est pas autorisé à effectuer cette action.
 *           content:
 *             text/plain:
 *               schema:
 *                 type: string
 *                 example: "Unauthorized"
 *         '500':
 *           description: Une erreur interne s'est produite lors du traitement de la demande.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   error:
 *                     type: string
 *                     description: Message d'erreur.
 */

router.delete('/delete/:id', userMiddleware.isLogin, adminMiddleware.logInAdmin, adminController.deletePrestataire)
/**
 * @swagger
 * /api/administrateur/delete/{id}:
 *  delete:
 *       summary: Supprimer un prestataire
 *       description: Supprime un prestataire de la base de données. Seules les requêtes provenant d'un utilisateur connecté avec un rôle d'administrateur seront acceptées.
 *       tags:
 *         - Administration
 *       parameters:
 *         - name: id
 *           in: path
 *           description: L'identifiant du prestataire à supprimer.
 *           required: true
 *           type: string
 *       security:
 *         - cookieAuth: []
 *       responses:
 *         200:
 *           description: Prestataire supprimé avec succès.
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 example: "Prestataire supprimé"
 *         401:
 *           description: Non autorisé, l'utilisateur n'est pas admin.
 *           schema:
 *             type: string
 *             example: "Unauthorized"
 *         404:
 *           description: Prestataire non trouvé.
 *           schema:
 *             type: string
 *             example: "Prestataire non trouvé"
 *         500:
 *           description: Erreur serveur.
 *           schema:
 *             type: string
 *             example: "Erreur serveur"
 * components:
 *   securitySchemes:
 *     sessionAuth:
 *       type: apiKey
 *       in: cookie
 *       name: sessionId
 */

module.exports = router;