const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const Emplacement = sequelize.define('Emplacement', {
    id: { 
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    type: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    coordinates: { 
        type: DataTypes.JSON, 
        allowNull: false 
    },
    points: { 
        type: DataTypes.JSON, 
        allowNull: true 
    },
    icon: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    fill_color: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    stroke_color: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    stroke_width: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    opacity: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, {
    tableName: 'emplacements',
    timestamps: false
});

module.exports = Emplacement;
