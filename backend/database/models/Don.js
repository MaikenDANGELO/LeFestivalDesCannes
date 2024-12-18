const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');
const Utilisateur = require('./Utilisateur');

const Don = sequelize.define('Don', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_utilisateur: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
    id_prestataire: { type: DataTypes.INTEGER, references: { model: Prestataire, key: 'id' } },
    message: { type: DataTypes.TEXT },
    montant: { type: DataTypes.DECIMAL(10, 2) },
    date: { type: DataTypes.DATE }
}, {
    tableName: 'dons',
    timestamps: false
});

module.exports = Don;