const { checkPass } = require("../helpers/encryptor");
const { signToken } = require("../helpers/tokenmaker");
const { OAuth2Client } = require("google-auth-library");
const {
  User,
  Item,
  ItemDetail,
  ItemPriceLog,
  Sales,
  Transaction,
  TransactionDetail,
  Purchase,
  PurchaseDetail,
} = require("../models");
const axios = require("axios");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

class Controller {
  static async googleLogin(req, res, next) {
    try {
      const { token_google } = req.body;

      const client = new OAuth2Client({
        clientId: process.env.CLIENT_ID,
      });

      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.CLIENT_ID,
      });

      const payload = await ticket.getPayload();

      const checkRegistered = await User.findOne({
        where: {
          email: payload.email,
        },
      });

      if (!checkRegistered) {
        throw {
          name: "validation_error",
          message: "Your email is not registered!",
          code: 401,
        };
      }

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          username: payload.given_name,
          password: payload.jti,
          role: "staff",
        },
        hooks: false,
      });

      let access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({
        access_token,
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getUser(req, res, next) {
    try {
      const userList = await User.findAll({
        attributes: ["username", "email", "id", "role"],
      });

      res.status(200).json(userList);
    } catch (err) {
      next(err);
    }
  }
  static async registerUser(req, res, next) {
    try {
      const { email, password, username, role } = req.body;

      const createdUser = await User.create({
        email,
        password,
        role,
        username,
      });

      res.status(201).json({
        data: {
          id: createdUser.id,
          email: createdUser.email,
          username: createdUser.username,
          role: createdUser.role,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw {
          name: "validation_error",
          message: "Email required",
          code: 400,
        };
      }
      if (!password) {
        throw {
          name: "validation_error",
          message: "Password required",
          code: 400,
        };
      }

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw {
          name: "not_found",
          message: "Invalid email/password",
          code: 401,
        };
      }

      const isValidPass = checkPass(password, user.password);

      if (!isValidPass) {
        throw {
          name: "not_found",
          message: "Invalid email/password",
          code: 401,
        };
      }

      const access_token = signToken({ id: user.id, email: user.email });

      res.status(200).json({
        access_token,
        data: {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  ///////ITEM FUNCTION///////////////
  static async createItem(req, res, next) {
    try {
      const { itemName, itemPrice, itemDesc } = req.body;

      if (!itemName) {
        throw {
          name: "validation_error",
          message: "itemName required",
          code: 400,
        };
      }
      if (!itemPrice) {
        throw {
          name: "validation_error",
          message: "itemPrice required",
          code: 400,
        };
      }
      if (!itemDesc) {
        throw {
          name: "validation_error",
          message: "itemDesc required",
          code: 400,
        };
      }

      const item = await Item.create({
        itemName,
        itemPrice,
      });

      const detail = await ItemDetail.create({
        itemDesc,
        stock: 0,
        itemId: item.id,
      });

      const log = await ItemPriceLog.create({
        updatedDate: new Date(),
        oldPrice: item.itemPrice,
        newPrice: item.itemPrice,
        itemId: item.id,
      });

      res.status(201).json({
        item,
        detail,
        log,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getItems(req, res, next) {
    try {
      const itemList = await Item.findAll({
        include: [
          {
            model: ItemDetail,
          },
          {
            model: ItemPriceLog,
          },
        ],
      });

      res.status(200).json({
        data: itemList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getItemLogs(req, res, next) {
    try {
      const id = +req.params.id;

      const logList = await Item.findOne({
        include: [
          {
            model: ItemDetail,
          },
          {
            model: ItemPriceLog,
          },
        ],
        where: {
          id,
        },
      });

      res.status(200).json(logList);
    } catch (err) {
      next(err);
    }
  }

  static async deleteItem(req, res, next) {
    try {
      const id = +req.params.id;

      const deletedItem = await Item.destroy({
        where: {
          id,
        },
      });

      res.status(200).json({
        message: `item with id ${id} deleted successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateItem(req, res, next) {
    try {
      const id = +req.params.id;

      const checkItem = await Item.findByPk(id);

      if (!checkItem) {
        throw {
          name: "data_not_found",
          message: "Data not found",
          code: 404,
        };
      }

      const { itemName, itemPrice, itemDesc } = req.body;

      if (!itemName) {
        throw {
          name: "validation_error",
          message: "itemName required",
          code: 400,
        };
      }
      if (!itemPrice) {
        throw {
          name: "validation_error",
          message: "itemPrice required",
          code: 400,
        };
      }
      if (!itemDesc) {
        throw {
          name: "validation_error",
          message: "itemDesc required",
          code: 400,
        };
      }

      const updatedItem = await Item.update(
        {
          itemName,
          itemPrice,
        },
        {
          where: {
            id,
          },
        }
      );

      const updatedDetail = await ItemDetail.update(
        {
          itemDesc,
        },
        {
          where: {
            id,
          },
        }
      );

      if (itemPrice !== checkItem.itemPrice) {
        const log = await ItemPriceLog.create({
          updatedDate: new Date(),
          oldPrice: checkItem.itemPrice,
          newPrice: itemPrice,
          itemId: checkItem.id,
        });
      }

      res.status(200).json({
        message: `${checkItem.itemName} updated successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  //////////////////////////////SALES//////////////////////////////////////
  static async getSales(req, res, next) {
    try {
      const salesList = await Sales.findAll();

      res.status(200).json({
        data: salesList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createSales(req, res, next) {
    try {
      const { salesDate } = req.body;
      if (!salesDate) {
        throw {
          name: "validation_error",
          message: "salesDate required",
          code: 400,
        };
      }

      const checkSales = await Sales.findAll({
        where: {
          status: "active",
        },
      });

      if (checkSales.length >= 1) {
        throw {
          name: "validation_error",
          message: "There is another active sales",
          code: 400,
        };
      }

      const createdSales = await Sales.create({
        salesDate,
        salesTotal: 0,
        salesDiscount: 0,
        status: "active",
      });

      res.status(201).json({
        data: createdSales,
      });
    } catch (err) {
      next(err);
    }
  }
  static async updateTotalSales(req, res, next) {
    try {
      const { salesTotal, salesDiscount } = req.body;
      const activeSales = await Sales.findOne({
        where: {
          status: "active",
        },
      });

      let total = +activeSales.salesTotal + +salesTotal;
      let discount = +activeSales.salesDiscount + +salesDiscount;

      const patchTotal = await Sales.update(
        {
          salesTotal: total,
          salesDiscount: discount,
        },
        {
          where: {
            id: activeSales.id,
          },
        }
      );

      res.status(200).json({
        message: `Sales Total id: ${activeSales.id} updated successfully`,
      });
    } catch (err) {
      next(err);
    }
  }
  static async closeSales(req, res, next) {
    try {
      const activeSales = await Sales.findOne({
        where: {
          status: "active",
        },
      });

      const patchTotal = await Sales.update(
        {
          status: "done",
        },
        {
          where: {
            id: activeSales.id,
          },
        }
      );

      res.status(200).json({
        message: `Sales with id: ${activeSales.id} completed successfully`,
      });
    } catch (err) {
      next(err);
    }
  }

  /////////////////////////TRANSACTIONS////////////////////

  static async getTransactions(req, res, next) {
    try {
      let option = {};
      const { sales } = req.query;
      if (sales) {
        option.salesId = sales;
      }
      const transactionList = await Transaction.findAll({
        where: option,
      });

      res.status(200).json({
        data: transactionList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postTransactions(req, res, next) {
    try {
      const salesId = +req.params.salesId;
      const userId = +req.user.id;
      const {
        transactionTotal,
        transactionDiscount,
        paymentType,
        detailObject,
      } = req.body;

      const createdTrans = await Transaction.create({
        transactionTotal,
        transactionDiscount,
        paymentType,
        salesId,
        userId,
        status: "done",
      });

      const dataDetail = detailObject.map((elem) => {
        elem.transactionId = createdTrans.id;
        return elem;
      });

      console.log(dataDetail);
      const createdDetail = await TransactionDetail.bulkCreate(dataDetail);

      dataDetail.forEach((elem) => {
        ItemDetail.decrement("stock", {
          by: elem.quantity,
          where: { itemId: elem.itemId },
        });
      });

      //update sales total
      Sales.increment("salesTotal", {
        by: transactionTotal,
        where: { id: salesId },
      });

      Sales.increment("salesDiscount", {
        by: transactionDiscount,
        where: { id: salesId },
      });

      res.status(201).json({
        data: createdTrans,
        detail: createdDetail,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDetailTransaction(req, res, next) {
    try {
      const id = +req.params.id;
      const selectedTrans = await Transaction.findOne({
        where: {
          id,
        },
        include: {
          model: TransactionDetail,
          include: {
            model: Item,
          },
        },
      });

      if (!selectedTrans) {
        throw {
          name: "data_not_found",
          message: "Data not found",
          code: 404,
        };
      }

      res.status(200).json({
        data: selectedTrans,
      });
    } catch (err) {
      next(err);
    }
  }

  static async patchTransactionStatus(req, res, next) {
    try {
      const id = +req.params.id;

      const selectedTrans = await Transaction.findbyPk(id);

      if (!selectedTrans) {
        throw {
          name: "data_not_found",
          message: "Data not found",
          code: 404,
        };
      }

      const patchedTrans = await Transaction.update(
        { status: "invalid" },
        {
          where: {
            id,
          },
        }
      );

      res.status(200).json({
        message: `Transaction with id: ${patchedTrans.id} being invalid`,
      });
    } catch (err) {
      next(err);
    }
  }

  /////////////////////////PURCHASES////////////////////

  static async getPurchases(req, res, next) {
    try {
      const purchasesList = await Purchase.findAll();

      res.status(200).json({
        data: purchasesList,
      });
    } catch (err) {
      next(err);
    }
  }

  static async postPurchases(req, res, next) {
    try {
      const { purchaseTotal, purchaseDate, objectData } = req.body;
      const { id } = req.user;

      const createdPurchase = await Purchase.create({
        purchaseTotal,
        purchaseDate,
        userId: id,
      });

      const dataDetail = objectData.map((elem) => {
        elem.purchaseId = createdPurchase.id;
        return elem;
      });

      dataDetail.forEach((elem) => {
        ItemDetail.increment("stock", {
          by: elem.quantity,
          where: { itemId: elem.itemId },
        });
      });

      const detailPurchase = await PurchaseDetail.bulkCreate(dataDetail);

      res.status(201).json({
        data: createdPurchase,
        detail: detailPurchase,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getDetailPurchases(req, res, next) {
    try {
      const id = +req.params.id;

      const selectedPurchase = await Purchase.findOne({
        where: {
          id,
        },
        include: {
          model: PurchaseDetail,
          include: {
            model: Item,
          },
        },
      });

      if (!selectedPurchase) {
        throw {
          name: "data_not_found",
          message: "Data not found",
          code: 404,
        };
      }

      res.status(200).json({
        data: selectedPurchase,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
