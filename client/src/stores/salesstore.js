import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://jualsembako-production.up.railway.app";
import PHE from "print-html-element";

export const useSalesStore = defineStore("Sales", {
  state: () => ({
    salesList: [],
    transList: [],
    detailList: [],
    reportList: [],
  }),
  getters: {},
  actions: {
    tesprint(data) {
      let tgl = data.data.createdAt.slice(0, 10);
      let html = `<table style='width:100%'>
      <tr><td>&nbsp;</td><td colspan='2'><center><b>Jual Sembako</b></center></td><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td><td>&nbsp;</td><td colspan='2' align='right'>${tgl}</td></tr>
      </table>
      <table style='width:100%'>
      <tr><td>Nomor</td><td>: ${data.data.id}</td></tr>
      <tr><td>Payment</td><td>: ${data.data.paymentType}</td></tr>
      </table><br>
      <table style='width:100%'>
      <tr> <td style='border-bottom: thin solid black;'>Item</td>
      <td style='border-bottom: thin solid black;'>Qty</td>
      <td style='border-bottom: thin solid black;' width='25%'>Price</td>
      <td style='border-bottom: thin solid black;' width='25%'>Amount</td>
      </tr>
      `;

      data.detail.forEach((elem) => {
        html += `<tr>
        <td>${elem.name}</td>
        <td>${elem.quantity}</td>
        <td>${elem.price}</td>
        <td>${elem.quantity * elem.price}</td>
        </tr>
        `;
      });

      html += `<tr><td style='border-top: thin solid black;'>&nbsp;</td><td style='border-top: thin solid black;'>&nbsp;</td><td style='border-top: thin solid black;'>&nbsp;</td><td style='border-top: thin solid black;'>&nbsp;</td><tr>`;
      html += `<tr><td>Sub Total : </td> <td colspan='3' align='right'>${data.data.transactionTotal}</td></tr>`;
      html += `<tr><td>Discount : </td> <td colspan='3'  align='right'>${data.data.transactionDiscount}</td></tr>`;
      html += `<tr><td>Total : </td> <td colspan='3' align='right'>${
        data.data.transactionTotal - data.data.transactionDiscount
      }</td></tr>`;

      PHE.printHtml(html);
    },

    async generateReport(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/exports/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        console.log(data);
        this.reportList = data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    async getDetail(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/transactions/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        // console.log(data);
        this.detailList = data.data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    ////////////////////////////////Get Sales/////////////////////
    async fetchSales() {
      try {
        const { data } = await axios.get(`${baseUrl}/sales`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.salesList = data.data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    async createSales() {
      try {
        const { data } = await axios.post(
          `${baseUrl}/sales`,
          { salesDate: new Date() },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Sales Created`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchSales();
        this.router.push({ name: "sales" });
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    ///////TRANSACTIONS LIST//////////
    async fetchTrans(id) {
      try {
        const { data } = await axios.get(
          `${baseUrl}/transactions?sales=${id}`,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        this.transList = data.data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    async createTrans(input) {
      try {
        let total = 0;
        input.detail.forEach((elem) => {
          total += elem.price * elem.quantity;
        });

        let diskon = total - input.totalnet;

        let { data } = await axios.post(
          `${baseUrl}/transactions/${input.id}`,
          {
            transactionTotal: total,
            transactionDiscount: diskon,
            paymentType: input.type,
            detailObject: input.detail,
          },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        const dataPrint = data.detail.map((elem, index) => {
          elem.name = input.detail[index].itemName;
          return elem;
        });

        // console.log(dataPrint);

        data.detail = dataPrint;
        // console.log(data);
        this.tesprint(data);

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Transaction Created`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchSales();
        this.router.push({ name: "transaction", params: { id: input.id } });
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },
    async payMidtrans(input) {
      try {
        const { data } = await axios.post(
          `${baseUrl}/midtrans`,
          { total: input.totalnet },
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        const cb = this.createTrans;

        window.snap.pay(data.token, {
          onSuccess: function (result) {
            Swal.fire({
              width: 200,
              icon: "success",
              text: `Payment success`,
              showConfirmButton: false,
              timer: 1500,
            });
            cb(input);
          },
          onPending: function (result) {
            /* You may add your own implementation here */
            Swal.fire({
              width: 200,
              icon: "warning",
              text: `wating your payment!`,
              showConfirmButton: false,
              timer: 1500,
            });
          },
          onError: function (result) {
            /* You may add your own implementation here */

            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `payment declined`,
            });
          },
          onClose: function () {
            Swal.fire({
              width: 200,
              icon: "info",
              text: `you close the payment interface`,
              showConfirmButton: false,
              timer: 1500,
            });
          },
        });
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },

    async completeSales() {
      try {
        const { data } = await axios.patch(
          `${baseUrl}/sales/done`,
          {},
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Sales Completed`,
          showConfirmButton: false,
          timer: 1500,
        });

        fetchSales();
        this.router.push({ name: "sales" });
      } catch (err) {
        console.log(err);
        const error = err.response.data.message;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },
  },
});
