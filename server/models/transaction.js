"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sales, { foreignKey: "salesId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.TransactionDetail, { foreignKey: "transactionId" });
    }
  }
  Transaction.init(
    {
      transactionTotal: DataTypes.INTEGER,
      transactionDiscount: DataTypes.INTEGER,
      paymentType: DataTypes.STRING,
      status: DataTypes.STRING,
      salesId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
