<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/mainstore';
import Modal from '../components/Modal.vue';

export default{
    name: "LoginView",
    data() {
        return {
            login: {
                email: "",
                password: ""
            }
        };
    },
    computed:
    {
        ...mapState(useMainStore,['showModal'])
    },
    methods: {
        ...mapActions(useMainStore, ["checkState", "handleLogin", "callback",'toggleModal']),
        clickRequest()
        {
            this.toggleModal();
            this.$router.push({name:`request`});
        }
    },
    components: { Modal }
}
</script>

<template>
   <section class="d-flex float-none pt-lg-2" id="section-front">
    <div class="container"> <div class="row"> 
      <div class="col-md-6"> <div class="card"> 
        <form @submit.prevent="handleLogin(login)" class="box"> 
          <h1>Login</h1> 
          <p class="text-secondary"> Please enter your email and password!</p> 
          <input type="text" name="" placeholder="Email" v-model="login.email"> 
          <input type="password" name="" placeholder="Password" v-model="login.password"> 
         
           <input type="submit" name="" value="Login" href="#">
           <GoogleLogin  class="mt-3" :callback="callback"/>
           <div class="row">
           
               <a href="" @click.prevent="clickRequest">Request an id?</a>
           
           </div> 
        </form> 
        
    </div> </div> </div>
    <Modal v-if="showModal" :title="'Credential Request'"/>
</div>
</section>
</template>

<style scoped>
.card{
    margin-bottom:20px;
    border:none;
}

.box {
    width: 500px;
    padding: 20px;
    position: absolute;
    top: 10%;
    left: 50%;
    background: #191919;
    ;
    text-align: center;
    transition: 0.25s;
    margin-top: 40px
}

.box input[type="text"],
.box input[type="password"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #3498db;
    padding: 10px 10px;
    width: 250px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s
}

.box h1 {
    color: white;
    text-transform: uppercase;
    font-weight: 500
}

.box input[type="text"]:focus,
.box input[type="password"]:focus {
    width: 300px;
    border-color: #2ecc71
}

.box input[type="submit"] {
    border: 0;
    background: none;
    display: block;
    margin: 20px auto;
    text-align: center;
    border: 2px solid #2ecc71;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    cursor: pointer
}

.box input[type="submit"]:hover {
    background: #2ecc71
}

.forgot {
    text-decoration: underline
}
</style>