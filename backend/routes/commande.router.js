const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commande.controller');

router.post('/', commandeController.createCommande);
/**
 * @swagger
 * /api/commandes/:
 *   post:
 *     summary: Créer une nouvelle commande
 *     tags:
 *       - Commandes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_utilisateur
 *               - mode_retrait
 *               - produits
 *             properties:
 *               id_utilisateur:
 *                 type: integer
 *                 example: 12
 *               mode_retrait:
 *                 type: string
 *                 example: "livraison"
 *               adresse:
 *                 type: string
 *                 example: "123 rue des Festivals, Paris"
 *               produits:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id_produit
 *                     - quantite
 *                     - taille_selectionnee
 *                     - prix_unitaire
 *                   properties:
 *                     id_produit:
 *                       type: integer
 *                       example: 3
 *                     quantite:
 *                       type: integer
 *                       example: 2
 *                     taille_selectionnee:
 *                       type: string
 *                       example: "M"
 *                     prix_unitaire:
 *                       type: number
 *                       example: 29.99
 *     responses:
 *       201:
 *         description: Commande créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Commande'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */

router.get('/getBoutiqueChiffreDaffaire', commandeController.getMoney);
/**
 * @swagger
 * /api/commandes/getBoutiqueChiffreDaffaire:
 *   get:
 *     summary: Récupérer le chiffre d'affaires total de la boutique
 *     tags:
 *       - Commandes
 *     responses:
 *       200:
 *         description: Chiffre d'affaires récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: number
 *                   example: 1299.99
 *       500:
 *         description: Erreur serveur
 */


router.get('/utilisateur/:id', commandeController.getCommandesUtilisateur);
/**
 * @swagger
 * /api/commandes/utilisateur/{id}:
 *   get:
 *     summary: Récupérer toutes les commandes d’un utilisateur
 *     tags:
 *       - Commandes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de l'utilisateur
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Liste des commandes de l’utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Commande'
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Commande:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 101
 *         id_utilisateur:
 *           type: integer
 *           example: 12
 *         mode_retrait:
 *           type: string
 *           example: "livraison"
 *         adresse:
 *           type: string
 *           example: "123 rue des Festivals, Paris"
 *         total:
 *           type: number
 *           example: 89.97
 *         statut:
 *           type: string
 *           example: "confirmée"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-04-06T16:20:00Z"
 */



module.exports = router;
