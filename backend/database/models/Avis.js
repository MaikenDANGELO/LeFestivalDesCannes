const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');
const Utilisateur = require('./Utilisateur');

const Avis = sequelize.define('Avis', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_prestataire: { type: DataTypes.INTEGER, references: { model: Prestataire, key: 'id' } },
    id_utilisateur: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
    texte: { type: DataTypes.TEXT },
    note: { type: DataTypes.INTEGER }
}, {
    tableName: 'avis',
    timestamps: false
});

module.exports = Avis;