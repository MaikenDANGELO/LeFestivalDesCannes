const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisproduit.controller');

router.post('/', avisController.createAvisProduit);
router.get('/produit/:id', avisController.getAvisByProduit);

/**
 * @swagger
 * /api/avis-produits/:
 *   post:
 *     summary: Ajouter un avis sur un produit
 *     tags: [AvisProduits]
 *     responses:
 *       201:
 *         description: Avis ajouté
 *       400:
 *         description: Erreur saisie
 *       500:
 *         description: Erreur serveur
 *
 * /api/avis-produits/produit/{id}:
 *   get:
 *     summary: Voir les avis d’un produit
 *     tags: [AvisProduits]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Liste des avis
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
