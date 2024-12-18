const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Billetterie = sequelize.define('Billetterie', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nombre_billets: { type: DataTypes.INTEGER },
    prix_total: { type: DataTypes.INTEGER },
    date_achat: { type: DataTypes.DATE },
    email: { type: DataTypes.STRING }
}, {
    tableName: 'billetterie',
    timestamps: false
});

module.exports = Billetterie;