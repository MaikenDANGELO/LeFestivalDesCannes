const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Commande = require('./Commande');

const SuiviCommande = sequelize.define('SuiviCommande', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_commande: { type: DataTypes.INTEGER, references: { model: Commande, key: 'id' } },
  etape: { type: DataTypes.STRING },
  date: { type: DataTypes.DATE }
}, {
  tableName: 'suivi_commandes',
  timestamps: false
});

module.exports = SuiviCommande;
