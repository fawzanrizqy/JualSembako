import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://jualsembako-production.up.railway.app";
export const usePurchaseStore = defineStore("Purchase", {
  state: () => ({
    purchaseList: [],
    purchaseDetailList: [],
  }),
  getters: {},
  actions: {
    /////////////////////FETCH Purchase/////////////////////////////////
    async fetchPurchase() {
      try {
        const { data } = await axios.get(`${baseUrl}/purchases`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.purchaseList = data.data;
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
    ////////////////////////////////POST PURCHASE/////////////////////
    async postPurchase(input) {
      try {
        let total = 0;
        input.forEach((element) => {
          total += element.quantity * element.price;
          console.log(element.quantity, element.price);
        });

        let dataPurchase = {
          purchaseTotal: total,
          purchaseDate: new Date(),
          objectData: input,
        };
        const { data } = await axios.post(
          `${baseUrl}/purchases`,
          dataPurchase,
          {
            headers: {
              access_token: localStorage.getItem("access_token"),
            },
          }
        );

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Purchase success`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchPurchase();
        this.router.push({ name: "purchase" });
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
    ////////////////////////////////POST PURCHASE/////////////////////
    async fetchDetailPurchase(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/purchases/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.purchaseDetailList = data.data;
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
