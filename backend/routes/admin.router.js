const express = require("express");
const adminController = require("../controllers/admin.controller");

var router = express.Router();


router.put('/accept/:id', adminController.acceptDemandePrest)
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

router.put('/decline/:id', adminController.declineDemandePrest)
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

module.exports = router;