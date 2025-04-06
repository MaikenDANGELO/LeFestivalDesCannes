const express = require('express');
const router = express.Router();
const produitController = require('../controllers/produit.controller');

router.get('/', produitController.getAllProduits);
/**
 * @swagger
 * /api/produits/:
 *   get:
 *     summary: Récupérer tous les produits avec leur catégorie
 *     tags:
 *       - Produits
 *     responses:
 *       200:
 *         description: Liste complète des produits disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Produit'
 *       500:
 *         description: Erreur interne lors de la récupération des produits
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur serveur"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Produit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         nom:
 *           type: string
 *           example: "T-shirt Festival"
 *         description:
 *           type: string
 *           example: "Un t-shirt 100% coton, édition spéciale Festival."
 *         image:
 *           type: string
 *           format: uri
 *           example: "https://exemple.com/images/tshirt.jpg"
 *         prix:
 *           type: number
 *           example: 19.99
 *         stock:
 *           type: integer
 *           example: 50
 *         couleur:
 *           type: array
 *           items:
 *             type: string
 *           example: ["rouge", "bleu", "noir"]
 *         tailles:
 *           type: array
 *           items:
 *             type: string
 *           example: ["S", "M", "L"]
 *         pays_fabrication:
 *           type: string
 *           example: "France"
 *         composition:
 *           type: string
 *           example: "100% coton biologique"
 *         temps_livraison:
 *           type: string
 *           example: "3 à 5 jours ouvrés"
 *         id_categorie:
 *           type: integer
 *           example: 2
 *         categorie:
 *           $ref: '#/components/schemas/CategorieProduit'

 *     CategorieProduit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 2
 *         nom:
 *           type: string
 *           example: "Vêtements"
 */

module.exports = router;
