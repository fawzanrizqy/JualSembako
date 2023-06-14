import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://jualsembako-production.up.railway.app";

export const useDashboardStore = defineStore("Dashboard", {
  state: () => ({
    initial: {
      labels: [
        "Daging Ayam",
        "Beras",
        "Daging Sapi",
        "Telur Ayam",
        "Bawang Merah",
        "Bawang Putih",
        "Cabai Merah",
        "Cabai Rawit",
        "Minyak Goreng",
        "Gula Pasir",
      ],
      datasets: [
        {
          label: "cost of groceries",
          data: [
            45600, 13700, 233150, 28900, 62400, 44950, 97000, 99450, 23350,
            13250,
          ],
          borderColor: "#36A2EB",
          backgroundColor: "#9BD0F5",
          color: "rgb(255, 255, 255)",
        },
      ],
    },
  }),
  getters: {},
  actions: {
    async initialView() {
      try {
        const { data } = await axios.get(`${baseUrl}/groceries`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.initial = data.data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.error;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },
    async byItem(item) {
      try {
        const { data } = await axios.get(`${baseUrl}/groceries?item=${item}`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });
        this.initial = data.data;
      } catch (err) {
        console.log(err);
        const error = err.response.data.error;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error}`,
        });
      }
    },
  },
});
