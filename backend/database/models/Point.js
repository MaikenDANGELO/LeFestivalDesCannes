const { DataTypes } = require('sequelize');
const sequelize = require('../connection');
const MapData = require('./MapData');

const Point = sequelize.define('Point', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    map_id: { type: DataTypes.INTEGER, references: { model: MapData, key: 'id' } },
    x_coord: { type: DataTypes.STRING },
    y_coord: { type: DataTypes.STRING }
}, {
    tableName: 'points',
    timestamps: false
});

module.exports = Point;