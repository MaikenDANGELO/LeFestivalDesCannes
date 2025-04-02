const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit.controller');

router.get('/', produitController.getAllProduits);

/**
 * @swagger
 * /api/produits/:
 *   get:
 *     summary: Récupérer tous les produits
 *     tags: [Produits]
 *     responses:
 *       200:
 *         description: Liste des produits
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
