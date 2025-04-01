const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Prestataire = require('./Prestataire');
const Utilisateur = require('./Utilisateur');

const Reservation = sequelize.define('Reservation', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_prestataire: { type: DataTypes.INTEGER, references: { model: Prestataire, key: 'id' } },
    date: { type: DataTypes.DATE },
    heure: { type: DataTypes.TIME },
    type_service: { type: DataTypes.STRING, validate: { isIn: [['balade', 'restaurant']] } },
    reserved_user_id: { type: DataTypes.INTEGER, references: { model: Utilisateur, key: 'id' }, allowNull: true },
    options: { type: DataTypes.JSON , allowNull: true}
}, {
    tableName: 'reservations',
    timestamps: false
});

module.exports = Reservation;