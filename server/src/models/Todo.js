const { DataTypes, Model, Sequelize } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Todo = sequelize.define("todos", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at'
    },
  });

  return Todo;
};