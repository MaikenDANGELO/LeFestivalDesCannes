const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controller');

router.post('/', commandeController.createCommande);

router.get('/getBoutiqueChiffreDaffaire', commandeController.getMoney);

router.get('/utilisateur/:id', commandeController.getCommandesUtilisateur);

/**
 * @swagger
 * /api/commandes/:
 *   post:
 *     summary: Créer une commande
 *     tags: [Commandes]
 *     responses:
 *       201:
 *         description: Commande créée
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 *
 * /api/commandes/utilisateur/{id}:
 *   get:
 *     summary: Obtenir les commandes d’un utilisateur
 *     tags: [Commandes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des commandes
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
