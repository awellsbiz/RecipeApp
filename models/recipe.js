'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recipe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //1:M with 1 recipe to many users
      models.recipe.belongsToMany(models.user, {through: 'favorites'})
      //1:M comments
      models.recipe.hasMany(models.comment)
    }
  }
  recipe.init({
    label: DataTypes.STRING,
    ingredientLines: DataTypes.STRING,
    url: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'recipe',
  });
  return recipe;
};