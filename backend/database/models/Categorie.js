const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Categorie = sequelize.define('Categorie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING }
}, {
    tableName: 'categories',
    timestamps: false
}
);

module.exports = Categorie;