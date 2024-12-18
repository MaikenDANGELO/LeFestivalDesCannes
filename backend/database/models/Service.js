const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');

const Service = sequelize.define('Service', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_service: { type: DataTypes.STRING },
    nom_service: { type: DataTypes.STRING },
    description_service: { type: DataTypes.TEXT },
    lien_service: { type: DataTypes.STRING },
    statut_service: { type: DataTypes.STRING },
    id_prestataire: { type: DataTypes.INTEGER, references: { model: Prestataire, key: 'id' } }
}, {
    tableName: 'services',
    timestamps: false
});

module.exports = Service;