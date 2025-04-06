const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieproduit.controller');

router.get('/', categorieController.getAllCategories);
/**
 * @swagger
 * /api/categories-produits/:
 *   get:
 *     summary: Récupérer toutes les catégories de produits
 *     tags:
 *       - Catégories Produits
 *     responses:
 *       200:
 *         description: Liste des catégories disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CategorieProduit'
 *       500:
 *         description: Erreur lors de la récupération des catégories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur serveur"
 */

module.exports = router;
