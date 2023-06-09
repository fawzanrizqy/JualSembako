"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemPriceLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  ItemPriceLog.init(
    {
      updatedDate: DataTypes.DATE,
      oldPrice: DataTypes.INTEGER,
      newPrice: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ItemPriceLog",
    }
  );
  return ItemPriceLog;
};
