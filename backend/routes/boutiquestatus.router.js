const express = require('express');
const router = express.Router();
const statusController = require('../controllers/boutiquestatus.controller');

router.get('/:id_prestataire', statusController.getStatus);
router.put('/:id_prestataire', statusController.toggleStatus);

/**
 * @swagger
 * /api/boutique-status/{id_prestataire}:
 *   get:
 *     summary: Voir le statut de la boutique
 *     tags: [BoutiqueStatus]
 *     parameters:
 *       - in: path
 *         name: id_prestataire
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Statut actuel
 *       404:
 *         description: Prestataire non trouvé
 *       500:
 *         description: Erreur serveur
 *
 *   put:
 *     summary: Activer / Désactiver la boutique
 *     tags: [BoutiqueStatus]
 *     parameters:
 *       - in: path
 *         name: id_prestataire
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Nouveau statut appliqué
 *       404:
 *         description: Prestataire non trouvé
 *       500:
 *         description: Erreur serveur
 */

module.exports = router;
