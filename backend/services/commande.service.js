const Commande = require('../database/models/Commande');
const CommandeProduit = require('../database/models/CommandeProduit');
const Produit = require('../database/models/Produit');

exports.createCommande = async (data, callback) => {
    try {
        const { id_utilisateur, mode_retrait, adresse, produits } = data;
        if (!id_utilisateur || !produits || !Array.isArray(produits)) {
            return callback("Données invalides", null);
        }

        let total = 0;
        produits.forEach(p => total += p.prix_unitaire * p.quantite);

        const commande = await Commande.create({
            id_utilisateur,
            mode_retrait,
            adresse,
            total,
            statut: 'confirmée',
            date: new Date()
        });

        for (const p of produits) {
            await CommandeProduit.create({
                id_commande: commande.id,
                id_produit: p.id_produit,
                quantite: p.quantite,
                taille_selectionnee: p.taille_selectionnee,
                prix_unitaire: p.prix_unitaire
            });
        }

        callback(null, commande);
    } catch (error) {
        callback(error, null);
    }
};

exports.getCommandesByUserId = async (userId, callback) => {
    try {
        const commandes = await Commande.findAll({
            where: { id_utilisateur: userId },
            include: { model: Produit, as: 'produits' }
        });
        callback(null, commandes);
    } catch (error) {
        callback(error, null);
    }
};
