<script>
import { mapActions } from 'pinia';
import { useItemStore } from '../stores/itemstore';
import { useMainStore } from '../stores/mainstore';

export default{
name: 'ItemAddView',
methods:{
...mapActions(useItemStore,['addItem']),
...mapActions(useMainStore, ["toggleModal"]),
submitAdd(val)
{
this.addItem(val)
this.toggleModal();
}
},
data(){
return{
    item:{
        itemName:"",
        itemPrice:"",
        itemDesc:""
    }
}
}
}
</script>

<template>
    <div class="container">
        <form @submit.prevent="submitAdd(item)">
        <div class="row mb-1">
            <div class="form-group col-md-6 mb-3">
                <label for="name">Item Name</label>
                <input v-model="item.itemName" type="text" class="form-control" id="nama_Items" name="nama_Items" placeholder="Item Name"  required/> 		
            </div>
            
            <div class="form-group col-md-6">
                <label for="name">Item Price</label>
                <input v-model="item.itemPrice" type="number" min="0" class="form-control" id="harga_Item" name="harga_Item" placeholder="Item Price"  required/> 		
            </div>
            
        </div>
        <div class="row mb-3">
            <div class="form-group col-md-12">
                
                <label for="name">Item Description</label>
                <textarea v-model="item.itemDesc" class="form-control" rows="2" placeholder="Description" style="resize: none;" required></textarea>
            </div>
            
        </div>
        <button id="btn-simpan-peer" type="submit" class="btn btn-sm btn-light" style="position:fixed; bottom: 21;left:90;">Save</button>
    </form>
	 </div>
</template>

<style>
</style>