const express = require('express');
const router = express.Router();
const suiviController = require('../controllers/suivicommande.controller');

router.get('/:id_commande', suiviController.getSuiviCommande);

/**
 * @swagger
 * /api/suivi-commande/{id_commande}:
 *   get:
 *     summary: Suivi d'une commande
 *     tags: [SuiviCommande]
 *     parameters:
 *       - in: path
 *         name: id_commande
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Suivi étape par étape
 *       404:
 *         description: Commande introuvable
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
