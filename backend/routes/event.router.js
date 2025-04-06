const express = require('express');
const eventController = require('../controllers/event.controller');

const router = express.Router();

router.post('/paidTicket', eventController.paidTickets )
/**
 * @swagger
 * /paidTicket:
 *   post:
 *     summary: Enregistrer un achat de billets et envoyer un email de confirmation
 *     tags:
 *       - Billetterie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               form:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: "exemple@domaine.com"
 *                   tickets:
 *                     type: array
 *                     items:
 *                       type: object
 *                       example:
 *                         eventId: 1
 *                         seatNumber: "A12"
 *                 required:
 *                   - email
 *                   - tickets
 *               total:
 *                 type: number
 *                 example: 50
 *     responses:
 *       200:
 *         description: Achat enregistré et email envoyé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 0
 *                 data:
 *                   $ref: '#/components/schemas/Billetterie'
 *       500:
 *         description: Erreur lors de la connexion à la base de données ou envoi d'email échoué
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: integer
 *                   example: 1
 *                 data:
 *                   type: string
 *                   example: "Database connection error"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Billetterie:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 42
 *           description: Identifiant de la transaction de billetterie
 *         nombre_billets:
 *           type: integer
 *           example: 3
 *           description: Nombre de billets achetés
 *         prix_total:
 *           type: number
 *           example: 75
 *           description: Prix total payé en euros
 *         date_achat:
 *           type: string
 *           format: date-time
 *           example: "2025-04-06T14:30:00.000Z"
 *           description: Date et heure de l'achat
 *         email:
 *           type: string
 *           example: "exemple@domaine.com"
 *           description: Email de l'acheteur
 */

module.exports = router;