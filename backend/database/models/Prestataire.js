const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');

const Prestataire = sequelize.define('Prestataire', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    description_accueil: { type: DataTypes.STRING },
    categorie: { type: DataTypes.STRING },
    id_emplacement: { type: DataTypes.INTEGER },
    id_evenement: { type: DataTypes.INTEGER },
    page_route: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    id_utilisateur: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } }
}, {
    tableName: 'prestataires',
    timestamps: false
});

module.exports = Prestataire;