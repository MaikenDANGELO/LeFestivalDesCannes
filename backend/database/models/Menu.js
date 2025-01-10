const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');

const Menu = sequelize.define('Menu', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_prestataire: { 
        type: DataTypes.INTEGER, 
        references: { model: Prestataire, key: 'id' }, 
        allowNull: false 
    },
    type: { type: DataTypes.STRING, allowNull: false },
    nom: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    prix: { type: DataTypes.FLOAT, allowNull: false },
    image: { type: DataTypes.STRING , allowNull: true}
}, {
    tableName: 'menus',
    timestamps: false
});

module.exports = Menu;
