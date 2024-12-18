const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Utilisateur = sequelize.define('Utilisateur', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom_utilisateur: { type: DataTypes.STRING },
    email_utilisateur: { type: DataTypes.STRING, unique: true },
    mot_de_passe: { type: DataTypes.STRING },
    adresse_utilisateur: { type: DataTypes.STRING },
    telephone: { type: DataTypes.STRING },
    date_inscription: { type: DataTypes.DATE },
    role: { type: DataTypes.STRING }
}, {
    tableName: 'utilisateurs',
    timestamps: false
});

module.exports = Utilisateur;