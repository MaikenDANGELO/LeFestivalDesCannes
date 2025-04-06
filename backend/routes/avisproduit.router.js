const express = require('express');
const router = express.Router();
const avisController = require('../controllers/avisproduit.controller');

router.post('/', avisController.createAvisProduit);
/**
 * @swagger
 * /api/avis-produits/:
 *   post:
 *       summary: "Créer un avis pour un produit"
 *       tags:
 *       - Avis Produit
 *       description: "Permet à un utilisateur de laisser un avis pour un produit."
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvisProduit'
 *       responses:
 *         201:
 *           description: "Avis créé avec succès"
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     $ref: '#/components/schemas/AvisProduit'
 *         400:
 *           description: "Produit ou utilisateur introuvable"
 *         500:
 *           description: "Erreur interne du serveur"
 */

router.get('/produit/:id', avisController.getAvisByProduit);
/**
 * @swagger
 * /produit/{id}:
 *   get:
 *     summary: Récupérer les avis pour un produit spécifique
 *     tags:
 *       - Avis Produit
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identifiant du produit
 *     responses:
 *       200:
 *         description: Liste des avis pour le produit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AvisProduit'
 *       500:
 *         description: Erreur lors de la récupération des avis
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
 *     AvisProduit:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Identifiant unique de l'avis
 *         id_utilisateur:
 *           type: integer
 *           example: 4
 *           description: Identifiant de l'utilisateur ayant laissé l'avis
 *         id_produit:
 *           type: integer
 *           example: 2
 *           description: Identifiant du produit concerné
 *         note:
 *           type: integer
 *           example: 5
 *           description: Note sur 5 donnée au produit
 *         commentaire:
 *           type: string
 *           example: "Très bon produit, livraison rapide."
 *           description: Commentaire de l'utilisateur
 *         utilisateur:
 *           type: object
 *           description: Informations sur l'utilisateur ayant laissé l'avis
 *           properties:
 *             id:
 *               type: integer
 *               example: 4
 *             nom:
 *               type: string
 *               example: "Dupont"
 *             prenom:
 *               type: string
 *               example: "Jean"
 */




module.exports = router;
