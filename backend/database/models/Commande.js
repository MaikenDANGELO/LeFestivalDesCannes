const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');

const Commande = sequelize.define('Commande', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_utilisateur: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
  mode_retrait: { type: DataTypes.STRING }, // "livraison" ou "retrait"
  adresse: { type: DataTypes.STRING },
  total: { type: DataTypes.FLOAT },
  statut: { type: DataTypes.STRING }, // ex : "confirmée", "expédiée"
  date: { type: DataTypes.DATE }
}, {
  tableName: 'commandes',
  timestamps: false
});

module.exports = Commande;
