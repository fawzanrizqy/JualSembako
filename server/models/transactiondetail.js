"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Transaction, { foreignKey: "transactionId" });
      this.belongsTo(models.Item, { foreignKey: "itemId" });
    }
  }
  TransactionDetail.init(
    {
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
      transactionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "TransactionDetail",
    }
  );
  return TransactionDetail;
};
