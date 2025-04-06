const express = require('express');
const router = express.Router();
const statusController = require('../controllers/boutiquestatus.controller');

router.get('/:id_prestataire', statusController.getStatus);

/**
 * @swagger
 * /api/boutique-status/{id_prestataire}:
 *   get:
 *     summary: Récupérer le statut d'un prestataire
 *     tags:
 *       - Prestataire
 *     parameters:
 *       - in: path
 *         name: id_prestataire
 *         required: true
 *         description: ID du prestataire dont on souhaite connaître le statut
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Statut du prestataire (actif ou non)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Prestataire non trouvé
 *       500:
 *         description: Erreur serveur
 */

router.put('/:id_prestataire', statusController.toggleStatus);
/**
 * @swagger
 * /api/boutique-status/{id_prestataire}:
 *   put:
 *     summary: Changer le statut d'un prestataire
 *     tags:
 *       - Prestataire
 *     parameters:
 *       - in: path
 *         name: id_prestataire
 *         required: true
 *         description: ID du prestataire dont on veut changer le statut
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Nouveau statut du prestataire (actif ou non)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: boolean
 *                   example: false
 *       404:
 *         description: Prestataire non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BoutiqueStatus:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         id_prestataire:
 *           type: integer
 *           example: 101
 *         actif:
 *           type: boolean
 *           example: true
 */


module.exports = router;
