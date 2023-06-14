<script>
import { mapActions } from 'pinia';
import { useMainStore } from '../stores/mainstore';
export default{
name: 'RequestView',
data(){
return{
email:""
}
},
methods:{
    ...mapActions(useMainStore,['sendEmail'])
},
}
</script>

<template>
   <div class="container">
        <form @submit.prevent="sendEmail(email)">
            <div class="form-group col-md-12">
                <label for="name" class="mb-2">Email Request</label>
                <input v-model="email" type="Email" class="form-control mb-3"  placeholder="Your Email"  required/> 		
            </div>
            <button id="btn-simpan-peer" type="submit" class="btn btn-sm btn-light" style="position:fixed; bottom: 21;left:90;">Save</button>
        </form>
        </div>
</template>

<style>
</style>