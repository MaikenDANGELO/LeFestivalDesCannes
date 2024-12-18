const { DataTypes } = require('sequelize');
const sequelize = require('../connection');

const MapData = sequelize.define('MapData', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    fill_color: { type: DataTypes.STRING },
    stroke_color: { type: DataTypes.STRING },
    stroke_width: { type: DataTypes.STRING },
    opacity: { type: DataTypes.STRING }
}, {
    tableName: 'map_data',
    timestamps: false
});

module.exports = MapData;