const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieproduit.controller');

router.get('/', categorieController.getAllCategories);

/**
 * @swagger
 * /api/categories-produits/:
 *   get:
 *     summary: Récupérer toutes les catégories
 *     tags: [CatégoriesProduits]
 *     responses:
 *       200:
 *         description: Liste des catégories
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
