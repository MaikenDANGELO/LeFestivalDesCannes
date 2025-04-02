const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Commande = require('./Commande');

const Paiement = sequelize.define('Paiement', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_commande: { type: DataTypes.INTEGER, references: { model: Commande, key: 'id' } },
  moyen_paiement: { type: DataTypes.STRING },
  statut_paiement: { type: DataTypes.STRING },
  infos_bancaires: { type: DataTypes.JSON }
}, {
  tableName: 'paiements',
  timestamps: false
});

module.exports = Paiement;
