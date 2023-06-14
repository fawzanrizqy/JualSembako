<script>
import { mapActions, mapState } from 'pinia';
import { useItemStore } from '../stores/itemstore';
import { useMainStore } from '../stores/mainstore';
import TrowsPurchase from '../components/TrowsPurchase.vue';
import { usePurchaseStore } from '../stores/purchasestore';


export default{
    name: "PurchaseAddView",
    data() {
        return {
            tabledata: [],
            counter: 0
        };
    },
    methods: {
        ...mapActions(useItemStore, ["fetchItem"]),
        ...mapActions(useMainStore, ["toggleModal"]),
        ...mapActions(usePurchaseStore,["postPurchase"]),
        addTableRow(val) {
            let checkName = false

            this.tabledata.forEach(elem => {
                if(elem.itemId === val.id)
                {
                    checkName = true
                }
            });

            if(checkName)
            {
                Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Item ${val.name} sudah diinput`,
                });
            }
            else
            {
                let data = {
                itemId: val.id,
                itemName: val.name,
                quantity: 1,
                price: 0
            };
            this.tabledata.push(data);
            this.counter++;
            }

           
        },
        submitPurchase(val) {
            this.postPurchase(val);
        },
        changeprice(val)
        {
            this.tabledata[val.counter].price = val.price;
        },
        changeqty(val)
        {
            this.tabledata[val.counter].quantity = val.quantity;
        },
    
    },
    computed: {
        ...mapState(useItemStore, ["itemList"]),
        ...mapState(useMainStore, ["showModal"])
    },
    created() {
        this.fetchItem();
    },
    components: { TrowsPurchase }
}
</script>

<template>
	<div class="page-header">
	<h2 class="text-left text-light">New Purchase</h2>
	</div>
  <!-- container -->
  <div class="container">

    <div class="row">
    <div class="col" >
        <div class="page-header">
            <h5 class="text-left text-secondary mb-2">
                Item List
            </h5>
            </div>
      <!-- row card -->
<div class="row d-flex justify-content-center" style="overflow-y: auto; max-height: 25rem;">

<div class="card col-2 m-2" style="width: 10rem"
v-for="(item,index) in itemList" :key="item.id">
<div class="card-body text-center">
<h6 class="card-title">{{item.itemName}}</h6>
<a href="#" class="btn btn-primary btn-sm" @click.prevent='addTableRow({id:item.id, name:item.itemName})'><i class="fa fa-plus"></i></a>
</div>
</div> 
</div> 
<!-- row card -->
    </div>
    <div class="col">
        <div class="page-header">
            <h5 class="text-left text-secondary mb-2">
                List Purchase
            </h5>
        </div>
        <form @submit.prevent="submitPurchase(tabledata)">
        <div class="col-md-12" style="height: 20rem;overflow-y:scroll;">
           
            <table class="table table-bordered text-white">
			<thead>
				<tr class="success">
					<th width="50%">Menu</th>
					<th width="15%">Qty</th>
					<th>Price</th>
				</tr>
			</thead>
			<tbody style="font-size:11" id="tabel-body">
                <TrowsPurchase v-for="(item, index) in tabledata" :key="item.itemId"
                :id="item.itemId"
                :name="item.itemName"
                :quantity="item.quantity"
                :price="item.price"
                :counter="this.counter-1"
                @chprice="changeprice"
                @chqty="changeqty"
                />
			</tbody>
		</table>
		
	</div>
        
  <div class="mt-3">
	<button class="btn btn-primary float-end" type="submit" id="btn-submit" style="position: absolute;right:25;bottom:30;">Submit</button>
	</div>
</form>
    </div>
    <!-- col -->
  </div>
      <!-- row -->
</div> 
<!-- container -->    

</template>

<style scoped>
.card{
    cursor: pointer;
}

.card:hover{
    background: rgb(136, 132, 132);
}
</style>