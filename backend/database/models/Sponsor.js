const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Sponsor = sequelize.define('Sponsor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_sponsor: { type: DataTypes.STRING },
    nom_sponsor_en: { type: DataTypes.STRING },
    description_accueil: { type: DataTypes.TEXT },
    description_accueil_en: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    description_en: { type: DataTypes.TEXT },
    image: { type: DataTypes.TEXT }
}, {
    tableName: 'sponsors',
    timestamps: false
});

module.exports = Sponsor;