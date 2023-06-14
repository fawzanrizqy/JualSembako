"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ItemDetail extends Model {
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
  ItemDetail.init(
    {
      itemDesc: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Item Descripion Must be filled!",
          },
          notEmpty: {
            msg: "Item Descripion Must be filled!",
          },
        },
      },
      stock: DataTypes.INTEGER,
      itemId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ItemDetail",
    }
  );
  return ItemDetail;
};
