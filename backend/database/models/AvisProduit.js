const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');
const Produit = require('./Produit');

const AvisProduit = sequelize.define('AvisProduit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_utilisateur: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
  id_produit: { type: DataTypes.INTEGER, references: { model: Produit, key: 'id' } },
  note: { type: DataTypes.INTEGER },
  commentaire: { type: DataTypes.TEXT }
}, {
  tableName: 'avis_produits',
  timestamps: false
});

module.exports = AvisProduit;
