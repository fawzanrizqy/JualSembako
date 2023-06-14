<script>
import { mapActions, mapState } from 'pinia';
import { useMainStore } from '../stores/mainstore';
import Modal from '../components/Modal.vue';

export default{
    name: "UserView",
    components: { Modal },
    methods:{
        ...mapActions(useMainStore,['toggleModal','getUsers']),
        clickNew()
        {
            this.toggleModal()
            this.$router.push({name:'userAdd'})
        }
    },
    computed:
    {
        ...mapState(useMainStore,['showModal','userList'])
    },
    created()
    {
    this.getUsers();
    },
}
</script>

<template>
    <div class="page-header">
	<h2 class="text-left text-white">Sales</h2>
	</div>

    <table class="table table-bordered text-light text-center">
        <thead>
            <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Username</th>
                <th>Role</th>      
            </tr>
        </thead>
        <tbody>
            <tr v-for="(user,index) in userList" :key="user.id">
                <td>{{ index+1 }}</td>
                <td>{{ user.id }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.username }}</td>
                <td>{{ user.role }}</td>
            </tr>
        </tbody>
        </table>
    <div class="form-group">  
            <button class="btn btn-light"  @click="clickNew">Add New User</button>
	</div>
    <Modal v-if="showModal" :title="'Add New User'"/>
</template>

<style>
</style>