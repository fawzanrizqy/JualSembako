<script>
import { mapActions, mapState } from 'pinia';
import { useItemStore } from '../stores/itemstore';
import { useMainStore } from '../stores/mainstore';
import TrowsSales from '../components/TrowsSales.vue';

import { useSalesStore } from '../stores/salesstore';

export default{
name: 'TransactionAddView',
data() {
        return {
            tabledata: [],
            counter: 0,
            nominal:0,
            persen:0,
            total:0,
            type:""
        };
    },
    methods: {
        ...mapActions(useItemStore, ["fetchItem"]),
        ...mapActions(useMainStore, ["toggleModal"]),
        ...mapActions(useSalesStore,["createTrans","payMidtrans"]),
        
        addTableRow(val) {
            // console.log(val);
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
                price: val.price
            };
           
            this.tabledata.push(data);
            let totalkotor = 0;
            this.tabledata.forEach(elem => {
                totalkotor+= (elem.price*elem.quantity)
            })
           
            this.total = totalkotor - this.nominal - (totalkotor*this.persen/100);
            this.total<0?this.total=0:'';
            this.counter++;
            }

           
        },
        submitSales(val) {
            if(this.type==='cash')
            {
                this.createTrans(val);
            }
            else
            {
                this.payMidtrans(val)
            }
        },
        changeprice(val)
        {
            this.tabledata[val.counter].price = val.price;
        },
        changeqty(val)
        {
            this.tabledata[val.counter].quantity = val.quantity;
            let totalkotor = 0;
            this.tabledata.forEach(elem => {
                totalkotor+= (elem.price*elem.quantity)
            })
           
            this.total = totalkotor - this.nominal - (totalkotor*this.persen/100);
            this.total<0?this.total=0:'';
        },
        calculateTotal()
        {
            let totalkotor = 0;
            this.tabledata.forEach(elem => {
                totalkotor+= (elem.price*elem.quantity)
            })
           
            this.total = totalkotor - this.nominal - (totalkotor*this.persen/100);
            this.total<0?this.total=0:'';
        }
    
    },
    computed: {
        ...mapState(useItemStore, ["itemList"]),
        ...mapState(useMainStore, ["showModal"]),
     
    },
    created() {
        this.fetchItem();
    },
    components: { TrowsSales }
}
</script>

<template>
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
v-for="(item,index) in itemList" :key="item.id" @click.prevent='addTableRow({id:item.id, name:item.itemName, price:item.itemPrice})'>
<div class="card-body text-center">
<h6 class="card-title">{{item.itemName}}</h6>
<a href="#" class="btn btn-primary btn-sm" @click.prevent=''><i class="fa fa-plus"></i></a>
</div>
</div> 
</div> 
<!-- row card -->
</div>
<div class="col">
    <div class="page-header">
        <h5 class="text-left text-secondary mb-2">
            List Order
        </h5>
    </div>
    <form @submit.prevent="submitSales({id:$route.params.id,totalnet:total,type,detail:tabledata})">
       
    <div class="form-group text-white mb-2">
         <label class="mb-1">Payment Type</label>
		<select v-model="type" class="form-control mb-2">
			<option value="cash">Cash</option>
			<option value="debit">Debit</option>
		</select>
        </div>
    
	
	<div class="form-group text-white mb-4">
    <label>Discount</label>

        <div class="row">
            <div class="col">
                <div class="form-group">
            <label class="mb-1">Percentage</label>	
            <div class="input-group">
            <input v-model="persen" @input="calculateTotal" type="text" class="form-control" name="disc" id="disc" aria-describedby="basic-addon2" onkeypress='return event.charCode >= 48 && event.charCode <= 57'>
            <div class="input-group-append ms-1">
            <span class="input-group-text" id="basic-addon2">%</span>
            </div>
        </div>
        </div>
            </div>
            <!-- col -->
            <div class="col">
                <div class="form-group">
            <label class="mb-1">Nominal</label>
            <input v-model="nominal" @input="calculateTotal" type="number" class="form-control" name="nom" id="nom" >
            </div>
            </div>
            <!-- col -->

        </div>
        <!-- row -->
	

	

 	 </div><!-- formgroup discout -->
   
        
       
        
    <div class="col-md-12" style="height: 15rem;overflow-y:scroll;">
       
        <table class="table table-bordered text-white">
        <thead>
            <tr class="success">
                <th width="40%">Menu</th>
                <th width="15%">Qty</th>
                <th>Price</th>
            </tr>
        </thead>
        <tbody style="font-size:11" id="tabel-body">
            <TrowsSales v-for="(item, index) in tabledata" :key="item.itemId"
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
    

    <div class="row mt-3">
        <div class="col">
            <input v-model="total" class="form-control me-5" type="text" placeholder="Order Total" readonly>
        </div>
        <div class="col">
        <button class="btn btn-primary float-end" type="submit" id="btn-submit" style="position: absolute;right:25;bottom:30;">Pay</button>
        </div>
    </div>

</form>
</div>
<!-- col -->
</div>
  <!-- row -->
</div> 
</template>

<style scoped>
.card{
    cursor: pointer;
}

.card:hover{
    background: rgb(136, 132, 132);
}
</style>