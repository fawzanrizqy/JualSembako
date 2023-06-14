<script>
import { mapActions, mapState } from 'pinia';
import { usePurchaseStore } from '../stores/purchasestore';
import { useMainStore } from '../stores/mainstore';
import Modal from '../components/Modal.vue';

export default{
    name: "PurchaseView",
    data(){
    return{
        titleModal:""
    }
    },
    methods: {
        ...mapActions(usePurchaseStore, ["fetchPurchase"]),
        ...mapActions(useMainStore, ["toggleModal"]),
        clickDetail(val)
        {
            this.titleModal = "Item Price Logs",
            this.toggleModal();
            this.$router.push({name:`purchaseDetail`, params:{id:val}})
        },
    },
    computed: {
        ...mapState(usePurchaseStore, ["purchaseList"]),
        ...mapState(useMainStore, ["showModal"])
    },
    created() {
        this.fetchPurchase();
    },
    components: { Modal }
}
</script>

<template>
    <div class="page-header">
	<h2 class="text-left text-white">Purchases</h2>
	</div>

    <table class="table table-bordered text-light text-center">
        <thead>
            <tr>
                <th>#</th>
                <th>Purchase ID</th>
                <th>Purchase Date</th>
                <th>Purchase Total</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(purchase,index) in purchaseList" :key="purchase.id">
                <td>{{ index+1 }}</td>
                <td>{{ purchase.id }}</td>
                <td>{{ purchase.purchaseDate }}</td>
                <td>{{ purchase.purchaseTotal }}</td>
                <td>
                    <button class="btn btn-sm btn-outline-light me-2" @click="clickDetail(purchase.id)">Purchase Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
    <Modal v-if="showModal" :title="titleModal"/>
    <div class="form-group">
        <RouterLink to="/purchases/add">    
            <button class="btn btn-light"  @click="clickAdd">Add New Purchase</button>
        </RouterLink>
	</div>
</template>

<style>
</style>