"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TransactionDetail, { foreignKey: "itemId" });
      this.hasMany(models.ItemPriceLog, { foreignKey: "itemId" });
      this.hasMany(models.PurchaseDetail, { foreignKey: "itemId" });
      this.hasOne(models.ItemDetail, { foreignKey: "itemId" });
    }
  }
  Item.init(
    {
      itemName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item Name Must be filled!",
          },
          notEmpty: {
            msg: "Item Name Must be filled!",
          },
        },
      },
      itemPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item Price Must be filled!",
          },
          notEmpty: {
            msg: "Item Price Must be filled!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};
