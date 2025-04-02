const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Canard = require('./Canard');

const Inscription = sequelize.define('Inscription', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    heure_defile: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_canard: {
        type: DataTypes.INTEGER,
        references: {
            model: Canard,
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'inscriptions',
    timestamps: false
});

// Relation entre les modèles
Inscription.belongsTo(Canard, { foreignKey: 'id_canard' });

module.exports = Inscription;
