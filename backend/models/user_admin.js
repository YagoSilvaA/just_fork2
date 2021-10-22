'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User_admin.init({
    user_name: DataTypes.STRING,
    user_lname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ubication: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_admin',
  });
  return User_admin;
};