<script>
import { mapActions, mapState } from 'pinia';
import { useSalesStore } from '../stores/salesstore';
import { useMainStore } from '../stores/mainstore';
import Modal from '../components/Modal.vue';

export default{
    name: "TransactionView",
    methods: {
        ...mapActions(useSalesStore, ["fetchTrans", "tesprint"]),
        ...mapActions(useMainStore, ["toggleModal"]),
        clickDetail(val) {
            this.toggleModal();
            this.$router.push({ name: "transactionDetail", params: { detailId: val } });
        }
    },
    computed: {
        ...mapState(useSalesStore, ["transList"]),
        ...mapState(useMainStore, ["showModal"])
    },
    created() {
        this.fetchTrans(this.$route.params.id);
    },
    components: { Modal }
}
</script>

<template>
    <div class="page-header">
	<h2 class="text-left text-white">Transactions of Sales {{ $route.params.id }}</h2>
	</div>
    <table class="table table-bordered text-light text-center">
        <thead>
            <tr>
                <th>#</th>
                <th>Transaction ID</th>
                <th>Transaction Discount</th>      
                <th>Transaction Net</th>
                <th>Transaction Total</th>
                <th>Payment Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(trans,index) in transList" :key="trans.id">
                <td>{{ index+1 }}</td>
                <td>{{trans.id}}</td>
                <td>{{trans.transactionDiscount}}</td>      
                <td>{{trans.transactionTotal -trans.transactionDiscount}}</td>      
                <td>{{trans.transactionTotal}}</td>
                <td>{{trans.paymentType}}</td>
                <td>{{trans.status}}</td>
                <td>
                    <button class="btn btn-sm btn-outline-light" @click="clickDetail(trans.id)">Detail</button>
                </td>
            </tr>
        </tbody>
    </table>
    <Modal :title="'Detail Transaction'" v-if="showModal"  />

    <div class="form-group">  
        <RouterLink :to="'/transactions-add/'+$route.params.id">
            <button class="btn btn-light">Add New Transaction</button>
        </RouterLink>
	</div>
</template>

<style>
</style>