const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const CategorieProduit = require('./CategorieProduit');

const Produit = sequelize.define('Produit', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nom: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  image: { type: DataTypes.STRING },
  prix: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  tailles: { type: DataTypes.ARRAY(DataTypes.STRING) },
  pays_fabrication: { type: DataTypes.STRING },
  composition: { type: DataTypes.TEXT },
  temps_livraison: { type: DataTypes.STRING },
  id_categorie: { type: DataTypes.INTEGER, references: { model: CategorieProduit, key: 'id' } }
}, {
  tableName: 'produits',
  timestamps: false
});

module.exports = Produit;
