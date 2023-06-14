<script>
import { mapActions, mapState } from 'pinia';
import { usePurchaseStore } from '../stores/purchasestore';

export default{
name: 'PurchaseDetail',
methods:{
    ...mapActions(usePurchaseStore,['fetchDetailPurchase'])
},
computed:
{
    ...mapState(usePurchaseStore,['purchaseDetailList'])
},
created()
{
this.fetchDetailPurchase(this.$route.params.id);
},
}
</script>

<template>

    <table class="table table-bordered table-responsive text-light">
    <thead>

        <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Price</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(detail,index) in purchaseDetailList.PurchaseDetails" :key="detail.id">
            <td>{{ index+1 }}</td>
            <td>{{ detail.Item.itemName }}</td>
            <td>{{ detail.quantity }}</td>
            <td>{{ detail.price}}</td>
        </tr>
    </tbody>
   </table>
</template>

<style>
</style>