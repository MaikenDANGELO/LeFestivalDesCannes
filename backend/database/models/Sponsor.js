const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Sponsor = sequelize.define('Sponsor', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_sponsor: { type: DataTypes.STRING },
    nom_sponsor: { type: DataTypes.STRING },
    description_accueil: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
    image: { type: DataTypes.STRING }
}, {
    tableName: 'sponsors',
    timestamps: false
});

module.exports = Sponsor;