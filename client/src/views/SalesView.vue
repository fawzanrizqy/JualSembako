<script>
import { mapActions, mapState } from 'pinia';
import { useSalesStore } from '../stores/salesstore';
import { useMainStore } from '../stores/mainstore';

export default{
name: 'SalesView',
methods: {
        ...mapActions(useSalesStore, ["fetchSales","createSales",'completeSales','generateReport']),
        ...mapActions(useMainStore, ["toggleModal"]),
        tes(val)
        {
            this.generateReport(val);
        }
    },
    computed: {
        ...mapState(useSalesStore, ["salesList","reportList"]),
        ...mapState(useMainStore, ["showModal"])
    },
    created() {
        this.fetchSales();
    },
    watch:
    {
        reportList(newval,oldval)
        {
            const wb = XLSX.utils.table_to_book(document.getElementById("TableToExport"));
            XLSX.writeFile(wb, "SheetJSTable.xlsx");
        }
    }

}
</script>

<template>
     <div class="page-header">
	<h2 class="text-left text-white">Sales</h2>
	</div>
    <table class="table table-bordered text-light text-center">
        <thead>
            <tr>
                <th>#</th>
                <th>Sales ID</th>
                <th>Sales Date</th>
                <th>Sales Discount</th>      
                <th>Sales Net</th>
                <th>Sales Total</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(sales,index) in salesList" :key="sales.id">
                <td>{{ index+1 }}</td>
                <td>{{ sales.id }}</td>
                <td>{{ sales.salesDate }}</td>
                <td>{{ sales.salesDiscount }}</td>
                <td>{{ sales.salesTotal - sales.salesDiscount }}</td>
                <td>{{ sales.salesTotal }}</td>
                <td>{{ sales.status }}</td>
                <td width="15%">
                    <RouterLink :to="'/sales/'+sales.id">
                    <button class="btn btn-sm btn-outline-light me-2 mb-2">Transaction List</button>
                    </RouterLink>
                    <button v-if="sales.status === 'active'" class="btn btn-sm btn-outline-success me-2 mb-2" @click="completeSales">Complete Sales</button>
                    <button class="btn btn-sm btn-outline-warning me-2"  @click="tes(sales.id)">Generate report</button>
                    
                </td>
            </tr>
        </tbody>
    </table>


    <table id="TableToExport" style="display: none;">
        <tr>
          
            <th>Transaction</th>
            <th>Transaction Discount</th>
            <th>Transaction Total</th>
           
        </tr>
        <tr v-for="(report,index) in reportList" :key="report.id">
       
            <td>{{ report.id }}</td>
            <td>{{ report.transactionDiscount }}</td>
            <td>{{ report.transactionTotal }}</td>
           
        </tr>
    </table>


    <div class="form-group">  
            <button class="btn btn-light"  @click="createSales">Add New Sales</button>
	</div>
</template>

<style>
</style>