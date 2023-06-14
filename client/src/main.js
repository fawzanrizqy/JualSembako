// import './assets/main.css'

import { createApp } from "vue";
import { createPinia } from "pinia";
import { markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
const app = createApp(App);

const pinia = createPinia();

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(vue3GoogleLogin, {
  clientId:
    "958063536391-vjoj5q00jruthui6qph3mr9r5qreel93.apps.googleusercontent.com",
});

app.use(pinia);
app.use(router);

app.mount("#app");

//local
//958063536391-jahj6slguekh26si78mq18h89nauiep7.apps.googleusercontent.com
//deploy
//958063536391-vjoj5q00jruthui6qph3mr9r5qreel93.apps.googleusercontent.com
