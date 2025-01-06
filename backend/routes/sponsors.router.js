const sponsorsController = require('../controllers/sponsors.controller');
const express = require('express');
const router = express.Router();

router.get('/', sponsorsController.getAllSponsors);
/**
 * @swagger
 * /api/sponsors/:
 *  get:
 *       summary: Récupérer tous les sponsors
 *       description: Récupère la liste de tous les sponsors.
 *       tags:
 *         - Sponsors
 *       responses:
 *         '200':
 *           description: Liste des sponsors récupérée avec succès
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
 *                           description: Identifiant du sponsor
 *                         nom:
 *                           type: string
 *                           description: Nom du sponsor
 *                         description:
 *                           type: string
 *                           description: Description du sponsor
 *                         logo:
 *                           type: string
 *                           description: URL du logo du sponsor
 *                         site_web:
 *                           type: string
 *                           description: URL du site web du sponsor
 *         '500':
 *           description: Erreur serveur
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   message:
 *                     type: string
 *                     example: "Une erreur s'est produite lors de la récupération des sponsors."
 */

module.exports = router;