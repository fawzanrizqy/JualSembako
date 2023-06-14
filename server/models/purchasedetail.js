"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PurchaseDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Item, { foreignKey: "itemId" });
      this.belongsTo(models.Purchase, { foreignKey: "purchaseId" });
    }
  }
  PurchaseDetail.init(
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      purchaseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "PurchaseDetail",
    }
  );
  return PurchaseDetail;
};
