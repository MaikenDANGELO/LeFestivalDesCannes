const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');

const Notif = sequelize.define('Notif', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_user: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' } },
    message: { type: DataTypes.STRING }
}, {
    tableName: 'notif',
    timestamps: false
});

module.exports = Notif;