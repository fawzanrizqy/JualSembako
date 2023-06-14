<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/mainstore';

export default{
name: 'UserNewView',
methods:{
...mapActions(useMainStore, ["toggleModal",'addUser']),
submitAdd(val)
{
this.addUser(val)
this.toggleModal();
}
},
data(){
return{
    user:{
        email:"",
        password:"",
        role:"",
        username:"",
    }
}
}
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="submitAdd(user)">
        <div class="row mb-1">
            <div class="form-group col-md-6 mb-3">
                <label for="name">Email</label>
                <input v-model="user.email" type="email" class="form-control" id="nama_Items" name="nama_Items" placeholder="Email"  required/> 		
            </div>
            
            <div class="form-group col-md-6">
                <label for="name">Password</label>
                <input v-model="user.password" type="password"  class="form-control" id="harga_Item" name="harga_Item" placeholder="Password"  required/> 		
            </div>
            
        </div>
        <div class="row mb-1">
            <div class="form-group col-md-6 mb-3">
                <label for="name">Username</label>
                <input v-model="user.username" type="text" class="form-control" id="nama_Items" name="nama_Items" placeholder="Username"  required/> 		
            </div>
            
            <div class="form-group col-md-6">
                <label for="name">Role</label>
                <select v-model="user.role" class="form-control">
                    <option value="staff">Staff</option>
                    <option value="admin">Admin</option>
                </select>
            </div>
            
        </div>
        <button id="btn-simpan-peer" type="submit" class="btn btn-sm btn-light" style="position:fixed; bottom: 21;left:90;">Save</button>
    </form>
	 </div>
</template>

<style>
</style>