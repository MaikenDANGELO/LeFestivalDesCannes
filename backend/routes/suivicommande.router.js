const express = require('express');
const router = express.Router();
const suiviController = require('../controllers/suivicommande.controller');

router.get('/:id_commande', suiviController.getSuiviCommande);
/**
 * @swagger
 * /api/suivi-commande/{id_commande}:
 *   get:
 *     summary: Récupérer le suivi d'une commande
 *     tags:
 *       - Suivi Commande
 *     parameters:
 *       - in: path
 *         name: id_commande
 *         required: true
 *         description: ID de la commande à suivre
 *         schema:
 *           type: integer
 *           example: 101
 *     responses:
 *       200:
 *         description: Liste des statuts de suivi pour la commande
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SuiviCommande'
 *       404:
 *         description: Commande non trouvée
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SuiviCommande:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 12
 *         id_commande:
 *           type: integer
 *           example: 101
 *         etape:
 *           type: string
 *           example: "Commande expédiée"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-04-06T15:30:00Z"
 */



module.exports = router;
