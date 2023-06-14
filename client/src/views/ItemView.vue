<script>
import { mapActions, mapState } from 'pinia';
import { useItemStore } from '../stores/itemstore';
import { useMainStore } from '../stores/mainstore';
import Modal from '../components/Modal.vue';

export default{
    name: "ItemView",
    data(){
    return{
        titleModal:"",
    }
    },
    methods: {
        ...mapActions(useItemStore, ["fetchItem"]),
        ...mapActions(useMainStore, ["toggleModal"]),
        clickAdd()
        {
            this.titleModal = "Add New Item",
            this.toggleModal();
            this.$router.push({name:`add`})
        },
        clickPriceLog(val)
        {
            this.titleModal = "Item Price Logs",
            this.toggleModal();
            this.$router.push({name:`logs`, params:{itemId:val}})
        },
        clickEdit(val)
        {
            this.titleModal = "Edit Item",
            this.toggleModal();
            this.$router.push({name:`edit`, params:{itemId:val}})
        }
    },
    computed: {
        ...mapState(useItemStore, ["itemList"]),
        ...mapState(useMainStore, ["showModal"])
    },
    created() {
        this.fetchItem();
    },
    components: { Modal }
}
</script>

<template>
    <div class="page-header">
	<h2 class="text-left text-white">Items</h2>
	</div>

    <table class="table table-bordered text-light text-center">
        <thead>
            <tr>
                <th>#</th>
                <th>Item Name</th>
                <th>Item Price</th>
                <th>Item Description</th>
                <th>Item Stock</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item,index) in itemList" :key="item.id">
                <td>{{ index+1 }}</td>
                <td>{{ item.itemName }}</td>
                <td>{{ item.itemPrice }}</td>
                <td>{{ item.ItemDetail.itemDesc }}</td>
                <td>{{ item.ItemDetail.stock }}</td>
                <td>
                    <button class="btn btn-sm btn-outline-light me-2" @click="clickPriceLog(item.id)">Price Logs</button>
                    <button class="btn btn-sm btn-outline-primary" @click="clickEdit(item.id)">Edit Items</button>
                </td>
            </tr>
        </tbody>
    </table>
    <Modal :title="titleModal" v-if="showModal"/>

    <div class="form-group">
		<button class="btn btn-light"  @click="clickAdd">Add New Item</button>
	</div>

    
</template>

<style>

</style>