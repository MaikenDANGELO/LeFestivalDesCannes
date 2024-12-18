const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Association = sequelize.define('Association', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_association: { type: DataTypes.STRING },
    description_accueil: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING }
}, {
    tableName: 'associations',
    timestamps: false
});

module.exports = Association;