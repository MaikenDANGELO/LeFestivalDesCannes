const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');

const MotDePasseUtilisateur = sequelize.define('MotDePasseUtilisateur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_Id: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
    date_Created: { type: DataTypes.DATE },
    password: { type: DataTypes.STRING }
}, {
    tableName: 'MOTS_DE_PASSE_UTILISATEURS',
    timestamps: false
});

module.exports = MotDePasseUtilisateur;