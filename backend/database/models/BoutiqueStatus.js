const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');

const BoutiqueStatus = sequelize.define('BoutiqueStatus', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_prestataire: { type: DataTypes.INTEGER, references: { model: Prestataire, key: 'id' } },
  actif: { type: DataTypes.BOOLEAN, defaultValue: true }
}, {
  tableName: 'boutique_status',
  timestamps: false
});

module.exports = BoutiqueStatus;
