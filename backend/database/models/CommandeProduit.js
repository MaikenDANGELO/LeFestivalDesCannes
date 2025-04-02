const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const CommandeProduit = sequelize.define('CommandeProduit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_commande: { type: DataTypes.INTEGER },
  id_produit: { type: DataTypes.INTEGER },
  quantite: { type: DataTypes.INTEGER },
  taille_selectionnee: { type: DataTypes.STRING },
  prix_unitaire: { type: DataTypes.FLOAT }
}, {
  tableName: 'commande_produits',
  timestamps: false
});

module.exports = CommandeProduit;
