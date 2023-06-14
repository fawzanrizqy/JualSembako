const axios = require("axios");
const midtransClient = require("midtrans-client");
const Mail = require("../helpers/nodemailer");
const { Transaction, TransactionDetail, Item } = require("../models");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

class ApiController {
  static async exportXls(req, res, next) {
    try {
      const salesId = +req.params.id;

      const dataTrans = await Transaction.findAll({
        attributes: [
          "id",
          "salesId",
          "userId",
          "paymentType",
          "transactionDiscount",
          "transactionTotal",
        ],
        where: {
          salesId,
        },
        include: {
          model: TransactionDetail,
          attributes: ["itemId", "quantity", "price"],
          include: {
            model: Item,
            attributes: ["itemName"],
          },
        },
      });

      res.status(200).json(dataTrans);
    } catch (err) {
      next(err);
    }
  }

  static async nodemailerSend(req, res, next) {
    try {
      const { email } = req.body;
      Mail(email);

      res.status(200).json({
        message: "email sent",
      });
    } catch (err) {
      next(err);
    }
  }

  static async fetchItemData(req, res, next) {
    try {
      const { item, location } = req.query;

      const { data } = await axios.get(
        `https://jibs.my.id/api/harga_komoditas`
      );

      let selected = {};
      if (!item) {
        let init = Object.keys(data.national_commodity_price);
        let price = [];

        for (let i = 0; i < init.length; i++) {
          console.log(data.national_commodity_price[init[i]]);
          let sorted = data.national_commodity_price[init[i]].filter(
            (elem) => elem.name === "DKI Jakarta"
          );
          price.push(+sorted[0].value);
        }

        selected.labels = init;
        selected.datasets = [
          {
            label: "cost of groceries",
            data: price,
            borderColor: "#36A2EB",
            backgroundColor: "#9BD0F5",
          },
        ];
      } else {
        if (!location) {
          let labels = data.national_commodity_price[item].map((elem) => {
            return elem.name;
          });
          let price = data.national_commodity_price[item].map((elem) => {
            return +elem.value;
          });
          selected.labels = labels;
          selected.datasets = [
            {
              label: item,
              data: price,
              borderColor: "#36A2EB",
              backgroundColor: "#9BD0F5",
            },
          ];
        } else {
          const sorted = data.national_commodity_price[item].filter(
            (elem) => elem.name === location
          );
          selected = sorted[0];
        }
      }
      res.status(200).json({
        data: selected,
      });
    } catch (err) {
      next(err);
    }
  }

  static async midtransPayment(req, res, err) {
    try {
      const { total } = req.body;

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id:
            "DEBIT_ORDER-" + Math.floor(1000000 + Math.random() * 99999),
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          // first_name: "budi",
          // last_name: "pratama",
          email: "customer.pra@example.com",
          // phone: "08111222333",
        },
      };

      const midtransToken = await snap.createTransaction(parameter);

      res.status(200).json(midtransToken);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ApiController;
