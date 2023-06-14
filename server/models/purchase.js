"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.PurchaseDetail, { foreignKey: "purchaseId" });
      this.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Purchase.init(
    {
      purchaseTotal: DataTypes.INTEGER,
      purchaseDate: DataTypes.DATE,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Purchase",
    }
  );
  return Purchase;
};
