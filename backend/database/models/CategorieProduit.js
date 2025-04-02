const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const CategorieProduit = sequelize.define('CategorieProduit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'categorie_produits',
  timestamps: false
});

module.exports = CategorieProduit;
