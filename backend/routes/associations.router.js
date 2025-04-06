const express = require("express");
const associationController = require("../controllers/associations.controller");

const router = express.Router();


router.get('/', associationController.getAllAssociations);
/**
 * @swagger
 * /api/sponsors/:
 *   get:
 *     summary: Récupérer toutes les associations
 *     tags:
 *       - Associations
 *     responses:
 *       200:
 *         description: Liste de toutes les associations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Association'
 *       500:
 *         description: Erreur interne lors de la récupération des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des associations"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Association:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *           description: Identifiant de l'association
 *         nom_association:
 *           type: string
 *           example: "Les amis des animaux"
 *           description: Nom de l'association
 *         description_accueil:
 *           type: string
 *           example: "Bienvenue sur notre page"
 *           description: Message d'accueil de l'association
 *         description:
 *           type: string
 *           example: "Nous œuvrons pour le bien-être des animaux."
 *           description: Description de l'association
 *         image:
 *           type: string
 *           format: uri
 *           example: "https://exemple.com/image.jpg"
 *           description: URL ou base64 de l'image de l'association
 */




module.exports = router;