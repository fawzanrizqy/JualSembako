<script>
import { mapActions, mapState } from 'pinia';
import { useSalesStore } from '../stores/salesstore';

export default{
name: 'TransactionDetailView',
computed: {
    ...mapState(useSalesStore,['detailList'])
},
methods:
{
    ...mapActions(useSalesStore,['getDetail'])
},
created()
{
    this.getDetail(this.$route.params.detailId);
}
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
        <tr v-for="(detail,index) in detailList.TransactionDetails" :key="detail.id">
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