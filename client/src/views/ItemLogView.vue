<script>
import { mapActions, mapState } from 'pinia';
import { useItemStore } from '../stores/itemstore';

export default{
name: 'ItemLogView',
methods:{
    ...mapActions(useItemStore,['fetchLog'])
},
computed:
{
    ...mapState(useItemStore,['itemPriceLogList'])
},
created()
{
this.fetchLog(this.$route.params.itemId);
},
}
</script>

<template>
   <table class="table table-bordered table-responsive text-light">
    <thead>

        <tr>
            <th>#</th>
            <th>Old Price</th>
            <th>New Price</th>
            <th>Updated Date</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(log,index) in itemPriceLogList.ItemPriceLogs" :key="log.id">
            <td>{{ index+1 }}</td>
            <td>{{ log.oldPrice }}</td>
            <td>{{ log.newPrice }}</td>
            <td>{{ log.updatedDate }}</td>
        </tr>
    </tbody>
   </table>
</template>

<style>
</style>