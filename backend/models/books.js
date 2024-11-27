const { Sequelize, DataTypes } = require('sequelize');
const sequelize = global.sequelize;
 
const Book = sequelize.define(
  'book',
  {
    // Model attributes are defined here
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // allowNull defaults to true
    },
  },
  {
    // Other model options go here
  },
);
 
 
module.exports = Book;