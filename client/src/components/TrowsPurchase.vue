<script>
export default{
name: 'TrowsPurchase',
props:['quantity','id','price','name','counter'],
emits:['chprice','chqty'],
data(){
return{
    itemquantity:this.quantity,
    itemid:this.id,
    itemprice:this.price,
    itemname:this.name,
    itemcounter:this.counter
}
},
methods:{
    changePrice(val)
    {
        this.$emit('chprice', val)
    },
    changeQuantity(val)
    {
        this.$emit('chqty', val)
    },
}
}
</script>

<template>
    <tr>
    <td>{{ itemname }}<input type='hidden' class='form-control id_menu'  v-model="itemid"><input type='hidden' class='form-control id_menu'  v-model="itemcounter"></td>
    <td><input type='number' @change="changeQuantity({counter:itemcounter, quantity:itemquantity})" v-model="itemquantity" class='form-control qty_order'>  </td>
    <td><input type='number' @change="changePrice({counter:itemcounter, price:itemprice})" v-model="itemprice" class='form-control qty_order'>  </td>
</tr>
</template>

<style>
</style>