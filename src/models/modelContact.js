const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const contactSchema = sequelize.define('modelContact', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nom: {
    type: DataTypes.STRING(50),
    allowNull: false,
    required:true
  },
   telephone: {
    type: DataTypes.STRING(12),
    allowNull: false,
    required:true
  },
})
module.exports = contactSchema;