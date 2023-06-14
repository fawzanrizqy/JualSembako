import { defineStore } from "pinia";
import axios from "axios";
// const baseUrl = "http://localhost:3000";
const baseUrl = "https://jualsembako-production.up.railway.app";
export const useMainStore = defineStore("main", {
  state: () => ({
    loggedState: false,
    userId: 0,
    userName: "",
    userEmail: "",
    userRole: "",
    showModal: false,
    userList: [],
  }),
  getters: {},
  actions: {
    /////////////////////TOGGLE MODAL//////////////////
    toggleModal() {
      this.showModal === false
        ? (this.showModal = true)
        : (this.showModal = false);
    },
    /////////////////////CHECKSTATE////////////////////
    checkState() {
      if (localStorage.getItem("access_token")) {
        this.loggedState = true;
        this.userEmail = localStorage.getItem("email");
        this.userId = localStorage.getItem("id");
        this.userName = localStorage.getItem("username");
        this.userRole = localStorage.getItem("role");
      } else {
        this.loggedState = false;
        localStorage.clear();
      }
    },
    ///////////////////HANDLE LOGOUT////////////////////////
    handleLogout() {
      this.loggedState = false;
      localStorage.clear();
      this.router.push({ name: "login" });
    },
    //////////////HANDLE LOGIN////////////
    async handleLogin(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/login`, input);

        this.userEmail = data.data.email;
        this.userId = data.data.id;
        this.userName = data.data.username;
        this.userRole = data.data.role;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("role", data.data.role);

        this.loggedState = true;
        Swal.fire({
          width: 200,
          icon: "success",
          text: `login success`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.router.push({ name: "home" });
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
    async addUser(input) {
      try {
        const { data } = await axios.post(`${baseUrl}/register`, input);

        Swal.fire({
          width: 200,
          icon: "success",
          text: `User added successfully`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.getUsers();
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

    async getUsers() {
      try {
        const { data } = await axios.get(`${baseUrl}/users`, {
          headers: {
            access_token: localStorage.getItem("access_token"),
          },
        });

        this.userList = data;
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

    //GOOOGLE////
    async callback(response) {
      try {
        const { data } = await axios.post(`${baseUrl}/glogin`, {
          token_google: response.credential,
        });

        this.userEmail = data.data.email;
        this.userId = data.data.id;
        this.userName = data.data.username;
        this.userRole = data.data.role;

        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("email", data.data.email);
        localStorage.setItem("id", data.data.id);
        localStorage.setItem("username", data.data.username);
        localStorage.setItem("role", data.data.role);

        this.loggedState = true;
        this.router.push({ name: "sales" });

        Swal.fire({
          width: 200,
          icon: "success",
          text: `${data.data.username} Login success`,
          showConfirmButton: false,
          timer: 1500,
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
    //////////////SEND EMAIL/////////////////
    async sendEmail(email) {
      try {
        const { data } = await axios.post(`${baseUrl}/sendemail`, email);

        Swal.fire({
          width: 200,
          icon: "success",
          text: `Request sent, please wait for our reply`,
          showConfirmButton: false,
          timer: 1500,
        });

        this.showModal = false;
        this.router.push({ name: "login" });
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
