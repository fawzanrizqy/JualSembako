import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://jualsembako-production.up.railway.app";

export const useItemStore = defineStore("item", {
  state: () => ({
    itemList: [],
    itemPriceLogList: [],
    selectedItem: "",
  }),
  getters: {},
  actions: {
    /////////////////////FETCH ITEM/////////////////////////////////
    async fetchItem() {
      try {
        const { data } = await axios.get(`${baseUrl}/items`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.itemList = data.data;
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
    /////////////////////////FETCH PRICE LOGS////////////////////
    async fetchLog(id) {
      try {
        const { data } = await axios.get(`${baseUrl}/items/${id}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.itemPriceLogList = data;
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
    //////////////////////////////ADD ITEM//////////////////////////
    async addItem(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/items`, input, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        Swal.fire({
          width: 200,
          icon: "success",
          text: `${data.item.itemName} successfully added`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchItem();
        this.router.push("/items");
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
    ////////////////////////EDIT ITEM///////////////////////////
    async editItem(input) {
      try {
        const idEdit = +input.id;
        delete input.id;
        const { data } = await axios.put(`${baseUrl}/items/${idEdit}`, input, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        console.log(data);

        Swal.fire({
          width: 200,
          icon: "success",
          text: `${data.message}`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.fetchItem();
        this.router.push("/items");
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
