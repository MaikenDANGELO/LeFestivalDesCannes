const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const Utilisateur = require('./Utilisateur');

const Canard = sequelize.define('Canard', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    espece: {
        type: DataTypes.STRING,
        allowNull: false
    },
    region: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_proprietaire: {
        type: DataTypes.INTEGER,
        references: {
            model: Utilisateur,
            key: 'id'
        },
        allowNull: false
    }
}, {
    tableName: 'canards',
    timestamps: false
});

// Relation entre les modèles
Canard.belongsTo(Utilisateur, { foreignKey: 'id' });

module.exports = Canard;
